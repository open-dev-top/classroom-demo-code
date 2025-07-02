use crate::constants::DISCRIMINATOR_SIZE;
use anchor_lang::prelude::*;

#[account]
pub struct Pool {
    /// 第一个代币的 mint 地址
    pub token_x_mint: Pubkey,
    /// 第二个代币的 mint 地址
    pub token_y_mint: Pubkey,
    /// 池子的第一个代币的持币地址
    pub vault_x: Pubkey,
    /// 池子的第二个代币的持币地址
    pub vault_y: Pubkey,
    // TODO: 奖励字段
    pub total_lp_supply: u64,
    /// 随机数
    pub bump: u8,
}

impl Pool {
    /// 账户大小
    pub const SIZE: usize = DISCRIMINATOR_SIZE+
        32+ // token_x_mint
        32+ // token_y_mint
        32+// vault_x
        32+// vault_y
        8+// total_lp_amount
        1; // bump
}
