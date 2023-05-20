const Counseling = require('../models/counselingmodel')
const User = require('../models/usermodel');
const mongoose = require('mongoose')


//get all counseling sessions
const getCounselingSessions = async (req, res) =>{  
  const user_id = req.user._id
    const counselingsessions = await Counseling.find({user_id}).sort({createdAt: -1})
    res.status(200).json(counselingsessions)
}
//get a single session
const getCounselingSession = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such session'})
    }
  
    const counselingsession = await Counseling.findById(id)
  
    if (!counselingsession) {
      return res.status(404).json({error: 'No such session'})
    }
  
    res.status(200).json(counselingsession)
}

//create a new session
const createCounselingSession = async(req, res) => {
    const {title, studentNo} = req.body
    let emptyFields = []

    if (!title) {
      emptyFields.push('title')
    }
    if (!studentNo) {
      emptyFields.push('studentNo')
    }

    if (emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }

    try{
      const user_id = req.user._id
        const counseling = await Counseling.create({title, studentNo, user_id})

        const user = await User.findById(user_id);
        user.counselingSessions.push(counseling);
        await user.save();
    
        res.status(200).json(counseling)
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

//delete a session
const deleteCounselingSession = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such session'})
    }
  
    const counselingsession = await Counseling.findOneAndDelete({_id: id})
  
    if(!counselingsession) {
      return res.status(400).json({error: 'No such session'})
    }
  
    res.status(200).json(counselingsession)
}

//update a session
const updateCounselingSession = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such session'})
    }
  
    const counselingsession = await Counseling.findOneAndUpdate({_id: id}, {
      ...req.body
    })
  
    if (!counselingsession) {
      return res.status(400).json({error: 'No such session'})
    }
  
    res.status(200).json(counselingsession)
}

const addResultsToSession = async (req, res) => {
  const { id } = req.params;
  const { results } = req.body;

  console.log(`Received a PATCH request for id ${id} with results:`, results);

  // Perform input validation (this is a basic check, modify as needed)
  if (!results || typeof results !== 'object') {
    console.error('Invalid results data', results);
    return res.status(400).json({ error: 'Invalid results data' });
  }

  try {
    const counselingsession = await Counseling.findByIdAndUpdate(id, { results }, { new: true });
    
    if (!counselingsession) {
      console.error('No such session with id', id);
      return res.status(404).json({ error: 'No such session' });
    }

    console.log('Updated counseling session:', counselingsession);
    return res.status(200).json(counselingsession);
  } catch (err) {
    console.error('Error updating session:', err);
    return res.status(500).json({ error: 'Error updating session' });
  }
}


//add actions to a session
const addActionToSession = async (req, res) => {
  const { id } = req.params
  const { actions } = req.body

  const counselingsession = await Counseling.findByIdAndUpdate(id, { actions }, { new: true })
  if (!counselingsession) return res.status(404).json({error: 'No such session'})

  res.status(200).json(counselingsession)
}
const checkForResult = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such session'})
  }

  const counselingsession = await Counseling.findById(id, 'results')

  if (!counselingsession) {
    return res.status(404).json({error: 'No such session'})
  }

  res.status(200).json(counselingsession.results || {}) // If there's no result, return an empty object
}


//add activities to a session
const addActivityToSession = async (req, res) => {
  const { id } = req.params
  const { activities } = req.body

  const counselingsession = await Counseling.findByIdAndUpdate(id, { activities }, { new: true })
  if (!counselingsession) return res.status(404).json({error: 'No such session'})

  res.status(200).json(counselingsession)
}

//add notes to a session
const addNoteToSession = async (req, res) => {
  const { id } = req.params
  const { notes } = req.body

  const counselingsession = await Counseling.findByIdAndUpdate(id, { notes }, { new: true })
  if (!counselingsession) return res.status(404).json({error: 'No such session'})

  res.status(200).json(counselingsession)
}

const getSessionStatus = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such session'})
  }

  const counselingsession = await Counseling.findById(id, 'status')

  if (!counselingsession) {
    return res.status(404).json({error: 'No such session'})
  }

  res.status(200).json(counselingsession.status)
}

//update status of a session
const updateSessionStatus = async (req, res) => {
  const { id } = req.params
  const { status } = req.body

  const counselingsession = await Counseling.findByIdAndUpdate(id, { status }, { new: true })
  if (!counselingsession) return res.status(404).json({error: 'No such session'})

  res.status(200).json(counselingsession)
}

module.exports = {
  getCounselingSessions,
  getCounselingSession,
  createCounselingSession,
  deleteCounselingSession,
  updateCounselingSession,
  addResultsToSession,
  checkForResult,
  addActionToSession,
  addActivityToSession,
  addNoteToSession,
  getSessionStatus,
  updateSessionStatus
}