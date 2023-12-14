const db = require('../utils/sqlite'); // 导入数据库模块


const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

const getAllDevice = async () => {
    let sql = `SELECT * FROM da_device`; // 替换你的 SQL 查询
    const rows = await db.getData(sql, []);
    return {
        "message": "success",
        "data": rows
    };
}


// 导出你的工具函数
module.exports = {generateRandomString, getAllDevice};