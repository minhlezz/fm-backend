const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: [true, "username already exists"]

    },

    password: {
        type: String,
        required: true
    },

    /**1 User - n Images */
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Picture'
    }],

    username: { type: String },

    mobile: { type: String },

    mobileVerified: { type: Boolean },

    budget: { type: Number },

    radius: { type: Number },

    age: { type: Number },

    gender: { type: String },

    moveIndate: { type: Date },
    /**User 1 - 1 User Profile*/
    // userProfile: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'UserProfile'
    // }

}

);

module.exports = mongoose.model('User', userSchema);