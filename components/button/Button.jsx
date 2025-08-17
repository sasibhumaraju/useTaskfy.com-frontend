import React from 'react'
import Style from './button.module.css'
import { ButtonTheme } from './ButtonTheme'

function Button({ text, id, disabled, showBoxShadow=true, onClick, bordered, type = "button", theme, marginTop = "0px", marginBottom = "0px" }) {
  return (
    <button type={type} id={id} onClick={onClick} className={theme===ButtonTheme.LIGHT?Style.lightThemeButton : Style.darkThemeButton} style={{opacity: disabled ? 0.7 : 1, marginTop, marginBottom, cursor: disabled ? 'not-allowed' : 'pointer', outline: bordered? null : "none", boxShadow: showBoxShadow? null : "none" }} disabled={disabled}>
      {text}
    </button>
  )
}

export default Button