const express = require('express')
const UserCtrl = require('../controllers/user-ctrl')
const router = express.Router()

router.post('/usersignup', UserCtrl.createUser)
router.post('/getUser', UserCtrl.getUser)
router.post('/verifyEmail', UserCtrl.verifyEmail)
module.exports = router