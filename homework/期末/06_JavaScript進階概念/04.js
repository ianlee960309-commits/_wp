function cleanData(arr) {
  arr.pop();          // 移除最後一個
  arr.unshift("Start"); // 在最前面加入
}

let myData = [1, 2, 3];
cleanData(myData);

console.log(myData); // ["Start", 1, 2]
