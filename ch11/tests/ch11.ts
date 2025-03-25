import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Ch11 } from "../target/types/ch11";
import { assert, expect } from "chai";
import { SystemProgram } from "@solana/web3.js";

describe("ch11", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.ch11 as Program<Ch11>;
  const programA = anchor.workspace.cpi_a as Program<CpiA>;
  const programB = anchor.workspace.cpi_b as Program<CpiB>;

  it("转账成功", async () => {
    try {
      const fromWallet = anchor.web3.Keypair.generate();
      const toWallet = anchor.web3.Keypair.generate();

      const tx = await program.methods.transfer(new anchor.BN(100)).accounts({
        from: fromWallet.publicKey,
        to: toWallet.publicKey,
      }).signers([fromWallet]).rpc();
      console.log("tx", tx);
      assert.isTrue(true);
    } catch (error) {
      assert.fail(error);
    }
  });

  it("金额过小", async () => {
    try {
      const fromWallet = anchor.web3.Keypair.generate();
      const toWallet = anchor.web3.Keypair.generate();

      const tx = await program.methods.transfer(new anchor.BN(-10)).accounts({
        from: fromWallet.publicKey,
        to: toWallet.publicKey,
      }).signers([fromWallet]).rpc();
      console.log("tx", tx);
      assert.isTrue(true);
    } catch (error) {
      console.log("error1", error);
      expect(error.error.errorCode.code).to.equal("AmountTooSmall");
    }
  });

  it("金额过大", async () => {
    try {
      const fromWallet = anchor.web3.Keypair.generate();
      const toWallet = anchor.web3.Keypair.generate();

      const tx = await program.methods.transfer(new anchor.BN(1100)).accounts({
        from: fromWallet.publicKey,
        to: toWallet.publicKey,
      }).signers([fromWallet]).rpc();
      console.log("tx", tx);
      assert.isTrue(true);
    } catch (error) {
      console.log("error2", error);
      expect(error.error.errorCode.code).to.equal("AmountTooLarge");
      // expect(error).to.include("AmountTooSmall");
      // assert.isTrue(true);  
    }
  });

  it("监听事件", async () => {
    const fromWallet = anchor.web3.Keypair.generate();
    const toWallet = anchor.web3.Keypair.generate();

    let eventPromise = new Promise((resolve) => {
      const evtListener = program.addEventListener("transferEvent", (event) => {
        program.removeEventListener(evtListener);
        resolve(event);
      });
    });

    const tx = await program.methods.transfer(new anchor.BN(100)).accounts({
      from: fromWallet.publicKey,
      to: toWallet.publicKey,
    }).signers([fromWallet]).rpc();

    // 等待事件
    const event = await eventPromise;
    console.log("event", event);
    assert.isTrue(true);
  })

  it("从日志中解析事件", async () => {
    const fromWallet = anchor.web3.Keypair.generate();
    const toWallet = anchor.web3.Keypair.generate();

    const tx = await program.methods.transfer(new anchor.BN(100)).accounts({
      from: fromWallet.publicKey,
      to: toWallet.publicKey,
    }).signers([fromWallet]).rpc();

    const txInfo = await program.provider.connection.getParsedTransaction(tx, {
      commitment: "confirmed",
    });

    console.log("txInfo", JSON.stringify(txInfo));

    txInfo?.meta?.logMessages.find((log) => {
      // console.log("log", log);
      if (log.includes("Program data: ")) {
        const data = log.replace("Program data: ", "");
        const event = Buffer.from(data, 'base64').toString('hex');
        // console.log("event", event);
        return true;
      }
    });
    // 
  })

  it("CPI", async () => {
    const wallet = anchor.web3.Keypair.generate();
    const myAccount = anchor.web3.Keypair.generate();

    // 空投
    const airdropTx = await program.provider.connection.requestAirdrop(wallet.publicKey, anchor.web3.LAMPORTS_PER_SOL);

    // 等待空投确认
    await program.provider.connection.confirmTransaction(airdropTx, "confirmed");


    await programB.methods.initialize(
      new anchor.BN(100)
    ).accounts({
      myAccount: myAccount.publicKey,
      owner: wallet.publicKey,
      payer: wallet.publicKey,
      systemProgram: SystemProgram.programId,
    }).signers([wallet, myAccount]).rpc();

    const data = await programB.account.myAccount.fetch(myAccount.publicKey);
    console.log("data", data);
    const tx = await programA.methods.callCpi(
      new anchor.BN(200)
    ).accounts({
      programB: programB.programId,
      myAccount: myAccount.publicKey,
      owner: wallet.publicKey,
      systemProgram: SystemProgram.programId,
    }).signers([wallet]).rpc();
    console.log("tx", tx);

    const data2 = await programB.account.myAccount.fetch(myAccount.publicKey);
    console.log("data2", data2);

    assert.equal(data2.balance.toString(), new anchor.BN(200).toString());
  })
});
