import React from 'react'
import Style from './toggle.module.css'

function Toggle() {

  return (
    <div className={Style.toggle}>
      <label className={Style.switch}>
        <input type="checkbox" />
        <span className={Style.slider}></span>
      </label>
    </div>
  )
}

export default Toggle