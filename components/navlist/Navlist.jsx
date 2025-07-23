import React from 'react'
import Style from './navlist.module.css'
import Navbar from '../navbar/Navbar'
import { ButtonType, Constants, IconSizes, NavType } from '../../strings/constants'
import Icon from '../icon/Icon'
import Icons from '../icon/Icons'
import Profilebutton from '../profilebutton/Profilebutton'

function Navlist() {
  return (
    <div className={` ${Style.navlistLaptop}`}>
          <Profilebutton />
        <Navbar
            direction={Constants.VERTICAL} type={NavType.NAV} buttonType={ButtonType.LIGHT} links={[
          {to:"task",element:<p>Tasks</p>,  headIcon: <Icon size={IconSizes.sm} icon={Icons.TASK}></Icon>}, 
          {to:"checklist",element:<p>Checklist</p>, headIcon: <Icon size={IconSizes.sm} icon={Icons.LIST}></Icon> },
          {to:"project",element:<p>Projects</p>, headIcon: <Icon size={IconSizes.sm} icon={Icons.PROJECT}></Icon>}, 
          {to:"team",element:<p>Teams</p>, headIcon: <Icon size={IconSizes.sm} icon={Icons.TEAM}></Icon>}, ]}
         />
    </div>
  )
}

export default Navlist