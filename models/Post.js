const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const  PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: String,
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        default: 'dr. watson'
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('content', PostSchema)
