import React from 'react'
import Style from './profilebutton.module.css'
import Navbar from '../navbar/Navbar'
import Icon from '../icon/Icon'
import Icons from '../icon/Icons'
import { ButtonType, Constants, IconSizes, NavType } from '../../strings/constants'
import { useAuth } from '../../context/AuthContext'
import { NavLink } from 'react-router'
import Navlink from '../navlink/Navlink'

function Profilebutton() {
  const { user, login, logout } = useAuth();


  return (
        <Navlink to="/profile" headIcon={<Icon size={IconSizes.sm} icon={Icons.USER}></Icon>} activeClassName={Style.profileActiveButton} inActiveClassName={Style.profileInActiveButton}>
          <span className={Style.profileText}>
             {user ? user.name : "Guest"}
          </span>
        </Navlink>
  )
}

export default Profilebutton