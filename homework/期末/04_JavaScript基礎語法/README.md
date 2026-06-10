### 1. 數值正負判斷 (if)
**程式碼：**
```javascript
let num = -5;
if (num > 0) {
    console.log("正數");
} else if (num < 0) {
    console.log("負數");
} else {
    console.log("這是零");
}
```
**測試結果：**
負數

---

### 2. 九九乘法表 (for)
**程式碼：**
```javascript
for (let i = 1; i <= 9; i++) {
    console.log(`2 * ${i} = ${2 * i}`);
}
```
**測試結果：**
2 * 1 = 2
2 * 2 = 4
2 * 3 = 6
2 * 4 = 8
2 * 5 = 10
2 * 6 = 12
2 * 7 = 14
2 * 8 = 16
2 * 9 = 18

---

### 3. 倒數計時器 (while)
**程式碼：**
```javascript
let count = 5;
while (count > 0) {
    console.log(count);
    count--;
}
console.log("Go!");
```
**測試結果：**
5
4
3
2
1
Go!

---

### 4. 單位轉換器 (function)
**程式碼：**
```javascript
function toFahrenheit(celsius) {
    return (celsius * 9) / 5 + 32;
}
let result = toFahrenheit(25);
console.log(result);
```
**測試結果：**
77

---

### 5. 水果清單管理 (array)
**程式碼：**
```javascript
let fruits = ["蘋果", "香蕉", "橘子"];
fruits.push("葡萄");
console.log(fruits);
console.log("總共有 " + fruits.length + " 種水果");
```
**測試結果：**
[ '蘋果', '香蕉', '橘子', '葡萄' ]
總共有 4 種水果

---

### 6. 個人資訊卡 (object)
**程式碼：**
```javascript
let user = {
    name: "小明",
    age: 20,
    skills: ["JavaScript", "HTML"]
};
console.log(user.name + " 的技能有: " + user.skills.join(", "));
```
**測試結果：**
小明 的技能有: JavaScript, HTML

---

### 7. 成績過濾器 (array + if)
**程式碼：**
```javascript
let scores = [45, 78, 90, 59, 100];
let passed = [];
for (let i = 0; i < scores.length; i++) {
    if (scores[i] >= 60) {
        passed.push(scores[i]);
    }
}
console.log("及格的分數：", passed);
```
**測試結果：**
及格的分數： [ 78, 90, 100 ]

---

### 8. JSON 資料解析 (json)
**程式碼：**
```javascript
let jsonString = '{"product": "電腦", "price": 30000}';
let productObj = JSON.parse(jsonString);
console.log("產品名稱: " + productObj.product);
console.log("價格: " + productObj.price);
```
**測試結果：**
產品名稱: 電腦
價格: 30000

---

### 9. 累加計算器 (for + function)
**程式碼：**
```javascript
function sumUp(n) {
    let total = 0;
    for (let i = 1; i <= n; i++) {
        total += i;
    }
    return total;
}
console.log(sumUp(10));
```
**測試結果：**
55

---

### 10. 學生資料搜尋 (array + object + for)
**程式碼：**
```javascript
let students = [
    { name: "Alice", id: 101 },
    { name: "Bob", id: 102 },
    { name: "Charlie", id: 103 }
];

let target = "Bob";
for (let i = 0; i < students.length; i++) {
    if (students[i].name === target) {
        console.log("找到學生：" + students[i].name + "，學號為：" + students[i].id);
    }
}
```
**測試結果：**
找到學生：Bob，學號為：102
