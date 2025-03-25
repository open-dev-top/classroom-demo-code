
// module 模块
pub mod mod1 {
  fn my_fn() {}
  pub mod mod2 {
      pub fn my_fn() {}
      pub mod mod3 {
         pub fn my_fn() {}
      }
  }
}