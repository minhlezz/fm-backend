const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../config');
const { PubSub } = require('apollo-server')
const User = require('../models/user.model');
const Picture = require('../models/picture.model');
const Location = require('../models/location.model');
const Message = require('../models/message.model');
const HouseHold = require('../models/houseHold.model');

const pubsub = new PubSub();

module.exports = (context) => {
    // const token = req.headers.authorization || '';
    // if (token) {
    //     const tokenValue = token.replace('Bearer ', '');
    //     const user = jwt.verify(tokenValue, JWT_SECRET_KEY);
    //     return  user ;
    // }
    let token
    if (context.req && context.req.headers.authorization) {
        token = context.req.headers.authorization.split('Bearer ')[1]
    } else if (context.connection && context.connection.context.Authorization) {
        token = context.connection.context.Authorization.split('Bearer ')[1]
    }

    if (token) {
        jwt.verify(token, JWT_SECRET_KEY, (err, decodedToken) => {
            context.user = decodedToken
        })
    }

    //Push Pubsub to Context
    context.pubsub = pubsub

    //Push Model to Context
    context.User = User
    context.Picture = Picture
    context.Location = Location
    context.Message = Message
    context.HouseHold = HouseHold


    return context;
}

