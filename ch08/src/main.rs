use std::collections::{HashMap, VecDeque};
use std::time::Instant;
use std::thread;
use std::time::Duration;
use rand::Rng;

// 1. 交易结构
#[derive(Clone, Debug)]
struct Transaction {
    id: usize,
    sender: String,
    receiver: String,
    amount: u64,
    signature: String,
    timestamp: Instant,
}

// 2. 账户结构
#[derive(Clone, Debug)]
struct Account {
    public_key: String,
    private_key: String,
    balance: u64,
}

// 3. 历史证明(PoH)节拍
#[derive(Clone, Debug)]
struct PohTick {
    tick: usize,
    hash: String,
}

// 4. 区块结构
#[derive(Clone, Debug)]
struct Block {
    height: usize,
    transactions: Vec<Transaction>,
    poh_tick: PohTick,
    hash: String,  // 简化的区块哈希
    leader_id: usize,
}

// 5. 验证节点
struct Validator {
    id: usize,
    accounts: HashMap<String, Account>,
    blockchain: Vec<Block>,
}

// 6. Solana网络
struct SolanaNetwork {
    validators: Vec<Validator>,
    mempool: VecDeque<Transaction>,
    current_poh_tick: usize,
    tx_counter: usize,
}

impl Transaction {
    fn new(id: usize, sender: &str, receiver: &str, amount: u64, private_key: &str) -> Self {
        // 使用私钥创建签名（简化版）
        let message = format!("{}:{}:{}", sender, receiver, amount);
        let signature = Self::sign_message(&message, private_key);
        
        Transaction {
            id,
            sender: sender.to_string(),
            receiver: receiver.to_string(),
            amount,
            signature,
            timestamp: Instant::now(),
        }
    }
    
    // 使用私钥签名消息
    fn sign_message(message: &str, private_key: &str) -> String {
        // 简化的签名算法：将消息和私钥结合
        "".to_string()
    }
    
    // 验证签名
    fn verify_signature(&self, public_key: &str) -> bool {
        // let message = format!("{}:{}:{}", self.sender, self.receiver, self.amount);
        // // 从签名中提取私钥部分（在实际应用中不应该这样做）
        // let parts: Vec<&str> = self.signature.split('_').collect();
        // if parts.len() < 3 {
        //     return false;
        // }
        
        // let private_key = parts[1];
        // 在实际系统中，我们会使用公钥验证签名
        // 这里简化为检查私钥是否与公钥对应（实际中这是不安全的！）
        // private_key == public_key.split('_').next().unwrap()
        true
    }
}

impl Validator {
    fn new(id: usize) -> Self {
        let mut accounts = HashMap::new();
        accounts.insert("alice".to_string(), Account { 
            public_key: "alice_pubkey".to_string(),
            private_key: "alice".to_string(),  // 简化的私钥
            balance: 1000 
        });
        accounts.insert("bob".to_string(), Account { 
            public_key: "bob_pubkey".to_string(),
            private_key: "bob".to_string(),  // 简化的私钥
            balance: 500 
        });
        
        Validator {
            id,
            accounts,
            blockchain: Vec::new(),
        }
    }
    
    // 验证交易
    fn validate_tx(&self, tx: &Transaction) -> bool {
        if let Some(sender) = self.accounts.get(&tx.sender) {
            // 检查余额是否充足
            if sender.balance < tx.amount {
                return false;
            }
            
            // 验证交易签名
            return tx.verify_signature(&sender.public_key);
        }
        false
    }
    
    // 验证区块
    fn validate_block(&self, block: &Block) -> bool {
        // 验证交易
        for tx in &block.transactions {
            if !self.validate_tx(tx) {
                return false;
            }
        }
        
        // 验证PoH顺序（简化版）
        if !self.blockchain.is_empty() {
            let last_block = self.blockchain.last().unwrap();
            if block.poh_tick.tick <= last_block.poh_tick.tick {
                return false;
            }
        }
        
        true
    }
    
    // 更新状态
    fn update_state(&mut self, block: &Block) {
        for tx in &block.transactions {
            if let Some(sender) = self.accounts.get_mut(&tx.sender) {
                sender.balance -= tx.amount;
            }
            
            if let Some(receiver) = self.accounts.get_mut(&tx.receiver) {
                receiver.balance += tx.amount;
            } else {
                self.accounts.insert(tx.receiver.clone(), Account { 
                    public_key: format!("{}_pubkey", tx.receiver),
                    private_key: format!("{}_private_key", tx.receiver),
                    balance: tx.amount 
                });
            }
        }
        
        self.blockchain.push(block.clone());
    }
}

impl SolanaNetwork {
    fn new(validator_count: usize) -> Self {
        let mut validators = Vec::with_capacity(validator_count);
        for i in 0..validator_count {
            validators.push(Validator::new(i));
        }
        
        SolanaNetwork {
            validators,
            mempool: VecDeque::new(),
            current_poh_tick: 0,
            tx_counter: 0,
        }
    }
    
    // 创建下一个PoH节拍
    fn generate_poh_tick(&mut self) -> PohTick {
        self.current_poh_tick += 1;
        PohTick {
            tick: self.current_poh_tick,
            hash: format!("hash_{}", self.current_poh_tick),  // 简化的哈希
        }
    }
    
    // 1. 用户创建并签名交易
    fn create_transaction(&mut self, sender: &str, receiver: &str, amount: u64) -> Transaction {
        self.tx_counter += 1;
        
        // 获取发送者的私钥
        let private_key = if let Some(account) = self.validators[0].accounts.get(sender) {
            account.private_key.clone()
        } else {
            // 如果账户不存在，返回一个无效交易
            "invalid".to_string()
        };
        
        let tx = Transaction::new(self.tx_counter, sender, receiver, amount, &private_key);
        println!("1. 用户创建并签名交易: {} 发送 {} 单位SOL给 {}", sender, amount, receiver);
        tx
    }
    
    // 2. 交易广播到网络
    fn broadcast_transaction(&mut self, tx: Transaction) {
        println!("2. 交易广播到RPC节点，并分发到整个网络: ID={}", tx.id);
        self.mempool.push_back(tx);
    }
    
    // 运行一个完整的确认周期
    fn run_confirmation_cycle(&mut self) {
        // 3. 验证节点接收交易并进行初步验证
        println!("3. 验证节点接收交易并进行初步验证");
        let mut valid_txs = VecDeque::new();
        
        while let Some(tx) = self.mempool.pop_front() {
            let is_valid = self.validators.iter().all(|v| v.validate_tx(&tx));
            
            if is_valid {
                println!("  交易 {} 验证有效", tx.id);
                valid_txs.push_back(tx);
            } else {
                println!("  交易 {} 验证失败，被拒绝", tx.id);
            }
        }
        
        // 4. 交易进入内存池
        println!("4. 有效交易进入内存池，等待处理");
        self.mempool = valid_txs;
        
        if self.mempool.is_empty() {
            println!("没有有效交易，跳过区块创建");
            return;
        }
        
        // 5. 领导者节点打包交易
        let leader_id = rand::rng().gen_range(0..self.validators.len());
        println!("5. 验证节点 {} 被选为领导者", leader_id);
        
        // 纪元 epoch
        // 纪元是Solana网络中的一个时间概念，432000个时间槽组成一个纪元。大概 2-3 天。

        // 时间槽 slot
        // 时间槽就是一个区块的时间，大概是 400-600ms。

        // 生成PoH节拍
        let poh_tick = self.generate_poh_tick();
        println!("   历史证明(PoH)节拍: {}", poh_tick.tick);
        
        // 从内存池获取交易打包成区块
        let max_tx_per_block = 2; // 简化，实际上Solana可以处理数千笔交易
        let mut block_txs = Vec::new();
        
        while block_txs.len() < max_tx_per_block && !self.mempool.is_empty() {
            if let Some(tx) = self.mempool.pop_front() {
                block_txs.push(tx);
            }
        }
        
        let new_block = Block {
            height: self.validators[leader_id].blockchain.len(),
            transactions: block_txs,
            poh_tick,
            hash: format!("block_hash_{}", self.current_poh_tick),  // 简化的区块哈希
            leader_id,
        };
        
        println!("   领导者打包交易: 区块高度={}, 包含{}笔交易", 
                 new_block.height, new_block.transactions.len());
        
        // 6. 区块验证与共识
        println!("6. 区块验证与共识");
        let mut approvals = 0;
        for (i, validator) in self.validators.iter().enumerate() {
            if validator.validate_block(&new_block) {
                approvals += 1;
                println!("   验证节点 {} 确认区块有效", i);
            } else {
                println!("   验证节点 {} 拒绝区块", i);
            }
        }
        
        let threshold = self.validators.len() * 2 / 3; // 66% 共识阈值
        
        // 7. 区块确认与状态更新
        if approvals > threshold {
            println!("7. 区块达成共识: {}/{} 验证节点批准 (>66%)", 
                    approvals, self.validators.len());
            
            for validator in &mut self.validators {
                validator.update_state(&new_block);
            }
            println!("   区块确认完成，区块链状态已更新");
        } else {
            println!("7. 区块未达成共识: 只有 {}/{} 验证节点批准", 
                    approvals, self.validators.len());
        }
    }
    
    fn print_account_balances(&self) {
        println!("\n当前账户余额:");
        for (name, account) in &self.validators[0].accounts {
            println!("  {}: {} SOL", name, account.balance);
        }
        println!("");
    }
}

fn main() {
    println!("=== Solana交易确认过程模拟 ===\n");
    
    let mut solana = SolanaNetwork::new(5);
    
    // 打印初始状态
    solana.print_account_balances();
    
    // 创建并广播交易
    let tx1 = solana.create_transaction("alice", "bob", 150);
    solana.broadcast_transaction(tx1);
    
    let tx2 = solana.create_transaction("alice", "charlie", 200);
    solana.broadcast_transaction(tx2);
    
    let tx3 = solana.create_transaction("bob", "dave", 75);
    solana.broadcast_transaction(tx3);
    
    // 模拟几轮确认过程
    for round in 1..=3 {
        println!("\n====== 第 {} 轮确认过程 ======", round);
        solana.run_confirmation_cycle();
        solana.print_account_balances();
        thread::sleep(Duration::from_millis(800));
    }
}