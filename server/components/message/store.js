
const Model = require('./model');

function addMessage(message) {
    const myMessage = new Model(message);
    myMessage.save();
}

async function getMessages(filterChat) {
    return new Promise((resolve, reject) => {
        let filter = {};
        if(filterChat !== null) {
            filter = { chatroom: filterChat };
        } 
        Model.find(filter)
            .populate('user', '-password')
            .sort({created_at: 'desc'})
            .limit(50)
            .exec((error, populate) => {
                if(error){
                    reject(error);
                    return false;
                }
                resolve(populate);
            })
    })
}


module.exports =  {
    add: addMessage,
    list: getMessages
}