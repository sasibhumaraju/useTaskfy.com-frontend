import React from 'react'
import Style from './profilebutton.module.css'
import Navbar from '../navbar/Navbar'
import Icon from '../icon/Icon'
import Icons from '../icon/Icons'
import { ButtonType, Constants, IconSizes, NavType } from '../../strings/constants'

function Profilebutton() {
  return (
    <div className={Style.profilebutton}>
        <Navbar direction={Constants.VERTICAL} type={NavType.BUTTON} buttonType={ButtonType.LIGHT} links={[
          {to:"/home",element:<p>Sasi Bhumaraju</p>,  headIcon: <Icon size={IconSizes.sm} icon={Icons.USER}></Icon>}]} ></Navbar>
    </div>
  )
}

export default Profilebutton