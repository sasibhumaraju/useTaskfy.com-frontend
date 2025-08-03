import React from 'react'
import Style from './appbar.module.css'
import { ButtonType, Constants, IconSizes, NavType } from '../../strings/constants'
import Icon from '../icon/Icon'
import Icons from '../icon/Icons'
import Navbar from '../navbar/Navbar'

function Appbar({showBackButton=false, title, subtitle, showActionsButtons=false, actionFunc}) {
  return (
    <div className={Style.appbar}>
       { showBackButton && <div className={Style.appbarBackButton}>
            <Navbar direction={Constants.VERTICAL} type={NavType.BUTTON} buttonType={ButtonType.LIGHT} links={[
            {to:"/home",element:null,  headIcon: <Icon size={IconSizes.sm} icon={Icons.BACK}></Icon>}]} ></Navbar>
        </div>  }

      <div className={Style.appbarTitleContainer}>
        <div className={Style.appbarTitle}>{title}</div>
        <div className={Style.appbarSubtitle}>{subtitle}</div>
      </div>

      {showActionsButtons && <div className={Style.appbarActions}>
        <Navbar direction={Constants.HORIZONTAL} type={NavType.BUTTON} buttonType={ButtonType.DARK} links={[
          {click:actionFunc, element:<p>New</p>,  headIcon: <Icon size={IconSizes.sm} icon={Icons.ADD}></Icon>}]}>
        </Navbar>
      </div>}

    </div>
  )
}

export default Appbar