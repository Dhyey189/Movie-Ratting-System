
const express = require('express')

const UserCtrl = require('../controllers/user-ctrl')


const router = express.Router()


router.post('/usersignup', UserCtrl.createUser)
router.get('/getUser/:email', UserCtrl.getUser)
router.post('/getUser2',UserCtrl.getUser2)
module.exports = router