import React, { useEffect } from 'react'

import { Navigate, Route, Routes } from 'react-router'
import ProtectedRoute from './ProtectedRoutes'

import { Checklist, Dashboard, Home, Profile, Projects, Tasks, Teams } from '../pages'
import Login from '../pages/login/Login'
import Signup from '../pages/signup/Signup'
import { useAuth } from '../context/AuthContext'
import ScrollToTop from '../util/ScrollToTop'
import Teamview from '../pages/teamview/Teamview'
import Leaderboard from '../pages/leaderboard/Leaderboard'

function Routing() {
   const { user } = useAuth();

   useEffect(()=>{
      console.log("from routes",JSON.stringify(user));
      
   },[user])

  return (
    <>
    <ScrollToTop/>
     <Routes>
      
        {/* <Route path='/' element={ <Navigate to="/tasks" />}></Route> */}
        <Route path='/' element={ <ProtectedRoute> <Tasks /> </ProtectedRoute>}></Route>
        <Route path='/tasks' element={ <ProtectedRoute> <Tasks /> </ProtectedRoute>}></Route>
        <Route path='/checklist' element={ <ProtectedRoute> <Checklist /> </ProtectedRoute>}></Route>
        <Route path='/projects' element={ <ProtectedRoute> <Projects /> </ProtectedRoute>}></Route>
        <Route path='/teams' element={ <ProtectedRoute> <Teams /> </ProtectedRoute>}></Route>
        <Route path='/teams/:teamId' element={ <ProtectedRoute> <Teamview /> </ProtectedRoute>}></Route>
        <Route path='/leaderboard' element={ <ProtectedRoute> <Leaderboard /> </ProtectedRoute>}></Route>


        <Route path='/profile' element={ <ProtectedRoute> <Profile /> </ProtectedRoute>}></Route>

        <Route path='/login' element={ user ? <Navigate to="/teams" /> : <Login />}></Route>
        <Route path='/signup' element={ user ? <Navigate to="/teams" /> : <Signup />}></Route>
        
      </Routes>
    </>
  )
}

export default Routing