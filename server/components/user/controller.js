const store = require('./store');
const bcrypt = require("bcryptjs");

function getUsers() {
    return store.get();
}

async function createUser(username, password) {
    if(!username || !password){
        return Promise.reject('Invalid username or password');
    }

    // Check if user already exists
    existingUser = await store.get(username);
    if(existingUser){
        return Promise.reject('User already exists');
    }
    
    // hash password
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const user = {
        username,
        password
    };
    
    return await store.create(user);

}

module.exports = {
    createUser,
    getUsers
};