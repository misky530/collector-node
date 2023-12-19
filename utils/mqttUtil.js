// 引入mqtt库
const mqtt = require('mqtt');

// MQTT服务器的连接选项
const options = {
    clientId: 'node-client-202312', // 客户端ID，确保唯一
    clean: true // 清除会话状态
};

// 连接到MQTT服务器
const client = mqtt.connect('mqtt://hats.hcs.cn', options);

// 当连接成功时的回调
client.on('connect', () => {
    console.log('Connected to MQTT broker');
});

// 发布消息到一个主题
async function publish(topic, message) {
    client.publish(topic, message);
}


// 当连接断开时的回调
client.on('close', () => {
    console.log('Connection to MQTT broker closed');
});

// 当发生错误时的回调
client.on('error', (err) => {
    console.error(`Error: ${err}`);
});

// 当客户端关闭时的回调
client.on('end', () => {
    console.log('Client disconnected');
});

// // 10秒后关闭连接
// setTimeout(() => {
//     client.end();
// }, 10000);


// 导出你的工具函数
module.exports = {publish};