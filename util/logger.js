const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;
const DailyRotateFile = require('winston-daily-rotate-file');

const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
    format: combine(
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat
    ),
    transports: [
        new transports.Console(),
        new DailyRotateFile({
            filename: './logs/app-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxFiles: '14d', // 保留最近14天的日志
            options: { encoding: 'utf8' }
        })
    ],
    exceptionHandlers: [
        new DailyRotateFile({
            filename: './logs/exceptions-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxFiles: '14d',
            options: { encoding: 'utf8' }
        })
    ]
});

module.exports = logger;
