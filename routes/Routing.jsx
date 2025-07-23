import React from 'react'

import { Navigate, Route, Routes } from 'react-router'
import ProtectedRoute from './ProtectedRoutes'

import { Checklist, Dashboard, Home, Profile, Projects, Tasks, Teams } from '../pages'

function Routing() {
  return (
    <>
     <Routes>
        <Route path='/' element={ <Navigate to="/task" />}></Route>
         <Route path='/task' element={<Tasks />}></Route>
        <Route path='/checklist' element={<Checklist />}></Route>
        <Route path='/project' element={<Projects />}></Route>
        <Route path='/team' element={<Teams />}></Route>
      </Routes>
    </>
  )
}

export default Routing