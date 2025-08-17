import React from 'react'
import Style from './checkslist.module.css'

function Checkslist({children, bordered=false}) {
  return (
    <div className={Style.checksListContainer} style={{ outline: bordered? null : "none" }}>
        <div className={Style.checksList}>
            {children}
        </div>
    </div>
  )
}

export default Checkslist