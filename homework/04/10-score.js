let num = -5;
if (num > 0) {
    console.log("正數");
} else if (num < 0) {
    console.log("負數");
} else {
    console.log("這是零");
}

//

for (let i = 1; i <= 9; i++) {
    console.log(`2 * ${i} = ${2 * i}`);
}

//

let count = 5;
while (count > 0) {
    console.log(count);
    count--;
}
console.log("Go!");

//

function toFahrenheit(celsius) {
    return (celsius * 9) / 5 + 32;
}
let result = toFahrenheit(25);
console.log(result);

//

let fruits = ["蘋果", "香蕉", "橘子"];
fruits.push("葡萄");
console.log(fruits);
console.log("總共有 " + fruits.length + " 種水果");

//

let user = {
    name: "小明",
    age: 20,
    skills: ["JavaScript", "HTML"]
};
console.log(user.name + " 的技能有: " + user.skills.join(", "));

//

let scores = [45, 78, 90, 59, 100];
let passed = [];
for (let i = 0; i < scores.length; i++) {
    if (scores[i] >= 60) {
        passed.push(scores[i]);
    }
}
console.log("及格的分數：", passed);

//

let jsonString = '{"product": "電腦", "price": 30000}';
let productObj = JSON.parse(jsonString);
console.log("產品名稱: " + productObj.product);
console.log("價格: " + productObj.price);

//

function sumUp(n) {
    let total = 0;
    for (let i = 1; i <= n; i++) {
        total += i;
    }
    return total;
}
console.log(sumUp(10));

//

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
