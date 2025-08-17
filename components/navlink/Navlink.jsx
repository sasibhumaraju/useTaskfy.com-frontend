import React from 'react'
import Style from './navlink.module.css'
import { NavLink } from 'react-router'

function Navlink({ to, children, headIcon, tailIcon, activeClassName=Style.vActive, inActiveClassName=Style.vInActive }) {
  return (
    <NavLink to={to} className={({ isActive }) => (isActive ? activeClassName : inActiveClassName)}> {headIcon} {children} {tailIcon} </NavLink>
  )
}

export default Navlink  