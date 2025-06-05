// 精度溢出
let result = a * b / c;

// 精度丢失
// let a = x / y;
// let b = a * 1e12;

// 确保精度
let a = x * 1e12;
let b = a / 1e12 / y;

// 场景： 假设 1 奖励token，10000个LP
let reward_per_lp_wrong = 1 / 10000; // 精度丢失 0
// 放大精度
let reward_per_lp_right = 1 * 1e12 / 10000; // 保留精度， 1e8

let user_reward_wong = 50 * 0 / 1;// 精度丢失 0
let user_reward_right = 50 * 1e8 / 1e12;// 保留精度， 0.00005