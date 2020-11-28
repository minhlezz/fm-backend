const userResolver = require('./user.resolver');
const {merge} = require('lodash');

module.exports = merge(
    userResolver,
)

