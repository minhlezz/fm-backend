const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const houseHoldSchema = new Schema({

    houseTitle: { type: String },

    houseDescription: { type: String },

    provinceCityHH: { type: String },

    districtCityHH: { type: String },

    buildingType: { type: String },

    area: { type: Number },

    budget: { type: Number },

    bath: { type: Number },

    bed: { type: Number },

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

    createdAt: { type: Date, default: Date.now },

    updatedAt: { type: Date, default: Date.now }
},
    { timestamps: true }
);

module.exports = mongoose.model('HouseHold', houseHoldSchema);