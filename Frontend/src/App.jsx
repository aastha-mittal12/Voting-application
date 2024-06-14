import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Dashboard from './Commponents/Dashboard/Dashboard'
import Signup from './Commponents/Signup/Signup'
import Login from './Commponents/Login/Login'
import AllCandidate from './Commponents/AllCandidate/AllCandidate'
import ParticularCandidate from './Commponents/ParticularCandidate/ParticularCandidate'
import EditCandidate from './Commponents/EditCandidate/EditCandidate'
import ParticularVoter from './Commponents/ParticularVoter/ParticularVoter'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/allcandidate" element={<AllCandidate/>}/>
        <Route path="/candidate/:id" element={<ParticularCandidate/>}/>
        <Route path="/voter/:id" element={<ParticularVoter/>}/>
        <Route path="/candidate/edit/:id" element={<EditCandidate/>}/>       
       
      </Routes>
    </div>
  )
}

export default App
