const store = require('./store');

function addChat(users, chatname) {
    return new Promise ((resolve, reject) => {
        if(!chatname || !users || !Array.isArray(users)){
            console.error('[chatController] no users');
            reject('Invalid data');
            return false;
        }
        const chat = {
            chatname: chatname,
            users: users
        }
        store.add(chat);
        resolve(chat);
    });
}

// only show chatrooms of the current user 
function listChats (userId) {
    return store.list(userId);
}

module.exports = {
    listChats: listChats,
    addChat: addChat
}