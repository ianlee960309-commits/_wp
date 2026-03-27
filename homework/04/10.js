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
