import { FC, useCallback, useMemo } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { fetchCandyMachine, mintV2, mplCandyMachine, safeFetchCandyGuard } from "@metaplex-foundation/mpl-candy-machine";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { some } from "@metaplex-foundation/umi";
import { transactionBuilder, publicKey, generateSigner } from "@metaplex-foundation/umi";
import { setComputeUnitLimit } from "@metaplex-foundation/mpl-toolbox";
import useUserSOLBalanceStore from "stores/useUserSOLBalanceStore";
import { notify } from "utils/notifications";

const endpoint = process.env.NEXT_PUBLIC_RPC || clusterApiUrl('devnet');
const candyMachineId = process.env.NEXT_PUBLIC_CANDY_MACHINE_ID || '';

export const CandyMint: FC = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const { getUserSOLBalance } = useUserSOLBalanceStore();

  // 创建Umi实例
  const umi = useMemo(() =>
    createUmi(endpoint)
      .use(walletAdapterIdentity(wallet))
      .use(mplCandyMachine())
      .use(mplTokenMetadata()),
    [wallet, endpoint]
  );

  // 转换为UMI PublicKey类型
  const candyMachineAddress = useMemo(() => 
    publicKey(candyMachineId),
    [candyMachineId]
  );

  const onClick = useCallback(async () => {
    if (!wallet.publicKey) {
      notify({ type: 'error', message: 'error', description: 'Wallet not connected!' });
      return;
    }

    try {
      // 获取糖果机
      const candyMachine = await fetchCandyMachine(
        umi,
        candyMachineAddress,
      );
      
      // 获取糖果机保护
      const candyGuard = await safeFetchCandyGuard(
        umi,
        candyMachine.mintAuthority,
      );

      if (!candyGuard) {
        notify({ type: 'error', message: 'Error minting!', description: 'Candy Guard not found' });
        return;
      }
      
      // 检查Candy Guard的配置
      const guards = candyGuard.guards;
      
      // 准备铸造参数
      let mintArgs: any = {};
      
      // 添加solPayment
      if (guards.solPayment.__option === 'Some') {
        mintArgs.solPayment = some({ 
          destination: publicKey(guards.solPayment.value.destination)
        });
      }
      
      // 添加startDate - 即使日期已过，仍需提供此参数
      if (guards.startDate.__option === 'Some') {
        mintArgs.startDate = some({});
      }
      
      // 添加mintLimit - 需要提供完整参数
      if (guards.mintLimit.__option === 'Some') {
        mintArgs.mintLimit = some({
          id: guards.mintLimit.value.id,
          limit: guards.mintLimit.value.limit,
        });
      }
      
      const nftMint = generateSigner(umi);
      
      // 确保设置足够高的计算单元限制
      const transaction = transactionBuilder()
        .add(setComputeUnitLimit(umi, { units: 1000000 }))
        .add(
          mintV2(umi, {
            candyMachine: candyMachine.publicKey,
            candyGuard: candyGuard.publicKey,
            nftMint,
            collectionMint: candyMachine.collectionMint,
            collectionUpdateAuthority: candyMachine.authority,
            mintArgs,
          })
        );
      
      const { signature } = await transaction.sendAndConfirm(umi, {
        confirm: { commitment: "confirmed" },
      });
      
      const txid = Buffer.from(signature).toString('hex');
      notify({ type: 'success', message: 'Mint successful!', txid });

      getUserSOLBalance(wallet.publicKey, connection);
    } catch (error: any) {
      notify({ type: 'error', message: `Error minting!`, description: error?.message });
    }
  }, [wallet, connection, getUserSOLBalance, umi, candyMachineAddress]);

  return (
    <div className="flex flex-row justify-center">
      <div className="relative group items-center">
        <div className="m-1 absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-fuchsia-500 
                  rounded-lg blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
        <button
          className="px-8 m-2 btn animate-pulse bg-gradient-to-br from-indigo-500 to-fuchsia-500 hover:from-white hover:to-purple-300 text-black"
          onClick={onClick}
        >
          <span>Mint NFT</span>
        </button>
      </div>
    </div>
  );
};