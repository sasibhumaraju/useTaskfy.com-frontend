import React from 'react'
import Style from './textarea.module.css'

function Textarea({ 
    label="",  
    disabled=false, 
    required=true, 
    name, 
    title, 
    pattern, 
    placeholder="write something...", 
    value="", 
    onChange=()=>{}, 
    onFocus=()=>{}, 
    onBlur=()=>{}, 
    marginBottom = "0.5rem" }) {

  return (
    <div className={Style.textAreaContainer} >
        <label htmlFor={name}>{label}</label>
        <textarea 
             title={title} 
             name={name} 
             placeholder={placeholder} 
             value={value} 
             pattern={pattern} 
             maxLength="250" 
             rows="6"
             onFocus={onFocus} 
             onBlur={onBlur}   
             onChange={(e)=>onChange(e.target.value)} 
             className={Style.textArea} 
             id={label} 
             required={required} 
             disabled={disabled}
        ></textarea>
    </div>
  )
}

export default Textarea