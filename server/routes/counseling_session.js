const express = require('express')
const {
    getCounselingSessions,
    getCounselingSession,
    createCounselingSession,
    deleteCounselingSession,
    updateCounselingSession,
    addResultsToSession,
    addActionToSession,
    addActivityToSession,
    addNoteToSession,
    getSessionStatus,
    updateSessionStatus
} = require('../controllers/counselingController')

const requireAuth = require('../middleware/requireAuthentication')

const router = express.Router()

router.use(requireAuth)

router.get('/', getCounselingSessions)

router.get('/:id', getCounselingSession)

router.post('/', createCounselingSession)

router.delete('/:id', deleteCounselingSession)

router.patch('/:id', updateCounselingSession)

// New routes for updating the session with results, actions, activities, notes and status
router.post('/:id/results', addResultsToSession)
router.post('/:id/actions', addActionToSession)
router.post('/:id/activities', addActivityToSession)
router.post('/:id/notes', addNoteToSession)
router.get('/:id/status', getSessionStatus)
router.patch('/:id/status', updateSessionStatus)

module.exports = router
