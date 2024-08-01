const {SerialPort} = require('serialport');

class Port {
    #port;

    constructor(portPath, baudRate = 115200, dataBits = 8, parity = 'none', stopBits = 1, flowControl = false) {
        this.#port = new SerialPort({
            path: portPath,
            baudRate: baudRate,
            dataBits: dataBits,
            parity: parity,
            stopBits: stopBits,
            flowControl: flowControl,
            autoOpen: false // 防止立即打开端口
        });
    }

    getPort() {
        return this.#port;
    }

    async open() {
        return new Promise((resolve, reject) => {
            this.#port.open((err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    setPortOptions(options) {
        const { baudRate, dataBits, parity, stopBits, flowControl } = options;
        if (baudRate) this.#port.update({ baudRate });
        if (dataBits) this.#port.update({ dataBits });
        if (parity) this.#port.update({ parity });
        if (stopBits) this.#port.update({ stopBits });
        if (flowControl) this.#port.update({ flowControl });
    }

    async write(data) {
        return new Promise((resolve, reject) => {
            this.#port.write(data, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    onData(callback) {
        this.#port.on('data', callback);
    }

    onError(callback) {
        this.#port.on('error', callback);
        this.#port.off('error', callback);
    }

    onOpen(callback) {
        this.#port.on('open', callback);
    }

    onClose(callback) {
        this.#port.on('close', callback);
    }

    close() {
        this.#port.close();
    }
}

module.exports = Port;
