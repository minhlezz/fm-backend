const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const houseHoldSchema = new Schema({

    homeDescription: { type: String },

    buildingType: { type: String },

    area: { type: Number },

    peopleInHouseHold: { type: Number },

    houseHoldSex: { type: String },

    airConditioning: { type: Boolean },

    internet: { type: Boolean },

    parking: { type: Boolean },

    privateBathroom: { type: Boolean },

    yard: { type: Boolean },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}

);

module.exports = mongoose.model('HouseHold', houseHoldSchema);