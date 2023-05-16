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

module.exports = {
    getCounselingSessions,
    getCounselingSession,
    createCounselingSession,
    deleteCounselingSession,
    updateCounselingSession
}