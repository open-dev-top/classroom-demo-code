import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, SystemProgram, Transaction } from "@solana/web3.js";
import aliceSecretKey from './alice.json';
import bobSecretKey from './bob.json';

async function main() {
  // 创建一个连接
  const connection = new Connection(
    'http://localhost:8899',
    // 承诺级别
    'confirmed'
  );

  // 导入一个账户
  const aliceKeypair = Keypair.fromSecretKey(Uint8Array.from(aliceSecretKey));

  // 获取账户信息
  const aliceBalance = await connection.getBalance(aliceKeypair.publicKey);
  console.log(`Alice's balance: ${aliceBalance / LAMPORTS_PER_SOL} SOL`);

   // 导入一个账户
   const bobKeypair = Keypair.fromSecretKey(Uint8Array.from(bobSecretKey));

   // 获取账户信息
   const bobBalance = await connection.getBalance(bobKeypair.publicKey);
   console.log(`Bob's balance: ${bobBalance / LAMPORTS_PER_SOL} SOL`);
}

// main().catch(console.error);

async function tx() {
  // 创建一个连接
  const connection = new Connection(
    'http://localhost:8899',
    // 承诺级别
    'confirmed'
  );

  // 账户的占用空间 bytes
  const accountSize = 500;
  // 计算租金
  const rentPerLamport = await connection.getMinimumBalanceForRentExemption(accountSize);
  console.log(`Rent: ${rentPerLamport / LAMPORTS_PER_SOL} SOL`);

  return;

  const aliceKeypair = Keypair.fromSecretKey(Uint8Array.from(aliceSecretKey));
  const bobKeypair = Keypair.fromSecretKey(Uint8Array.from(bobSecretKey));

  // 1. 创建一个交易
  const transaction = new Transaction();
  
  // 2. 添加指令
  const transferInstruction = SystemProgram.transfer({
    fromPubkey: aliceKeypair.publicKey,
    toPubkey: bobKeypair.publicKey,
    lamports: 1_000_000_000,
  });
  transaction.add(transferInstruction);
  const transferInstruction2 = SystemProgram.transfer({
    fromPubkey: bobKeypair.publicKey,
    toPubkey: aliceKeypair.publicKey,
    lamports: 1_000_000_000,
  });
  transaction.add(transferInstruction2);

  // 添加最近的区块哈希
  const latestBlockhash = await connection.getLatestBlockhash();
  transaction.recentBlockhash = latestBlockhash.blockhash;

  // 3. 签名交易
  transaction.sign(aliceKeypair);

  // 模拟交易
  const txHash1 = await connection.simulateTransaction(transaction);
  console.log(txHash1);
  return;

  // 4. 发送交易
  const txHash = await connection.sendRawTransaction(transaction.serialize());
  console.log(`Transaction sent: ${txHash}`);

  // 5. 等待交易确认
  await connection.confirmTransaction({
    signature: txHash,
    ...(await connection.getLatestBlockhash()),
  });
  
  console.log('Transaction confirmed');
}

tx().catch(console.error);
