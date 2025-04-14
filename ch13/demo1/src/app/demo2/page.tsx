'use client'

import useBalance from "@/hooks/use-balance";
import useSend from "@/hooks/use-send";
import useClustersStore from "@/store/clusters.store";
import { useWallet } from "@solana/wallet-adapter-react";
// import { WalletMultiButton, WalletModal } from "@solana/wallet-adapter-react-ui";
import { useState } from "react";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {/* <WalletMultiButton /> */}
        {/* <SignDemo /> */}
        {/* <BalanceDemo /> */}
        <ClusterDemo />
      </main>
    </div>
  );
}

function SignDemo() {
  const { publicKey, signMessage } = useWallet();
  const [message, setMessage] = useState('');
  const handleSign = async () => {
    if (!publicKey || !signMessage) {
      alert("Please connect your wallet");
    }
    const signature = await signMessage(new TextEncoder().encode(message));
    console.log('签名结果: ', signature);
  }

  return (
    <div className="flex flex-col gap-2">
      <input
        className="border border-gray-300 rounded-md p-2"
        type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button className="bg-blue-500 text-white rounded-md p-2" onClick={handleSign}>签名</button>
    </div>
  )
}

function BalanceDemo() {
  const { data, isError, isLoading, error, refetch } = useBalance();
  const { mutate, isPending, isError: isSendError, error: sendError, isSuccess: isSendSuccess } = useSend();
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState(0);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;
  return (
    <div className="flex flex-col gap-2">
      <div className="text-2xl font-bold">余额: {data}</div>
      <button className="bg-blue-500 text-white rounded-md p-2" onClick={() => {
        console.log('刷新');
        refetch()
      }}>刷新</button>

      <input
        className="border border-gray-300 rounded-md p-2"
        type="text" value={to} onChange={(e) => setTo(e.target.value)} />
      <input
        className="border border-gray-300 rounded-md p-2"
        type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
      <button className="bg-blue-500 text-white rounded-md p-2" onClick={() => {
        mutate({ to, amount });
      }}>发送</button>
      {isPending && <div>发送中...</div>}
      {isSendError && <div>发送失败: {isSendError}</div>}
      {isSendSuccess && <div>发送成功</div>}
      {sendError && <div>发送失败: {sendError.message}</div>}
    </div>
  )
}

const ClusterDemo = () => {
  const { clusters, activeCluster, addCluster, switchCluster, removeCluster } = useClustersStore();
  return (
    <div className="flex flex-col gap-2">
      <div className="text-2xl font-bold">集群: {activeCluster?.name}</div>
      <div>
        {clusters.map((cluster) => (
          <div key={cluster.name}>
            <p>{cluster.name}</p>
            <p>{cluster.endpoint}</p>
            <p>{cluster.network}</p>
            <button className="bg-blue-500 text-white rounded-md p-2" onClick={() => {
              switchCluster(cluster.name);
            }}>切换</button>
            <button className="bg-red-500 text-white rounded-md p-2" onClick={() => {
              removeCluster(cluster.name);
            }}>删除</button>
          </div>
        ))}
      </div>
      <button className="bg-blue-500 text-white rounded-md p-2" onClick={() => {
        addCluster({ name: 'localnet', network: 'localnet', endpoint: 'http://localhost:8899' });
      }}>添加集群</button>
    </div>
  )
}