function checkAdmin(role, callback) {
  if (role !== "admin") {
    callback("Access Denied", null);
  } else {
    callback(null, "Welcome");
  }
}

// 測試狀況 A：權限不足
checkAdmin("user", (err, message) => {
  if (err) {
    console.log("錯誤:", err); // "錯誤: Access Denied"
    return;
  }
  console.log(message);
});

// 測試狀況 B：管理員身份
checkAdmin("admin", (err, message) => {
  if (err) {
    console.log("錯誤:", err);
    return;
  }
  console.log(message); // "Welcome"
});
