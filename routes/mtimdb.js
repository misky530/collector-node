var express = require('express');
var router = express.Router();
const deviceUtil = require('../utils/deviceUtil'); // 导入数据库模块

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('welcome to mtimdb');
});

router.get('/deviceList', async (req, res) => {
    try {
        const rows = await deviceUtil.getAllDevice();
        res.json(rows);
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
