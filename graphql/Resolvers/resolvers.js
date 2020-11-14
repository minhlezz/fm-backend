const userResolver = require('./user.resolver');
const userProfileResolver = require('./userProfile.resolver');
const {merge} = require('lodash');

module.exports = merge(
    userResolver,
    // userProfileResolver
)

