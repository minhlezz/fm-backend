const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const locationSchema = new Schema({

    latitude: { type: Number },

    longitude: { type: Number },
    bound: { type: Number },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}

);

module.exports = mongoose.model('Location', locationSchema);