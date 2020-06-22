
const Model = require('./model');

function addMessage(message) {
    const myMessage = new Model(message);
    myMessage.save();
}

async function getMessages(filterUser) {
    return new Promise((resolve, reject) => {
        let filter = {};
        if(filterUser !== null) {
            filter = { user: filterUser };
        } 
        Model.find(filter)
            .populate('user')
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