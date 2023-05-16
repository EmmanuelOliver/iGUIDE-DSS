require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose')
const counselingRoutes = require('./routes/counseling_session')
const situationRoute = require('./routes/situation')
const userRoute = require('./routes/user')
//const Situation = require('./models/decisionsupportinputmodel')
const app = express()

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
app.use('/api/user', userRoute)
app.use('/api/counseling_session', counselingRoutes)
app.use('/api/situation', situationRoute)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Connected to DB - listening to port', process.env.PORT)
        })
    })
    .catch((error)=>{
        console.log(error)
    })

/*
const initialData = [
    {
      name: 'Academic',
      thoughts: ['I am not good enough', 'I will fail', 'I am not smart enough'],
      behaviors: ['Procrastination', 'Avoiding studying', 'Not finishing assignments'],
      emotions: ['Anxiety', 'Depression', 'Frustration'],
    },
    {
      name: 'Vocational',
      thoughts: ['I am not good enough', 'I will fail', 'I am not smart enough'],
      behaviors: ['Procrastination', 'Avoiding studying', 'Not finishing assignments'],
      emotions: ['Anxiety', 'Depression', 'Frustration'],
    },
    {
      name: 'Personal-Social',
      thoughts: ['I am not good enough', 'I will fail', 'I am not smart enough'],
      behaviors: ['Procrastination', 'Avoiding studying', 'Not finishing assignments'],
      emotions: ['Anxiety', 'Depression', 'Frustration'],
    }
  ];
  
  Situation.create(initialData, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Data seeded successfully!');
    }
  });


User.create({
  username: 'admin',
  password: 'password',
  userType: 'admin',
  name: 'John Doe',
  email: 'admin@example.com',
  phone: '123-456-7890',
  address: '123 Main St, Anytown USA',
  gender: 'male',
  dob: new Date('1990-01-01'),
  profileImage: 'https://example.com/profile.png',
}).then(() => {
  console.log('Sample user created');
  mongoose.connection.close();
}).catch((err) => {
  console.error(err);
  mongoose.connection.close();
});
*/