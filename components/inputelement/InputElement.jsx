import React from 'react'
import Style from './inputelement.module.css'

function InputElement({ label, type, placeholder, value, onChange }) {
  return (
    <div className={Style.inputElementContainer}>
      <label htmlFor={label} className={Style.label}>{label}</label>
      <input type={type} placeholder={placeholder} value={value} onChange={onChange} className={Style.input} id={label} />
    </div>
  )
}

export default InputElement