const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userProfileSchema = new Schema(
    {
        username: { type: String },

        mobile: { type: String },

        mobileVerified: { type: Boolean },

        budget: { type: Number },

        radius: { type: Number },

        age: { type: Number },

        gender: { type: String },

        moveIndate: {type: Date},

        /**Profile 1 - 1 User */
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }

);

module.exports = mongoose.model('UserProfile', userProfileSchema);