import React from 'react'
import Style from './teamlist.module.css'

function Teamlist({children, bordered=true}) {
  return (
    <div className={Style.teamListContainer} style={{ outline: bordered? null : "none" }}>
        <div className={Style.teamList}>
           {children}
        </div>
    </div>
  )
}

export default Teamlist