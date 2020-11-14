const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../config');


module.exports = (req) => {

    const token = req.headers.authorization || '';

    if (token) {
        const tokenValue = token.replace('Bearer ', '');
        const user = jwt.verify(tokenValue, JWT_SECRET_KEY);
        return user;
    }

    return null;


}

