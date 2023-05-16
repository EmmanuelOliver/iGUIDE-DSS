const express = require('express')

// controller functions
const { loginUser, signupUser, updateUserCounseling, getStudentUsers, getUserById, updateUser, getUserByUsername } = require('../controllers/userController')

const router = express.Router()

router.post('/login', loginUser)
router.post('/signup', signupUser)
router.get('/students', getStudentUsers)
router.get('/:id', getUserById)
router.get('/username/:username', getUserByUsername)
router.put('/updateusercounseling/:id', updateUserCounseling)
router.patch('/:id', updateUser)


module.exports = router