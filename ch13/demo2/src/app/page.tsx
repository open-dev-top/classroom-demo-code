import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton, WalletModal } from "@solana/wallet-adapter-react-ui";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <WalletMultiButton />
        <WalletModal />
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
    <div>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={handleSign}>签名</button>
    </div>
  )
}
