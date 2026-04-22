// 1. 實作模擬函數
function fakeGet(sql, params, callback) {
    const fakeRow = { 
        id: 1, 
        title: "掌握 JavaScript 函數", 
        content: "這是一篇關於 Callback 的文章..." 
    };
    
    // 直接回傳假資料
    callback(null, fakeRow);
}

// 2. 測試呼叫
const query = "SELECT * FROM posts WHERE id = ?";
const inputParams = [1];

fakeGet(query, inputParams, (err, row) => {
    if (err) {
        console.error("查詢失敗");
    } else {
        // 練習：印出文章標題
        console.log("抓到的文章標題是：", row.title);
    }
});
