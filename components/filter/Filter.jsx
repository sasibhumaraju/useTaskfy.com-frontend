import React from 'react'
import Style from './filter.module.css'
import Icon from '../icon/Icon'
import Icons from '../icon/Icons'
import { IconSizes } from '../../strings/constants'

function Filter() {
  return (
    <div className={Style.filter}>
        <div className={`${Style.hInActive} ${Style.lightButton} `}>
            <Icon size={IconSizes.sm} icon={Icons.FILTER}/>
            Filter
            <Icon size={IconSizes.sm} icon={Icons.DROP_DOWN}/>
        </div>
    </div>
  )
}

export default Filter