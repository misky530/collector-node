var express = require('express');
var router = express.Router();
const deviceUtil = require('../utils/deviceUtil'); // 导入数据库模块

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('welcome to mtimdb');
});

router.get('/deviceList', async (req, res) => {
    try {
        await deviceUtil.collectData();
        res.json({"message": "success"});
    } catch (err) {
        res.status(400).json({"error": err.message});
    }
});

// ... 其他路由和中间件 ...


module.exports = router;
