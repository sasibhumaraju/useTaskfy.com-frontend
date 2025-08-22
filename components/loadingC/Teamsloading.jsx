import React from 'react'
import Style from './zloading.module.css'
import Teamlist from '../teamlist/Teamlist'

function Teamsloading({bordered=true}) {
  var isLastItem=false
  var l = new Array(4).fill(0)
  return (
    <Teamlist bordered={bordered}>
      { l.map((_,i)=> <div className={Style.zitemContainer} style={{ borderBottom: i===3 || !bordered? "none" : null}}>
           {/* <div className={Style.itemHeader}>{itemHeaderText}</div> */}
           <div className={Style.zitemBody}>
               <div className={Style.railBar1}>{""}</div>
               <div className={Style.railBar2}>{  ""}</div>
           </div>
           <div className={Style.itemTail}>{""}</div>
       </div>)}
    </Teamlist>
  )
}

export default Teamsloading