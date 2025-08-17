import React from 'react'
import Style from './selectopen.module.css'

function Selectopen({options, label, selectedOption, setSelectedOption}) {
  return (
    <div className={Style.selectOpenContainer}>
        <div className={Style.label}>{label}</div>
        <div className={Style.optionsContainer}>
            {options && options.map((option,_i)=>{
                return <div className={ selectedOption===_i?  `${Style.optionSelcted}` : `${Style.option}`  } onClick={()=>setSelectedOption(_i)}>
                    {option}
                </div>
            })}
        </div>
    </div>
  )
}

export default Selectopen