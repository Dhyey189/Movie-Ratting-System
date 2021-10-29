
//OMDb API key : 92ca64f5
const express = require('express')

const MovieCtrl = require('../controllers/movie-ctrl')


const router = express.Router()

router.post('/setratting', MovieCtrl.setRatting)//this

module.exports = router