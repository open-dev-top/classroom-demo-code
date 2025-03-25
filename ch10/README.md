sBPF

LLVM

Go Java Python Rust C++ -> LLVM -> sBPF -> BinaryCode

Solana区块链 微信平台
Solana链上程序 微信小程序

椭圆曲线算法生成密钥对
比特币、以太坊、Solana

公式：

y^2 = x^3 + bx + c

作用：
1. 生成公钥和私钥
2. 私钥可以轻松推导公钥，但公钥很难反推出私钥

Solana Curve25519

y^2 = x^3 + 486662x^2 + x(mod p)

mod p

p = 2^255 - 19

PDA Program Derived Address 程序派生地址

没有私钥，只有公钥

生成方式，3 个参数组成

1. program_id
2. seed
3. bump

```rust
let padAddress = PDA(program_id, seed, bump)
```
<!-- 
profile
assets
... -->

具有确定地址的账户，不需要记录地址，只需要记录 seed 和 bump
程序来控制 PDA，程序能够给 PDA 签名，人不能给 PDA 签名

派生流程

1. 输入参数，seed
2. 生成 PDA，通过哈希函数
3. 非曲线检查
4. bump 调整，重新计算

PDA 实际场景

1. 全局通用。
2. 用户关联数据。
3. 权限委托。 用户地址+目标地址









