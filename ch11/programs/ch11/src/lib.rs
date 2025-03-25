use anchor_lang::prelude::*;

declare_id!("63MozwycKrW4FRtRKvnxUJJozoX4FojXQZJfzkg7rPUm");

#[program]
pub mod ch11 {
    use super::*;

    pub fn transfer(ctx: Context<Transfer>, amount: i64) -> Result<()> {
        if amount > 1000 {
            return err!(MyError::AmountTooLarge);
        }
        if amount < 0 {
            return err!(MyError::AmountTooSmall);
        }

        emit!(TransferEvent {
            from: ctx.accounts.from.key(),
            to: ctx.accounts.to.key(),
            amount,
        });

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Transfer<'info> {
    // 转账者
    #[account(mut)]
    pub from: Signer<'info>,

    // 收款人
    #[account(mut)]
    pub to: SystemAccount<'info>
}

#[error_code]
pub enum MyError {
    #[msg("Amount must be less than 1000")]
    AmountTooLarge = 100, // 6000
    #[msg("Amount must be greater than 0")]
    AmountTooSmall = 200, // 6001
}

#[event]
pub struct TransferEvent {
    pub from: Pubkey,
    pub to: Pubkey,
    pub amount: i64,
}
