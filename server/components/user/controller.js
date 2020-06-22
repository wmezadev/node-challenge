const store = require('./store');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function getUsers() {
    return store.getAll();
}

async function signup(username, password) {
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

    const newUser = {
        username,
        password
    };
    
    const user = await store.create(newUser);

    const payload = {
        user: {
          id: user.id
        }
    };

    const tokken = jwt.sign(payload, "randomString", { expiresIn: 3600 });

    return { id: user.id, username: user.username, tokken };

}

async function login(username, password) {

    if(!username || !password){
        return Promise.reject('Invalid username or password');
    }
    
    user = await store.get(username);

    if(!user){
        return Promise.reject('Invalid username');
    }


    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return Promise.reject('Invalid password');
    }

    const payload = {
        user: {
          id: user.id
        }
    };

    const tokken = jwt.sign(payload, "randomString", { expiresIn: 3600 });

    return { id: user.id, username: user.username, tokken };

}

module.exports = {
    signup,
    getUsers,
    login
};