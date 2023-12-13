// sqlite.js

const sqlite3 = require('sqlite3').verbose();

// 创建数据库连接
// ../public/db/mtim.db
const db = new sqlite3.Database('./public/db/mtim.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(`sqlite connect error, ${err.message}`);
    } else {
        console.log('Connected to the SQLite database.');
    }

});

// 获取数据的函数
const getData = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

// 其他数据库操作的函数可以在这里定义...

// 关闭数据库连接的函数
const close = () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Closed the database connection.');
    });
};

module.exports = {getData, close};
