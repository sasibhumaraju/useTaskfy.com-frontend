import React, { useState } from 'react'
import Style from './duration.module.css'

function Duration({duration={H:0,M:0}, setDuration=()=>{}}) {

    const [focus, setFocus] = useState(false)

    const handleOnFocus = () => {
        setFocus(true)
    }
    const handleOnBlur = () => {
        setFocus(false)
    }

    const handleOnChangeH = (hours) => {
        setDuration(old=>{return {...old,H:hours}})
    }

    const handleOnChangeM = (minutes) => {
         setDuration(old=>{return {...old,M:minutes}})
    }

  return (
    <div className={Style.durationContainer}  >
       <label htmlFor='durationInput'>Select duration</label>
       <div className={Style.durationInput}  style={{outline: focus? "2px solid black" : "1px solid var(--border-default)"}}>
            <input pattern={`^\d{1,3}$`} required className={Style.input} value={duration.H} onChange={e=>handleOnChangeH(e.target.value)} id='durationInput' onFocus={handleOnFocus} onBlur={handleOnBlur} type='number' name='hours' min={0}></input> H
            <input pattern={`^([0-5]?\d)$`} required className={Style.input} value={duration.M} onChange={e=>handleOnChangeM(e.target.value)} id='durationInput' onFocus={handleOnFocus} onBlur={handleOnBlur}  type='number' name='minutes' min={0} max={59}></input> M
       </div>
    </div>
  )
}

export default Duration