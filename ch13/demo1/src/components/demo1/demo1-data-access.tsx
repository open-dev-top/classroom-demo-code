'use client'

import { getDemo1Program, getDemo1ProgramId } from '@project/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'

export function useDemo1Program() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getDemo1ProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getDemo1Program(provider, programId), [provider, programId])

  const accounts = useQuery({
    queryKey: ['demo1', 'all', { cluster }],
    queryFn: () => program.account.demo1.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['demo1', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ demo1: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function useDemo1ProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useDemo1Program()

  const accountQuery = useQuery({
    queryKey: ['demo1', 'fetch', { cluster, account }],
    queryFn: () => program.account.demo1.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['demo1', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ demo1: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['demo1', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ demo1: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['demo1', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ demo1: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['demo1', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ demo1: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  }
}
