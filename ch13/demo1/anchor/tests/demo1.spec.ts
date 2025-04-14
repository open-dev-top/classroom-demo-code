import * as anchor from '@coral-xyz/anchor'
import { Program } from '@coral-xyz/anchor'
import { Keypair } from '@solana/web3.js'
import { Demo1 } from '../target/types/demo1'

describe('demo1', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Demo1 as Program<Demo1>

  const demo1Keypair = Keypair.generate()

  it('Initialize Demo1', async () => {
    await program.methods
      .initialize()
      .accounts({
        demo1: demo1Keypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([demo1Keypair])
      .rpc()

    const currentCount = await program.account.demo1.fetch(demo1Keypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Demo1', async () => {
    await program.methods.increment().accounts({ demo1: demo1Keypair.publicKey }).rpc()

    const currentCount = await program.account.demo1.fetch(demo1Keypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Demo1 Again', async () => {
    await program.methods.increment().accounts({ demo1: demo1Keypair.publicKey }).rpc()

    const currentCount = await program.account.demo1.fetch(demo1Keypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Demo1', async () => {
    await program.methods.decrement().accounts({ demo1: demo1Keypair.publicKey }).rpc()

    const currentCount = await program.account.demo1.fetch(demo1Keypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set demo1 value', async () => {
    await program.methods.set(42).accounts({ demo1: demo1Keypair.publicKey }).rpc()

    const currentCount = await program.account.demo1.fetch(demo1Keypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the demo1 account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        demo1: demo1Keypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.demo1.fetchNullable(demo1Keypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
