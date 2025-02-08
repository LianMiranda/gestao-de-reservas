const jwt = require('jsonwebtoken');

async function auth(user, expiresIn) {
    const token = jwt.sign({id: user.id, name: user.name, email: user.email}, process.env.SECRET,{expiresIn: expiresIn});
    return token;
}

module.exports = auth;