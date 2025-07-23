import React from 'react'
import Style from './home.module.css'
import { Card, Icon, Icons, Navbar, Toggle } from '../../components'
import {ButtonType, Constants, IconSizes, NavType} from '../../strings/constants'
import { LuUsersRound } from "react-icons/lu";
import { TbUsers } from "react-icons/tb";
import Navlist from '../../components/navlist/Navlist';
import Appbar from '../../components/appbar/Appbar';
import Routing from '../../routes/Routing';

function Home() {
  return (
    <div className={Style.home}>
      {/* <Navbar direction={Constants.HORIZONTAL} type={NavType.BUTTON} buttonType={ButtonType.LIGHT} links={[
          {to:"/home",element:<p>Tasks</p>,  headIcon: <Icon size={IconSizes.sm} icon={Icons.TASK}></Icon>}, 
          {to:"/home",element:<p>Check List</p>, headIcon: <Icon size={IconSizes.sm} icon={Icons.LIST}></Icon> },
          {to:"/home",element:<p>Projects</p>, headIcon: <Icon size={IconSizes.sm} icon={Icons.PROJECT}></Icon>}, 
          {to:"/home",element:<p>Teams</p>, headIcon: <Icon size={IconSizes.sm} icon={Icons.TEAM}></Icon>}, ]}>                      
      </Navbar>

      <Toggle />

      <Card title="Enable Calendar Sync" /> */}

      <Navlist></Navlist>
      <div className={Style.homeContent}>
        <Routing/>
        
      </div>
      {/* <Appbar title={"Tasks"} subtitle={"Finish tasks for your team to complete in time"}></Appbar> */}


    </div>
  )
}

export default Home