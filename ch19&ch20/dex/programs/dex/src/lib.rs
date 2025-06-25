pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;
pub use state::*;

declare_id!("tWQpMAbcKA875EGo12a3iYw3f2cTTx5Yb5tmXSB4vGM");

#[program]
pub mod dex {
    use super::*;

    pub fn initialize_config(
        ctx: Context<InitializeConfig>,
        swap_fee_rate: u16,
        protocol_fee_rate: u16,
    ) -> Result<()> {
        instructions::config::initialize_config(ctx, swap_fee_rate, protocol_fee_rate)
    }

    pub fn update_config_basic(
        ctx: Context<UpdateBasicConfig>,
        swap_fee_rate: u16,
        protocol_fee_rate: u16,
        is_paused: bool,
    ) -> Result<()> {
        instructions::config::update_config_basic(ctx, swap_fee_rate, protocol_fee_rate, is_paused)
    }

    pub fn update_treasury(ctx: Context<UpdateTreasury>) -> Result<()> {
        instructions::config::update_treasury(ctx)
    }

    pub fn update_authority(ctx: Context<UpdateAuthority>) -> Result<()> {
        instructions::config::update_authority(ctx)
    }

    pub fn initialize_pool(
        ctx: Context<InitializePool>,
        initial_amount_x: u64,
        initial_amount_y: u64,
    ) -> Result<()> {
        instructions::pool::initialize_pool(ctx, initial_amount_x, initial_amount_y)
    }
}
