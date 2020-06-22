const store = require('./store');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function getUsers() {
    return store.getAll();
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

async function login(username, password) {

    user = await store.get(username);

    if(!username || !password || user){
        return Promise.reject('Invalid username or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return Promise.reject('Invalid password');
    }

}

module.exports = {
    createUser,
    getUsers
};