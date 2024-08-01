const { format } = require('date-fns');




class DetaMessage{
    #detaMessage = [];
    getMessage(){
        return this.#detaMessage;
    }
    addMessage(message,send){
        const now = new Date();
        const formattedTime = format(now, 'yyyy-MM-dd HH:mm:tt');
        this.#detaMessage.push({time:formattedTime,message:message,send:send});
    }
}

module.exports = DetaMessage;