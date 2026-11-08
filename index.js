const express = require('express');
const path = require('path');
const app = express();

// Sử dụng cổng do Bot-Hosting cấp, hoặc mặc định 3000
const PORT = process.env.PORT || 3000;

// Cho phép server đọc các file giao diện (intro.html, main.html...)
app.use(express.static(__dirname));

// Khi người chơi mở web, trả về trang intro.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'intro.html'));
});

// Chạy server
app.listen(PORT, () => {
    console.log(`[SERVER GAME] Đã chạy thành công tại port ${PORT}!`);
});
