let user = "Guest";

// 使用三元運算子判斷
const html = `<h1>Welcome, ${user ? user : "Stranger"}</h1>`;

console.log(html); // "<h1>Welcome, Guest</h1>"
