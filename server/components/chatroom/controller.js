const store = require('./store');

function addChat(users) {
    return new Promise ((resolve, reject) => {
        if(!users || !Array.isArray(users)){
            console.error('[chatController] no users');
            reject('Invalid data');
            return false;
        }
        const chat = {
            users: users
        }
        store.add(chat);
        resolve(chat);
    });
}

function listChats (userId) {
    return store.list(userId);
}

module.exports = {
    listChats: listChats,
    addChat: addChat
}