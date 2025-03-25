use anchor_lang::prelude::*;

declare_id!("9Z2y7hBc2ZFzGroq3xkPnwC4KNZJqwivGmXceZecYwNd");

#[program]
pub mod cpi_b {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, data: u64) -> Result<()> {
        let my_account = &mut ctx.accounts.my_account;
        my_account.balance = data;
        my_account.owner = ctx.accounts.owner.key();
        Ok(())
    }

    pub fn update(ctx: Context<Update>, data: u64) -> Result<()> {
        let my_account = &mut ctx.accounts.my_account;
        my_account.balance = data;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    // 我的账户
    #[account(init, payer=payer, space= 8 + MyAccount::INIT_SPACE)]
    pub my_account: Account<'info, MyAccount>,
    // 所有人
    pub owner: Signer<'info>,
    // 支付人
    #[account(mut)]
    pub payer: Signer<'info>,
    // 系统账户
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut, 
        constraint = my_account.owner == owner.key()
    )]
    pub my_account: Account<'info, MyAccount>,
    pub owner: Signer<'info>,
}

#[account]
#[derive(InitSpace)]
pub struct MyAccount {
    pub balance: u64,
    pub owner: Pubkey,
}

构建一个去中心化的、简单的社交博客平台，具备以下功能：

1. 创建用户账户
2. 发布博客文章
3. 收藏文章

需要有完整的测试。