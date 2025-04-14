#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod demo1 {
    use super::*;

  pub fn close(_ctx: Context<CloseDemo1>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.demo1.count = ctx.accounts.demo1.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.demo1.count = ctx.accounts.demo1.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeDemo1>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.demo1.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeDemo1<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Demo1::INIT_SPACE,
  payer = payer
  )]
  pub demo1: Account<'info, Demo1>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseDemo1<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub demo1: Account<'info, Demo1>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub demo1: Account<'info, Demo1>,
}

#[account]
#[derive(InitSpace)]
pub struct Demo1 {
  count: u8,
}
