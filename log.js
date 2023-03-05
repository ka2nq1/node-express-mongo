const EventEmitter = require('events');
const fs = require('fs');

class Logger extends EventEmitter {
    log = (msg) => {
        this.emit('some_event', {time: new Date(), text: msg})   
    }
}

const logger = new Logger();

logger.on('some_event', ({time, text}) => {
    if (text) {
        if (fs.existsSync('./logs.txt')) {
            fs.appendFile('./logs.txt', `\n${time}: ${text}.`, (err) => {
                err ? console.log(err) : null;
            })
        } else {
            fs.writeFile('./logs.txt',`${time}: ${text}.`, (err) => {
                err ? console.log(err) : null;
            })
        }
    } else {
        return console.log('text is empty!')
    }
});

module.exports = logger;