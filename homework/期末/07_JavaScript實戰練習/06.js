const jsonStr = '{"title": "Post 1", "tags": ["js", "node"]}';

const obj = JSON.parse(jsonStr);

// 印出 tags 陣列中的第二個元素 (索引為 1)
console.log(obj.tags[1]); // "node"
