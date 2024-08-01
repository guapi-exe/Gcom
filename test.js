const path = require('path');
const fs = require('fs');
const logger = require('./util/logger');

const logFilePath = path.join(__dirname, `./logs/app-2024-06-26.log`); // 根据日期生成日志文件路径
try {
    fs.promises.readFile(logFilePath, 'utf-8').then(data=>{
        console.log(data);
    })
} catch (error) {
    logger.error(`Failed to read log file for ${date}: ${error.message}`);
    throw new Error(`Failed to read log file for ${date}: ${error.message}`);
}

const logsDir = path.join(__dirname, './logs');
try {
    fs.promises.readdir(logsDir).then(data=>{
        let list = data
            .filter(file => file.startsWith('app-') && file.endsWith('.log'))
            .map(file => file.slice(4, -4));
        console.log(list)
    })


} catch (error) {
    logger.error(`Failed to list log dates: ${error.message}`);
    throw new Error(`Failed to list log dates: ${error.message}`);
}