var express = require('express');
var router = express.Router();
const db = require('../utils/sqlite'); // 导入数据库模块

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('welcome to mtimdb');
});

router.get('/deviceList', async (req, res) => {
    try {
        let sql = `SELECT * FROM da_device`; // 替换你的 SQL 查询
        const rows = await db.getData(sql);
        res.json({
            "message": "success",
            "data": rows
        });
    } catch (err) {
        res.status(400).json({ "error": err.message });
    }
});

// ... 其他路由和中间件 ...

// 在服务器关闭时关闭数据库连接
process.on('SIGINT', () => {
    db.close();
    process.exit();
});

module.exports = router;
