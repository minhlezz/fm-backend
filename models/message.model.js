const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const messageSchema = new Schema({

    content: {
        type: String,
        required: true
    },

    sender: {
        type: String,
        required: true
    },

    receiver: {
        type: String,
        required: true,
    }, 
    createdAt: {
        type: String,
        required: true,
    },
},
    {timestamps: true}
);

module.exports = mongoose.model('Message', messageSchema);