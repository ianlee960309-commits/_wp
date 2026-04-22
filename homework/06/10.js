function calculateTotal(cart, discountFunc) {
  // 使用 reduce 進行加總
  const sum = cart.reduce((acc, curr) => acc + curr, 0);
  
  // 執行 callback 並回傳結果
  return discountFunc(sum);
}

// 測試：100+200+300 = 600，最後扣 50
const result = calculateTotal([100, 200, 300], (total) => total - 50);

console.log(result); // 輸出: 550
