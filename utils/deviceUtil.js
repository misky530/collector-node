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

    for (const row of rows) {
        const subDevice = await getSubDevice(row.id);
        // console.log(subDevice.data);
        if (subDevice.length > 0) {
            console.log(subDevice);
        }

    }

    return {
        "message": "success",
        "data": rows
    };
}

const getSubDevice = async (device_id) => {
    let sql = `SELECT * FROM da_device_comm_gateway WHERE device_id = ?`; // 替换你的 SQL 查询
    return await db.getData(sql, [device_id]);
}


// 导出你的工具函数
module.exports = {generateRandomString, getAllDevice};