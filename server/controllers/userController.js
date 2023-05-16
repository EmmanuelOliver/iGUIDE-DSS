const User = require("../models/usermodel");
const jwt = require("jsonwebtoken");
const CounselingSession = require("../models/counselingmodel");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login a user
const loginUser = async (req, res) => {
  const { username, password, userType } = req.body;

  try {
    const user = await User.login(username, password, userType);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  const {username, password, userType, firstName, lastName, email, bio, dateOfBirth, address, mbti, profileImageUrl} = req.body

  try {
    const user = await User.signup(username, password, userType, firstName, lastName, email, bio, dateOfBirth, address, mbti, profileImageUrl);
    // Add additional fields to the user object
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.bio = bio;
    user.dateOfBirth = dateOfBirth;
    user.address = address;
    user.mbti = mbti;
    user.profileImageUrl = profileImageUrl;

    // Save the updated user object to the database
    await user.save();

    const token = createToken(user._id);

    res.status(200).json({ username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserByUsername = async (req, res) => {
  const username = req.params.username;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUserCounseling = async (req, res) => {
  const { counselingSessionId } = req.body;

  try {
    const user = await User.findOne({ _id: req.user._id });

    const counselingSession = await CounselingSession.findById(
      counselingSessionId
    );

    if (!counselingSession) {
      return res
        .status(400)
        .json({ error: "Counseling session does not exist" });
    }

    user.counselingSessions.push(counselingSession);

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such session" });
  }

  const user = await User.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!user) {
    return res.status(400).json({ error: "No such session" });
  }

  res.status(200).json(user);
};

const getStudentUsers = async (req, res) => {
  try {
    const students = await User.find({ userType: "student" });

    res.status(200).json(students);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
  updateUserCounseling,
  getStudentUsers,
  getUserById,
  updateUser,
  getUserByUsername
};
