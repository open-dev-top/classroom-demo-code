// 构建一个简单的电商商品筛选与排序系统，使用 JavaScript 的数据结构、高阶函数和正则表达式等知识来实现商品的筛选和排序功能。该系统应具备以下功能：

// 1. **商品数据模型**：创建一个包含多个商品对象的数组，每个商品对象包含以下属性：`id`（商品 ID）、`name`（商品名称）、`price`（商品价格）、`category`（商品类别）和 `rating`（商品评分）。
// 2. **筛选功能**：实现一个函数 `filterProducts`，它接受商品数组和筛选条件作为参数，并返回符合条件的商品数组。筛选条件可以包括价格范围、商品类别和商品名称的关键词。
// 3. **排序功能**：实现一个函数 `sortProducts`，它接受商品数组和排序规则作为参数，并返回排序后的商品数组。排序规则可以根据价格、评分等属性进行升序或降序排序。
// 4. **正则表达式应用**：在筛选商品名称时，使用正则表达式来实现模糊匹配。例如，用户输入的关键词可以匹配商品名称中的任意部分。

// 商品数据
const products = [
  { id: 1, name: 'iPhone 14', price: 999, category: '手机', rating: 4.5 },
  { id: 2, name: 'MacBook Pro', price: 1999, category: '笔记本电脑', rating: 4.7 },
  { id: 3, name: 'iPad Air', price: 599, category: '平板电脑', rating: 4.2 },
  // 更多商品...
];

// 筛选商品
function filterProducts(products, filterOptions) {
  return products.filter((product) => {
      // 实现筛选逻辑
      return true; // 暂时返回 true，需要根据条件修改
  });
}

// 排序商品
function sortProducts(products, sortRule) {
  return products.sort((a, b) => {
      // 实现排序逻辑
      return 0; // 暂时返回 0，需要根据规则修改
  });
}

// 使用示例
const filterOptions = {
  priceRange: [500, 1500],
  category: '平板电脑',
  keyword: 'iPad'
};

const sortRule = {
  property: 'price',
  order: 'asc' // 'asc' 表示升序，'desc' 表示降序
};

const filteredProducts = filterProducts(products, filterOptions);
const sortedProducts = sortProducts(filteredProducts, sortRule);

console.log('筛选并排序后的商品:', sortedProducts);

