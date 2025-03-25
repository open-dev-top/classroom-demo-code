import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Counter } from "../target/types/counter";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { assert } from "chai";

describe("counter", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.counter as Program<Counter>;

  it("Is initialized!", async () => {
    const user = anchor.web3.Keypair.generate();
    // 给 user 空投 10 个 SOL
    const connection = anchor.getProvider().connection;
    const tx1 = await connection.requestAirdrop(user.publicKey,
      LAMPORTS_PER_SOL * 10
    );
    await connection.confirmTransaction(tx1);

    const counterKeypair = anchor.web3.Keypair.generate();
    const tx = await program.methods.initialize().accounts({
      counter: counterKeypair.publicKey,
      authority: user.publicKey,
    })
      .signers([user, counterKeypair])
      .rpc();
    console.log("Your transaction signature", tx);
  });

  it("Increment", async () => {

    const user = anchor.web3.Keypair.generate();
    // 给 user 空投 10 个 SOL
    const connection = anchor.getProvider().connection;
    const tx1 = await connection.requestAirdrop(user.publicKey,
      LAMPORTS_PER_SOL * 10
    );
    await connection.confirmTransaction(tx1);

    const counterKeypair = anchor.web3.Keypair.generate();
    const tx = await program.methods.initialize().accounts({
      counter: counterKeypair.publicKey,
      authority: user.publicKey,
    })
      .signers([user, counterKeypair])
      .rpc();
    console.log("Your transaction signature", tx);

    const tx2 = await program.methods.increment().accounts({
      counter: counterKeypair.publicKey,
      authority: user.publicKey,
    })
      .signers([user])
      .rpc();

    console.log("Your transaction signature", tx2);

    // 查询 counter 的值
    const counter = await program.account.counter.fetch(counterKeypair.publicKey);
    // 断言
    assert.equal(counter.count.toString(), "1");
  });
});
