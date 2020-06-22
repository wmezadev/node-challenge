const store = require('./store');

function addMessage(chat, user, message) {
    return new Promise ((resolve, reject) => {
        if(!chat || !user || !message){
            console.error('[messageController] no user or message');
            reject('Invalid data');
            return false;
        }

        const fullMessage = {
            chat: chat,
            user: user,
            message: message,
            created_at: new Date()
        }
        
        store.add(fullMessage);

        resolve(fullMessage);
    });
}

function getMessages (filterUser) {
    return new Promise ((resolve, reject) => {
        resolve(store.list(filterUser));
    });
}

module.exports = {
    addMessage,
    getMessages,
};