// 模拟一个文件上传的场景，使用 JavaScript 的异步编程、错误处理和函数式编程等知识来实现一个文件上传进度跟踪与错误处理系统。该系统应具备以下功能：

// 1. **文件上传模拟**：创建一个函数 `uploadFile` 来模拟文件上传的过程。该函数接受文件大小（以字节为单位）和上传速度（以字节/秒为单位）作为参数，并返回一个 Promise。在上传过程中，每秒钟更新一次上传进度，并通过回调函数通知调用者。
// 2. **进度跟踪**：创建一个函数 `trackProgress` 来跟踪文件上传的进度。该函数接受 `uploadFile` 返回的 Promise 和一个回调函数作为参数，在上传过程中，每秒钟调用一次回调函数，传递当前的上传进度（百分比）。
// 3. **错误处理**：在 `uploadFile` 函数中，模拟可能出现的上传错误（如网络中断），并在错误发生时拒绝 Promise。在 `trackProgress` 函数中，处理上传错误，并通过回调函数通知调用者。
// 4. **高阶函数应用**：使用高阶函数来实现上传进度的格式化输出。例如，创建一个函数 `formatProgress`，它接受一个进度百分比作为参数，并返回一个格式化后的字符串，如 `'50%'`。

// 模拟文件上传
function uploadFile(fileSize, uploadSpeed) {
  return new Promise((resolve, reject) => {
      let uploaded = 0;
      const intervalId = setInterval(() => {
          if (Math.random() < 0.1) { // 模拟 10% 的出错概率
              clearInterval(intervalId);
              reject(new Error('网络中断，上传失败'));
          }
          uploaded += uploadSpeed;
          if (uploaded >= fileSize) {
              clearInterval(intervalId);
              resolve();
          }
          // 调用回调函数通知进度
      }, 1000);
  });
}

// 跟踪上传进度
function trackProgress(uploadPromise, progressCallback, errorCallback) {
  // 实现进度跟踪逻辑
  uploadPromise
    .then(() => {
          // 上传完成处理
      })
    .catch((error) => {
          // 错误处理
          errorCallback(error);
      });
}

// 格式化进度
function formatProgress(progress) {
  return `${progress}%`;
}

// 使用示例
const fileSize = 10000; // 10KB
const uploadSpeed = 1000; // 1KB/s

trackProgress(
  uploadFile(fileSize, uploadSpeed),
  (progress) => {
      const formattedProgress = formatProgress(progress);
      console.log(`上传进度: ${formattedProgress}`);
  },
  (error) => {
      console.error('上传出错:', error.message);
  }
);
