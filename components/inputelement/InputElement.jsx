import React from 'react'
import Style from './inputelement.module.css'
import Icon from '../icon/Icon'
import Icons from '../icon/Icons'

function InputElement({ label, step, disabled, required, info, infoColor, name, title, pattern, type, placeholder, value, onChange, onFocus, onBlur, marginBottom = "0.5rem" }) {
  return (
    <div className={Style.inputElementContainer} style={{ marginBottom }}>
      <label htmlFor={label} className={Style.label}>{label}</label>
      <input title={title} name={name} onFocus={onFocus} onBlur={onBlur} type={type}  step={step} placeholder={placeholder} value={value} pattern={pattern} onChange={onChange} className={Style.input} id={label} required={required} disabled={disabled} />
      {info && <div className={Style.info} style={{color:infoColor}}><Icon icon={Icons.INFO}/>{info}</div>}
    </div>
  )
}

export default InputElement