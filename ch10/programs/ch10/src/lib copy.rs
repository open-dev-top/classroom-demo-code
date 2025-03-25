use anchor_lang::prelude::*;

declare_id!("BkJVPZSJjLLGPynbg4UbwboJv6zoi3n72umo1iDT2BZr");

#[program]
pub mod ch10 {
    use super::*;

    /// 初始化
    /// Context 的作用
    /// 1. 获取 accounts
    /// 2. 获取 program_id
    /// 3. 获取 remaining_accounts
    /// 4. 获取 bump
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }

    pub fn xx(ctx: Context<Xx>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        /// 1. accounts
        let accounts = &ctx.accounts;
        accounts.user.name = "hello";

        /// 2. program_id
        let program_id = &ctx.program_id;

        /// 3. remaining_accounts
        let remaining_accounts = &ctx.remaining_accounts;

        /// 4. bump
        // let bump = &ctx.bumps.user;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

#[derive(Accounts)]
pub struct Xx {
    // 约束条件 #[account(xxx, xxx, xxx)]
    // mut 要改数据
    // signer 要签名
    // init 要花钱，payer 是花钱的人，space 是账户的大小，花多少钱
    // init_if_needed 如果账户不存在，则创建；如果存在，则不创建
    // close 关闭帐户
    // constrrain 约束条件 自定义
    // #[account(init_if_needed, payer = payer, space = 8 + User::INIT_SPACE)]
    #[account(
        constraint = payer.key() == user.key()
    )]
    // 账户类型
    // Account 数据账户，可以存储数据
    // Signer 签名账户，对交易进行签名
    // System 系统账户，可以创建账户
    // Program 程序账户，可以调用其他程序，可以更新数据

    // AccountLoader 账户加载器，可以加载账户
    // UncheckedAccount 未检查账户，可以加载账户
    // ...
    pub payer: Signer<'info>,
    #[account(mut)]
    pub user: Account<'info, User>,

    #[account(
        init,
        payer = payer,
        space = 8 + 4+ 100 + 1 + 5 * 104,
        seeds = [b"profile", user.key().as_ref()],
        bump,
    )]
    pub profile: Account<'info, Profile>,
}

// a: profile -> x
// b: profile -> x
// c: profile -> x

// a: proflea -> x
// b: profileb -> y
// c: profilec -> z

#[account]
pub struct Profile {
    pub name: String,
    pub age: u8,
    pub gender: String,
    pub address: String,
    pub phone: String,
    pub email: String,
    pub website: String,
    // u8,i8 1byte
    // u16,i16 2byte
    // u32,i32 4byte
    // u64,i64 8byte
    // u128,i128 16byte
    // f32 4byte
    // f64 8byte
    // pubkey 32byte
    // string 可变长度 4 + 字符串长度
}