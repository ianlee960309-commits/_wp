// 1. 定義 fetchData 函數
function fetchData(id, callback) {
    const fakeData = { 
        id: id, 
        status: "success" 
    };
    
    // 依照慣例：第一個參數傳錯誤 (null)，第二個傳資料
    callback(null, fakeData);
}

// 2. 執行 fetchData
fetchData(101, (err, data) => {
    if (err) {
        console.log("發生錯誤：" + err);
    } else {
        console.log("成功取得資料：", data); 
    }
});
