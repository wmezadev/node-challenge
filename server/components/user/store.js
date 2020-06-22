
const Model = require('./model');



async function getUsers() {
    const users = await Model.find();
    return users;
}

async function getUser(userName) {
    const user = await Model.findOne({
        username: userName
    });
    return user;
}

function createUser(user) {
    const myUser = new Model(user);
    return myUser.save();
}

module.exports =  {
    create: createUser,
    getAll: getUsers,
    get: getUser
}