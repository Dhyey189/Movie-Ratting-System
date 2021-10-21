const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Movie = new Schema(
    {
        title: { type: String, required: true },
        avgratting: { type: Number, required: true },
        imdbid: { type: String, required: true },
        totalratesum: { type: Number, required: true, default:0 },
        ratecount: {type: Number, required: true, default:0},
    },
    { timestamps: true },
)

module.exports = mongoose.model('moviedata', Movie)