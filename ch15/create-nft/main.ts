import { clusterApiUrl, Keypair } from "@solana/web3.js";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import wallet from './wallet.json'
import { fromWeb3JsKeypair } from "@metaplex-foundation/umi-web3js-adapters";
import { createGenericFile, generateSigner, keypairIdentity, Umi } from "@metaplex-foundation/umi";
import { createNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import fs from "fs";

async function main() {

  // 准备环境
  // 创建 Solana RPC
  const RPC = clusterApiUrl("devnet")

  // 创建 Umi 实例
  const umi = createUmi(RPC)

  // 创建签名器
  const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
  const umiKeypair = fromWeb3JsKeypair(keypair);
  umi.use(
    keypairIdentity(umiKeypair)
  )

  // 使用 metadata 中间件和 irys 上传器
  umi.use(mplTokenMetadata())
  umi.use(irysUploader())

  // 读取本地图片
  const image = fs.readFileSync("./image.png");
  const imageUri = await uploadImage(umi, image);
  console.log("imageUri", imageUri);


  // 定义元数据
  const metadata = {
    name: "如来佛祖",
    symbol: "LHD",
    description: "这是如来佛祖的 NFT",
    royalties: 100, // 版税：用来计算交易费用的百分比，一般分给创作者或项目方（1% = 100 basis points）
    image: imageUri,
    attributes: [
      { trait_type: "level", value: "10" },
      { trait_type: "power", value: "10000" },
    ],
  }

  // 上传元数据
  const metadataUri = await uploadMetadata(umi, metadata);
  console.log("metadataUri", metadataUri);

  // 创建 NFT
  const tx = await myCreateNft(umi, metadataUri);
  console.log("tx", tx.signature.toString());
}

// 上传图片
async function uploadImage(umi: Umi, image: Buffer) {
  // 转换成 umi 的格式
  const imageFile = createGenericFile(image, "image.png", {
    tags: [{
      name: "content-type",
      value: "image/png"
    }]
  })

  // 上传图片
  const [imageUri] = await umi.uploader.upload([imageFile]);

  return imageUri;
}

// 上传元数据
async function uploadMetadata(umi: Umi, metadata: any) {
  const metadataUri = await umi.uploader.uploadJson(metadata);
  return metadataUri;
}

// 创建 NFT
async function myCreateNft(umi: Umi, metadataUri: string) {
  const mint = generateSigner(umi);// 生成 mint 账户

  // 创建 NFT
  const createNftIx = await createNft(umi, {
    mint,
    name: "如来佛祖",
    uri: metadataUri,
    symbol: "LHD",
    sellerFeeBasisPoints: 100 as any, // 1%
    creators: [{
      address: umi.identity.publicKey,
      verified: true,
      share: 100
    }]// 创作者列表
  })

  const tx = await createNftIx.sendAndConfirm(umi)
  return tx;
}


main()
