let listA = [1, 2];
let listB = [3, 4];

function process(a, b) {
  a.push(99);    // 修改：直接改動記憶體位址裡的陣列內容
  b = [100];     // 重新賦值：讓區域變數 b 指向一個全新的地址，斷開與 listB 的連結
}

process(listA, listB);

console.log(listA); // 輸出: [1, 2, 99]
console.log(listB); // 輸出: [3, 4]
