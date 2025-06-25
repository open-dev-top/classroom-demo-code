use crate::error::*;
use crate::state::{Config, Pool};
use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, TokenAccount};

#[derive(Accounts)]
pub struct Swap<'info> {
    /// 交易用户
    #[account(mut)]
    pub user: Signer<'info>,

    /// 配置账户
    #[account(mut)]
    pub config: Account<'info, Config>,

    /// 池子账户
    #[account(mut)]
    pub pool: Account<'info, Pool>,

    /// 输入的token的账户
    #[account(
      constraint = input_mint.key() == pool.token_x_mint.key() ||
        input_mint.key() == pool.token_y_mint.key()
       @ ErrorCode::InvalidTokenMint
    )]
    pub input_mint: Account<'info, Mint>,
    /// 输出的token的账户
    #[account(
      constraint = out_mint.key() == pool.token_x_mint.key() ||
      out_mint.key() == pool.token_y_mint.key()
       @ ErrorCode::InvalidTokenMint
    )]
    pub out_mint: Account<'info, Mint>,

    /// 输入的用户的token账户
    #[account]
    pub user_token_input: Account<'info, TokenAccount>,
    /// 输出的用户的token账户
    #[account]
    pub user_token_out: Account<'info, TokenAccount>,

    /// 输入的池子的token账户
    #[account]
    pub pool_token_input: Account<'info, TokenAccount>,
    /// 输出的池子的token账户
    #[account]
    pub pool_token_out: Account<'info, TokenAccount>,
    // TODO: 奖励的部分
}

pub fn swap(
    ctx: Context<Swap>,
    // 1: 100
    // x * y = k
    // 输入的x代币数量，精准
    amount_in: u64,
    // 容忍的最小y代币数量，如果实际y代币数量小于这个值，则交易失败
    amount_out: u64,
) -> Result<()> {
    let config = &ctx.accounts.config;
    let user_token_input = &ctx.accounts.user_token_input;

    // 检查协议是否暂停
    check_not_paused(config)?;

    // 条件的检测
    // 检测输入
    if amount_in == 0 {
        return err!(ErrorCode::SwapInputInvalidAmount);
    }

    // 检测输出
    if amount_out == 0 {
        return err!(ErrorCode::SwapOutInvalidAmount);
    }

    // 检测是否存在足够的流动性
    if pool.total_lp_supply == 0 {
        return err!(ErrorCode::InsufficientBalance);
    }

    // 检查用户代币账户的余额是否足够
    if user_token_input.amount < amount_in {
      return err!(ErrorCode::InsufficientBalance);
    }

    // 恒定乘积算法

    Ok()
}
