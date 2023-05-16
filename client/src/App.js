import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import React, { useState } from 'react';
import { useAuthContext } from './hooks/useauthenticateContext'
//Pages + Components

import Login from './pages/login.js'
import Home from './pages/home.js'
import Signup from './pages/signup'
import CounselingProper from './pages/counselingproper.js'
import DecisionSupport from './pages/counselingdecisionsupport.js'
import StudentListPage from './pages/studentlist'
import UserPage from './pages/user'
import AssessmentPage from './pages/assessment';

import Navbar from './components/navbar.js'
import EdituserDetails from './components/edituserDetails';
import DetermineGoals from './components/decisionsupportGoals';
import ActivityDetailsPage from "./components/activityCardDetails";

function App() {

 const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
          <div className = "pages">
            <Routes>
           
            <Route 
              path="/" 
              element={user ? <Home userType={"admin"} /> : <Navigate to="/login" />}
              />
              
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/" />} 
            />
              <Route path="/user/:id"  element={<UserPage/>} />
              <Route path="/edituser/:id"  element={<EdituserDetails/>} />
              <Route path="/students"  element={<StudentListPage/>} />
              <Route path="/decisionsupport/:id"  element={<DecisionSupport/>} />
              <Route path="/counselingsession"  element={<CounselingProper/>} />
              <Route path="/determine-goals/:id"element={<DetermineGoals/>}/>
              <Route path="/activities/:activity" element={<ActivityDetailsPage/>} />
              <Route path="/assessment" element={<AssessmentPage/>} />

            </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
