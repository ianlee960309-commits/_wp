let scores = [45, 78, 90, 59, 100];
let passed = [];
for (let i = 0; i < scores.length; i++) {
    if (scores[i] >= 60) {
        passed.push(scores[i]);
    }
}
console.log("及格的分數：", passed);
