const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../config');


module.exports =  (context) => {

    const headers = context.headers.authorization || '';
    if (!headers) return { isAuth: false };

    
    /**get token from string: 'Bearer +  token' */
    const token = headers.split(" ")[1];
    /**case: token not found */
    if (!token || token === '') {
        return {isAuth: false};
    };
    console.log(token);
    /**decoded Token */
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, JWT_SECRET_KEY);

    } catch (error) {
        return {isAuth : false};
    }

    /**Case: any error found */
    if (!decodedToken) {
        return {isAuth : false};
    }

    /**Token decoded, and pass to data */
    return {
        decodedToken,
        userId:  decodedToken.userId,
        isAuth:  true,
    }

}

