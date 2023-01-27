const bcrypt = require('bcrypt');
const users = require('./models/users');

const createUser = (username, password) => {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new users({
        username: username,
        password: hashedPassword
    });

    newUser.save((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("New user created!");
        }
    });
};
