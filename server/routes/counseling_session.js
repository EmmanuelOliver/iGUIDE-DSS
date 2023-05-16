const express = require('express')
const {
    getCounselingSessions,
    getCounselingSession,
    createCounselingSession,
    deleteCounselingSession,
    updateCounselingSession
} = require('../controllers/counselingController')
const requireAuth = require('../middleware/requireAuthentication')

const router = express.Router()

router.use(requireAuth)

router.get('/', getCounselingSessions)

router.get('/:id', getCounselingSession)

router.post('/', createCounselingSession)

router.delete('/:id', deleteCounselingSession)

router.patch('/:id', updateCounselingSession)

module.exports = router