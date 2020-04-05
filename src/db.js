const fs = require('fs')

const dirSlash = (process.platform === 'win32') ? '\\' : '/';

function dataSave(room, data) {
    data = JSON.stringify(data);
    fs.writeFileSync(__dirname + `${dirSlash}data_base${dirSlash}${decodeURI(room)}.json`, data, 'utf-8');
}

module.exports = {
    roomList: () => {
        return fs.readdirSync(__dirname + `${dirSlash}data_base`);
    },

    dataPush: (room, data, name, text) => {
        data.userContent.push({
            name: name,
            text: text,
            date: new Date(),
        });
        dataSave(room, data);
    },

    userCountUp: (room, data) => {
        data.userCount++;
        dataSave(room, data);
    },

    userCountDown: (room, data) => {
        data.userCount--;
        dataSave(room, data);
    },

    isHost: (room) => {
        try {
            fs.statSync(__dirname + `${dirSlash}data_base${dirSlash}${decodeURI(room)}.json`);
            return false;
        }
        catch (err) {
            if (err.code === 'ENOENT') {
                return true;
            }
        }
    },

    dataInit: (room, host) => {
        data = {
            host: host,
            userCount: 0,
            userContent: []
        };
        dataSave(room, data);
    },
    
    dataSave: dataSave,

    dataLoad: (room) => {
        var data = fs.readFileSync(__dirname + `${dirSlash}data_base${dirSlash}${decodeURI(room)}.json`, 'utf-8');
        return JSON.parse(data);
    },

    dataRemove: (room) => {
        fs.unlinkSync(__dirname + `${dirSlash}data_base${dirSlash}${decodeURI(room)}.json`);
    },
}