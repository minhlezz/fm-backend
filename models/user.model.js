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

    provinceCityUser: { type: String },

    districtCityUser: { type: String },


    mobile: { type: String },

    mobileVerified: { type: Boolean },

    budget: { type: Number },

    age: { type: Number },

    gender: { type: String },

    moveInDate: { type: String },

    aboutMe: { type: String },

    minStay: { type: String },

    headline: { type: String },

    description: { type: String },

    cleanliness: { type: String },

    overnightGuests: { type: String },

    partyHabits: { type: String },

    getUp: { type: String },

    goToBed: { type: String },

    foodReference: { type: String },

    smoker: { type: String },

    workSchedule: { type: String },

    occupation: { type: String },

    pet: { type: String },

    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    },

    houseHold: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HouseHold'
    },
    createdAt: {
        type: String,
        required: true,
    },

    updatedAt: {
        type: String,
    },
},
    {timestamps: true}
);

module.exports = mongoose.model('User', userSchema);