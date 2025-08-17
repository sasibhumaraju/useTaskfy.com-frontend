import React, { use, useEffect } from 'react'
import Style from './navlist.module.css'
import Navbar from '../navbar/Navbar'
import { ButtonType, Constants, IconSizes, NavType } from '../../strings/constants'
import Icon from '../icon/Icon'
import Icons from '../icon/Icons'
import Profilebutton from '../profilebutton/Profilebutton'
import { NavLink, useLocation } from 'react-router'
import Button from '../button/Button'
import { useAuth } from '../../context/AuthContext'
import { ButtonTheme } from '../button/ButtonTheme'
import Navlink from '../navlink/Navlink'

function Navlist() {

  const location = useLocation(); 
  const { logout } = useAuth(); // Assuming you have a useAuth hook to manage authentication context

  useEffect(() => {
    document.title = location.pathname.split('/')[1].concat(' | UseTaskfy.com') ;
  }, [location]);


  return (
    <div className={` ${Style.navlistLaptop}`}>
        <Profilebutton />
        <Navlink to="/tasks" headIcon={<Icon size={IconSizes.sm} icon={Icons.TASK}></Icon>} className={({ isActive }) => (isActive ? Style.vActive : Style.vInActive)}>Tasks</Navlink>
        <Navlink to="/checklist" headIcon={<Icon size={IconSizes.sm} icon={Icons.LIST}></Icon>} className={({ isActive }) => (isActive ? Style.vActive : Style.vInActive)}>Checklist</Navlink>
        <Navlink to="/projects" headIcon={<Icon size={IconSizes.sm} icon={Icons.PROJECT}></Icon>} className={({ isActive }) => (isActive ? Style.vActive : Style.vInActive)}>Projects</Navlink>
        <Navlink to="/teams" headIcon={<Icon size={IconSizes.sm} icon={Icons.TEAM}></Icon>} className={({ isActive }) => (isActive ? Style.vActive : Style.vInActive)}>Teams</Navlink>

        <div className={Style.logoutButton}>
          <Navbar
            direction={Constants.VERTICAL} type={NavType.BUTTON} buttonType={ButtonType.LIGHT} links={[
              {click:logout,element:<p>Logout</p>, headIcon: <Icon size={IconSizes.sm} icon={Icons.LOGOUT}></Icon>}]}
          />
        </div>
        
    </div>
  )
}

export default Navlist