import { queryClient } from "@/app/react-query-provider";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useMutation } from "@tanstack/react-query";

const useSend = () => {
  const { publicKey, signTransaction } = useWallet();
  const { connection } = useConnection();

  return useMutation({
    mutationFn: async (params: { to: string, amount: number }) => {
      try {
        const { to, amount } = params;
        if (!publicKey || !signTransaction) {
          throw new Error('钱包未连接');
        }
        // 最近的区块高度
        const latestBlockhash = await connection.getLatestBlockhash();
        // 创建交易
        const transaction = new Transaction();
        // 添加交易
        transaction.add(
          SystemProgram.transfer({
            fromPubkey: publicKey!,
            toPubkey: new PublicKey(to),
            lamports: amount * LAMPORTS_PER_SOL,
          })
        );
        transaction.recentBlockhash = latestBlockhash.blockhash;
        transaction.feePayer = publicKey!;
        // 签名
        const signedTransaction = await signTransaction(transaction);
        // 发送交易
        const signature = await connection.sendRawTransaction(signedTransaction.serialize());
        // 确认交易
        await connection.confirmTransaction({
          signature,
          ...latestBlockhash,
        });

        // 刷新余额
        await queryClient.invalidateQueries({ queryKey: ['balance'] });

        return signature;
      } catch (error) {
        console.error('error1: ', error);
        throw new Error('发送失败');
      }
    }
  });
};

export default useSend;