const mongoose = require('mongoose')

const Schema = mongoose.Schema

const counselingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    studentNo:{
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
      }


}, {timestamps: true})

module.exports = mongoose.model('CounselingSession', counselingSchema)

