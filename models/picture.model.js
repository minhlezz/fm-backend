const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pictureSchema = new Schema(
    {
        name: { type: String },

        pictureUrl: { type: String },

        /**Images n - 1 User */
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'    
        },

    }

);

module.exports = mongoose.model('Picture', pictureSchema);