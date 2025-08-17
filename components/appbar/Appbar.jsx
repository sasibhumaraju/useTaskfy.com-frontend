import React from 'react'
import Style from './appbar.module.css'
import { ButtonType, Constants, IconSizes, NavType } from '../../strings/constants'
import Icon from '../icon/Icon'
import Icons from '../icon/Icons'
import Navbar from '../navbar/Navbar'
import { useNavigate } from 'react-router'

function Appbar({showBackButton=false, backButtonFunc=()=>{}, horizontalPadding="25px", verticalPadding="0px", title, subtitle, showActionsButtons=false, actionButtonElement=null, actionButtonText="New", actionButtonIcon=<Icon size={IconSizes.sm} icon={Icons.ADD}></Icon>, actionFunc}) {

  const navigate = useNavigate();
  const handleBackButtonClick = () => {
    if (backButtonFunc) {
      backButtonFunc();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={Style.appbar} style={{ padding: `${verticalPadding} ${horizontalPadding}` }}>
       { showBackButton && <div className={Style.appbarBackButton}>
            <Navbar direction={Constants.VERTICAL} type={NavType.BUTTON} buttonType={ButtonType.LIGHT} links={[
            { click: handleBackButtonClick,  headIcon: <Icon size={IconSizes.sm} icon={Icons.BACK}></Icon>}]} ></Navbar>
        </div>  }

      <div className={Style.appbarTitleContainer}>
        <div className={Style.appbarTitle}>{title}</div>
        <div className={Style.appbarSubtitle}>{subtitle}</div>
      </div>

      {showActionsButtons && <div className={Style.appbarActions}>
        {actionButtonElement ? actionButtonElement :
        <Navbar direction={Constants.HORIZONTAL} type={NavType.BUTTON} buttonType={ButtonType.DARK} links={[
          {click:actionFunc, element:<p>{actionButtonText}</p>,  headIcon: actionButtonIcon}]}>
        </Navbar> }
      </div>}

    </div>
  )
}

export default Appbar