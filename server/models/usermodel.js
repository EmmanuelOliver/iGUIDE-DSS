const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
//const counselingSchema = require('../models/counselingmodel')

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
 
  },
  bio: {
    type: String,
    maxlength: 500,
    default: 'Peace and Tranquility',
  },
  dateOfBirth: {
    type: Date,
   
  },
  address: {
    street: {
      type: String,
     
    },
    city: {
      type: String,
     
    },
    state: {
      type: String,
     
    },
    zip: {
      type: String,
    
    },
    country: {
      type: String,
    
    },
  },
  mbti: {
    type: String,
    enum: ['ISTJ', 'ISFJ', 'INFJ', 'INTJ', 'ISTP', 'ISFP', 'INFP', 'INTP', 'ESTP', 'ESFP', 'ENFP', 'ENTP', 'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'],
   
  },
  profileImageUrl: {
    type: String,
    default: 'https://example.com/default-profile-image.png',
  },
  counselingSessions: [{type: Schema.Types.ObjectId, ref: 'CounselingSession'}]
})

userSchema.statics.signup = async function (username, password, userType, firstName, lastName, email, bio, dateOfBirth, address, mbti, profileImageUrl) {
  if (!username || !password || !userType) {
    throw Error("All fields must be filled");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ username });
  if (exists) {
    throw Error("username already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ 
    username, 
    password: hash, 
    userType, 
    firstName, 
    lastName, 
    email, 
    bio, 
    dateOfBirth, 
    address, 
    mbti, 
    profileImageUrl 
  });

  return user;
}

userSchema.statics.login = async function (username, password, userType) {
  if (!username || !password || !userType) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ username });
  if (!user) {
    throw Error("Incorrect username");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }
  return user;
};

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
