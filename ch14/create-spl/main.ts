import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { createFungible, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { createTokenIfMissing, findAssociatedTokenPda, getSplAssociatedTokenProgramId, mintTokensTo } from "@metaplex-foundation/mpl-toolbox";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { createGenericFile, generateSigner, percentAmount, signerIdentity, sol, keypairIdentity } from "@metaplex-foundation/umi";
import fs from "fs";
import wallet from './wallet.json'
import { Keypair, Transaction } from "@solana/web3.js";
import { fromWeb3JsKeypair } from "@metaplex-foundation/umi-web3js-adapters";

async function main() {
  // 1. 创建 umi 实例
  const umi = createUmi("https://api.devnet.solana.com")
    .use(
      mplTokenMetadata()
    ).use(
      irysUploader()
    )

  // 1.1 生成签名器
  const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
  const umiKeypair = fromWeb3JsKeypair(keypair);
  umi.use(
    keypairIdentity(umiKeypair)
  )

  // 1.2 给签名器空投 SOL
  // await umi.rpc.airdrop(umi.identity.publicKey, sol(1))

  // 2. 上传代币图片
  // 2.1 读取图片
  const imageFile = fs.readFileSync("./image.png")
  // 转换成 umi 的格式
  const image = createGenericFile(imageFile, "image.png", {
    tags: [{
      name: "content-type",
      value: "image/png"
    }]
  })
  // 上传图片
  const [imageUri] = await umi.uploader.upload([image]);

  console.log("imageUri", imageUri)

  // 3. 准备元数据
  const metadata = {
    name: "My Token",
    symbol: "MTK",
    description: "This is a test token",
    image: imageUri
  }

  // 4. 上传元数据
  const metadataUri = await umi.uploader.uploadJson(metadata);

  console.log("metadataUri", metadataUri)

  // 5. 创建代币
  const mintSigner = generateSigner(umi);

  // 5.1 创建代币
  const createFungibleIx = createFungible(umi, {
    mint: mintSigner,
    name: metadata.name,
    uri: metadataUri,
    sellerFeeBasisPoints: percentAmount(0),
    decimals: 6,
    authority: umi.identity,
  })

  console.log("createFungibleIx", createFungibleIx)

  // 5.2 先创建关联账户
  const createTokenIx = createTokenIfMissing(umi, {
    mint: mintSigner.publicKey,
    owner: umi.identity.publicKey,
    ataProgram: getSplAssociatedTokenProgramId(umi)
  })

  // 5.3 mint 代币
  const mintTokenIx = mintTokensTo(umi, {
    mint: mintSigner.publicKey,
    token: findAssociatedTokenPda(umi, {
      mint: mintSigner.publicKey,
      owner: umi.identity.publicKey,
    }),
    amount: BigInt(10000)
  })

  // 5.4 发送交易
  const tx = await createFungibleIx
    .add(createTokenIx)
    .add(mintTokenIx)
    .sendAndConfirm(umi)

  console.log("tx", tx)

  // 6. 存储代币信息
  const tokenInfo = {
    mint: mintSigner.publicKey,
    metadataUri,
    imageUri,
    metadata,
    tx,
    txHash: tx.signature,
    txUrl: `https://explorer.solana.com/tx/${tx.signature}`
  }

  fs.writeFileSync("./tokenInfo.json", JSON.stringify(tokenInfo, null, 2))

  console.log("代币信息已保存到 tokenInfo.json", tokenInfo)
}

main()
