import React, { useEffect } from 'react'
import Style from './home.module.css'
import { Card, Icon, Icons, Navbar, Toggle } from '../../components'
import {ButtonType, Constants, IconSizes, NavType} from '../../strings/constants'
import { LuUsersRound } from "react-icons/lu";
import { TbUsers } from "react-icons/tb";
import Navlist from '../../components/navlist/Navlist';
import Appbar from '../../components/appbar/Appbar';
import Routing from '../../routes/Routing';
import { useAuth } from '../../context/AuthContext';

function Home() {

   const { user } = useAuth();

  

  return (
    <div className={Style.home}>
     { user && <Navlist></Navlist>}
      <div id='homeContentHolder' className={Style.homeContent}>
        <Routing/>
      </div>
    </div>
  )
}

export default Home