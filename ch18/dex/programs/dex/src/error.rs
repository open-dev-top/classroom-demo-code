use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("交易费超过最大允许范围")]
    SwapFeeRateTooHigh,

    #[msg("协议费超过最大允许范围")]
    ProtocalFeeRateTooHigh,

    #[msg("无权限操作")]
    Unauthorized,
}
