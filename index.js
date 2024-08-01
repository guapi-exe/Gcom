const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { SerialPort } = require('serialport');
const fs = require('fs');
const Port = require('./util/port');
const DetaMessage = require('./util/detaMessage');
const logger = require('./util/logger');
const {format} = require("date-fns");
let mainWindow;
let port = null;
let detaMessage = new DetaMessage();

ipcMain.handle('get-logs', async (event, date) => {
    const logFilePath = path.join(__dirname, `./logs/app-${date}.log`); // 根据日期生成日志文件路径
    try {
        let logs
        await fs.promises.readFile(logFilePath, 'utf-8').then(data=>{
            logs = data
        })
        return logs
    } catch (error) {
        logger.error(`Failed to read log file for ${date}: ${error.message}`);
        throw new Error(`Failed to read log file for ${date}: ${error.message}`);
    }
});

ipcMain.handle('list-log-dates', async () => {
    const logsDir = path.join(__dirname, './logs');
    try {
        let list = []
        await fs.promises.readdir(logsDir).then(data=>{
            list = data
                .filter(file => file.startsWith('app-') && file.endsWith('.log'))
                .map(file => file.slice(4, -4));
            logger.info(list)

        })
        return list
    } catch (error) {
        logger.error(`Failed to list log dates: ${error.message}`);
        throw new Error(`Failed to list log dates: ${error.message}`);
    }
});

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    // 修改为加载打包后的 Vue 文件
    mainWindow.setMenu(null);
    //mainWindow.loadFile(path.join(__dirname, './src/index.html'));
    mainWindow.loadURL('http://localhost:5173'); // Vue开发服务器
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});

// IPC事件监听
ipcMain.handle('list-ports', async () => {
    const ports = await SerialPort.list();
    logger.info(`串口列表:${ports}`);
    return ports;
});

ipcMain.handle('open-port', async (event, portPath, baudRate) => {
    try {
        port = new Port(portPath, baudRate);
        mainWindow.webContents.send('serial-open', true);
        await port.open();

        port.onData((data) => {
            detaMessage.addMessage(data.toString(), true);
            logger.info(`Rev:${data.toString()}`);
            mainWindow.webContents.send('serial-data', detaMessage.getMessage());
        });
        port.onError((err) => {
            logger.error(`ERR:${err}`);
            mainWindow.webContents.send('serial-error', err);
        });
        port.onOpen((data) => {
            logger.info(`Open:${data.toString()}`);
            mainWindow.webContents.send('serial-open', data);
        });
        port.onClose((data) => {
            logger.info(`Close:${data.toString()}`);
            mainWindow.webContents.send('serial-close', data);
        });

        return portPath;
    } catch (error) {
        logger.error('Error opening port:', error);
        throw error;
    }
});

ipcMain.handle('send-data', async (event, data) => {
    try {
        if (port) {
            await port.write(data);
            logger.info(`Sent data: ${data}`);
            detaMessage.addMessage(data.toString(), false,format(now, 'yyyy-MM-dd HH:mm:tt'));
            mainWindow.webContents.send('serial-data', detaMessage.getMessage());
        } else {
            throw new Error('Port is not open');
        }
    } catch (error) {
        logger.error('Error sending data:', error);
        throw error;
    }
});

ipcMain.handle('set-port', async (event, baudRate, datas, CheckBit, stopBit, flowControl) => {
    try {
        if (port) {
            port.setPortOptions({ baudRate, datas, CheckBit, stopBit, flowControl });
            mainWindow.webContents.send('set-data', "OK");
        } else {
            throw new Error('Port is not open');
        }
    } catch (error) {
        logger.error('Error sending data:', error);
        throw error;
    }
});

ipcMain.handle('close-ports', async (event) => {
    try {
        if (port) {
            port.close();
            mainWindow.webContents.send('serial-close', "OK");
        } else {
            logger.error('Port is not open');
            throw new Error('Port is not open');
        }
    } catch (error) {
        logger.error('Error closing port:', error);
        throw error;
    }
});

ipcMain.handle('clear-data', async (event) => {
    detaMessage = new DetaMessage();
});