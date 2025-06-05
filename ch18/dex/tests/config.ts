import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Dex } from "../target/types/dex";
import { Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { expect } from "chai";

describe("配置", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.dex as Program<Dex>;

  const provider = anchor.AnchorProvider.env();

  it("初始化配置", async () => {
    // 初始化管理员钱包
    const authorityKeypair = Keypair.generate();
    const authorityWallet = new anchor.Wallet(authorityKeypair);

    // 初始化收款账户
    const treasuryKeypair = Keypair.generate();
    const treasuryWallet = new anchor.Wallet(treasuryKeypair);

    // 查找config的PDA
    const [configPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("config")],
      program.programId
    );

    // 给钱包空投 SOL
    const airdropTx = await provider.connection.requestAirdrop(
      authorityWallet.publicKey,
      10 * LAMPORTS_PER_SOL
    );
    await provider.connection.confirmTransaction(airdropTx, 'confirmed');

    const swapFeeRate = 30;
    const protocolFeeRate = 20;
    const tx = await program.methods.initializeConfig(
      swapFeeRate,// swap fee 0.3%
      protocolFeeRate// protocol fee 20%
    ).
      accounts(
        {
          payer: authorityWallet.publicKey,
          authority: authorityWallet.publicKey,
          treasury: treasuryWallet.publicKey,
          config: configPDA
        }
      ).
      signers([
        authorityWallet.payer
      ]).
      rpc();

    await provider.connection.confirmTransaction(tx, 'confirmed');

    console.log("Your transaction signature", tx);

    // 通过 RPC 获取账户信息
    const configInfo = await program.account.config.fetch(configPDA);
    console.log('configInfo: ', configInfo);

    // 验证数据是否正确
    // 1. 验证管理员地址是否正确
    expect(configInfo.authority.toString()).to.equal(authorityWallet.publicKey.toString());
    // 2. 验证收款账户地址是否正确
    expect(configInfo.treasury.toString()).to.equal(treasuryWallet.publicKey.toString());
    // 3. 验证交易费是否正确
    expect(configInfo.swapFeeRate.toString()).to.equal(String(
      swapFeeRate
    ));
    // 4. 验证协议费是否正确
    expect(configInfo.protocolFeeRate.toString()).to.equal(String(
      protocolFeeRate
    ));
    // 5. 验证协议是否正确运行
    expect(configInfo.isPaused).to.equal(false);
  });
});

// 单元测试：更新相关指令