// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import Demo1IDL from '../target/idl/demo1.json'
import type { Demo1 } from '../target/types/demo1'

// Re-export the generated IDL and type
export { Demo1, Demo1IDL }

// The programId is imported from the program IDL.
export const DEMO1_PROGRAM_ID = new PublicKey(Demo1IDL.address)

// This is a helper function to get the Demo1 Anchor program.
export function getDemo1Program(provider: AnchorProvider, address?: PublicKey) {
  return new Program({ ...Demo1IDL, address: address ? address.toBase58() : Demo1IDL.address } as Demo1, provider)
}

// This is a helper function to get the program ID for the Demo1 program depending on the cluster.
export function getDemo1ProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Demo1 program on devnet and testnet.
      return new PublicKey('coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF')
    case 'mainnet-beta':
    default:
      return DEMO1_PROGRAM_ID
  }
}
