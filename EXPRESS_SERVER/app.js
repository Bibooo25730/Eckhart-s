const express = require('express');
const app = express();
const port = 3000;
//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
const map = require("./middlwware/reponse_map");
app.use("/api", map)
// 测试
app.get("/", (res, req) => {
    req.send("OK")
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
const webscoket = require("./utils/server");
webscoket.listen()
