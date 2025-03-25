use anchor_lang::prelude::*;
use cpi_b::{self, cpi::accounts::Update, program::CpiB, MyAccount};

declare_id!("BervMk5R8vDWp7Kam9jvF9s5KrZUWURNvabX2Gbrv9NQ");

#[program]
pub mod cpi_a {
    use super::*;

    pub fn call_cpi(ctx: Context<CallCpi>, data: u64) -> Result<()> {
        // 1. 创建上下文
        let cpi_program = ctx.accounts.program_b.to_account_info();
        let cpi_accounts = Update {
            my_account: ctx.accounts.my_account.to_account_info(),
            owner: ctx.accounts.owner.to_account_info(),
        };
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);

        // 2. 调用
        cpi_b::cpi::update(cpi_ctx, data)?;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CallCpi<'info> {
    program_b: Program<'info, CpiB>,

    #[account(mut, 
        constraint = my_account.owner == owner.key()
    )]
    pub my_account: Account<'info, MyAccount>,
    pub owner: Signer<'info>,
}
