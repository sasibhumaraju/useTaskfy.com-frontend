import React from 'react'
import Style from './icon.module.css'

function Icon({size, icon}) {
  return (
    <div className={Style.icon} style={{fontSize: size}}>{icon}</div>
  )
}

export default Icon;