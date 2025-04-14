'use client'

import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import '@solana/wallet-adapter-react-ui/styles.css'

export default function SolanaProvider({ children }: { children: React.ReactNode }) {
  return <ConnectionProvider endpoint="https://api.devnet.solana.com">
    <WalletProvider wallets={[
      new PhantomWalletAdapter(),
    ]}>
      <WalletModalProvider>
        {children}
      </WalletModalProvider>
    </WalletProvider>
  </ConnectionProvider>
}