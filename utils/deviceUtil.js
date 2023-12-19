const db = require('../utils/sqlite'); // 导入数据库模块
const mqtt = require('../utils/mqttUtil');


const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

const collectData = async (data) => {
    // get edges
    const edges = await getAllEdge();
    if (edges.length <= 0) {
        console.log('no edge');
        return;
    }

    console.log(`${edges.length} edges`);

    for (const edge of edges) {
        // get all direct device
        const directDevices = await getDirectDevice(edge.id);

        if (directDevices.length <= 0) {
            console.log('no direct device');
            continue;
        }

        console.log(`directDevices:${directDevices.length}`);

        for (const direct of directDevices) {
            await doDirectDevice(direct);
        }
    }
}

async function doDirectDevice(direct) {
    //根据直连设备获取其子设备
    const subDeviceList = await getSubDevice(direct.id);
    if (subDeviceList.length <= 0) {
        console.log('no sub device');
        return;
    }

    console.log(`subDevice:${subDeviceList.length}`);

    await doSubDevice(subDeviceList);

}

async function doSubDevice(subDeviceList) {
    for (const subDevice of subDeviceList) {
        //获取子设备信息
        let subDeviceId = subDevice.sub_device_id;

        //获取属性数组信息, 查询子设备下的属性
        let propList = await getPropertyList(subDeviceId);

        if (propList.length <= 0) {
            console.log('no prop');
            return;
        }

        console.log(`propList:${propList.length}`);

        //筛选parent 和可读的测点
        let parentList = propList.filter(p => p.parent_id === 0);

        if (parentList.length <= 0) {
            console.log('no parent');
            continue;
        }

        console.log(`parentList:${parentList.length}`);

        await doChild(parentList);

        // for (const parent of parentList) {
        //     //获取parent下的child
        //     let childList = propList.filter(p => p.parent_id === parent.dpsp_id);
        //
        //     if (childList.length <= 0) {
        //         console.log('no child');
        //         continue;
        //     }
        //
        //     console.log(`childList:${childList.length}`);
        //
        //     await doChild(childList);
        // }


    }
}

async function doChild(childList) {
    for (const child of childList) {
        //获取child的值
        // 将对象转为JSON字符串
        const jsonString = JSON.stringify(child);
        mqtt.publish('/mtim/node', jsonString);
    }

}

async function getDirectDevice(id) {
    let sql = `select * from da_device where device_id=?`;
    return await db.getData(sql, [id]);
}

async function getPropertyList(deviceId) {
    let sql = `select ddcp.*,dpsp.parent_id,dpsp.id as dpsp_id from da_device_comm_prop ddcp
    left join da_product_service_prop dpsp on ddcp.prod_prop_id=dpsp.id where ddcp.device_id=?`;
    return await db.getData(sql, [deviceId]);
}


const getAllEdge = async () => {
    let sql = `select * from da_device where node_type=4`; // 替换你的 SQL 查询
    return await db.getData(sql, []);

}

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
module.exports = {generateRandomString, getAllDevice, collectData};