import { useQuery } from "@tanstack/react-query";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const useBalance = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  return useQuery({
    queryKey: ['balance', publicKey?.toBase58()],
    queryFn: async () =>{
      const balance = await connection.getBalance(publicKey!);
      return balance / LAMPORTS_PER_SOL;
    },
    enabled: !!publicKey,
  })
}

export default useBalance;
