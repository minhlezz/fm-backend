const userResolver = require('./user.resolver');
const locationResolver = require('./location.resolver');
const messageResolver = require('./message.resolver');
const { merge } = require('lodash');

module.exports = merge(
    userResolver,
    locationResolver,
    messageResolver
)

