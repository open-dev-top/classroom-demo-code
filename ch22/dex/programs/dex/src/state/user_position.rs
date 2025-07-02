use crate::constants::*;
use anchor_lang::prelude::*;

/// 用户在池子中提供 LP 的仓位
#[account]
pub struct UserPosition {
    /// 池子的地址
    pub pool: Pubkey,

    /// 用户的地址
    pub owner: Pubkey,

    /// lp 数量
    pub lp_amount: u64,

    // TODO: 奖励相关字段
    /// PDA 种子
    pub bump: u8,
}

impl UserPosition {
    pub const SIZE: usize = DISCRIMINATOR_SIZE +
  32+ // pool
  32+ // owenr
  8+ // lp amount
  1 // bump 
  ;
}
