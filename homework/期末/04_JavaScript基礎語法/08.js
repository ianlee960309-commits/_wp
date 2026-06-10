let jsonString = '{"product": "電腦", "price": 30000}';
let productObj = JSON.parse(jsonString);
console.log("產品名稱: " + productObj.product);
console.log("價格: " + productObj.price);
