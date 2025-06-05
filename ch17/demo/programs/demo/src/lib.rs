use anchor_lang::prelude::*;

declare_id!("GfdrnSDDzFKgL9beynundtVE9m4SVWHdsAibDKyyU1sn");

#[derive(Accounts)]
pub struct Initialize {
    #[account(mut)]
    pub payer: Signer<'info>,
    #[account(
        init,
        payer = payer,
        space = 8 + 32 + 32,
    )]
}

#[program]
pub mod demo {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
