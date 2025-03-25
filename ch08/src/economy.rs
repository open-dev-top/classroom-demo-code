// Solana 经济模型的模拟实现
struct SolanaEconomy {
    // 发行总量
    total_supply: u64,
    // 通膨率
    inflation_rate: f64,
    // 已销毁量
    burned_supply: u64,
    // 销毁比例
    burn_rate: f64,
    // 当前年份
    current_year: u64,
}

impl SolanaEconomy {
    fn new(initial_supply: u64) -> Self {
        Self {
            total_supply: initial_supply,
            inflation_rate: 8.0, // 第 1 年 8%，每年减少 15%（8% * 0.85）
            burned_supply: 0,
            burn_rate: 0.5, // 每年销毁 50% 的交易费
            current_year: 0,
        }
    }

    // 每年更新经济模型
    fn update(&mut self) {
        self.current_year += 1;
        self.inflation_rate *= 0.85; // 每年减少 15%
                                     // 最低通膨率 1.5
        if self.inflation_rate < 1.5 {
            self.inflation_rate = 1.5;
        }
        self.total_supply += (self.total_supply as f64 * self.inflation_rate / 100.0) as u64;
        // 更新总发行量
    }

    // 处理交易
    fn handle_transaction(&mut self, fee: u64) {
        let burn_amount = (fee as f64 * self.burn_rate) as u64; // 计算销毁量
        self.burned_supply += burn_amount; // 更新已销毁量
        self.total_supply -= burn_amount; // 更新总发行量
    }

    // 批量处理交易
    fn handle_transactions(&mut self, num_transactions: u64, avg_fee: f64) {
        // 先进行浮点数乘法计算总费用，保留精度，再转为整数
        let total_fee = (num_transactions as f64 * avg_fee) as u64;
        self.handle_transaction(total_fee);
    }
}

fn main() {
    let mut economy = SolanaEconomy::new(500_000_000);
    // 模拟 10 年的通货膨胀
    for _ in 0..15 {
        economy.update();
        // 平均每年有 10 亿笔交易，每笔交易手续费 0.00001 SOL
        economy.handle_transactions(2_000_000_000, 0.01);
        println!(
            "Year: {}, Total Supply: {}",
            economy.current_year, economy.total_supply
        );
    }
}

// 1. 「钱包」使用「私钥」进行「签名」，发起「交易」。
// 2. 签名后的交易通过「RPC」发送到「节点」。
// 3. 网络中的「验证节点」进行验证交易，并检查「账户余额」。
// 4. 验证通过后，交易进入「内存池」等待处理。
// 5. 「领导者」节点在内存池中选择交易，并「打包区块」。
// 6. 领导者节点广播区块，其他验证节点对区块进行验证，并「达成共识」。66%
// 7. 达成共识后，区块被添加到「区块链」，交易得到「确认」。


