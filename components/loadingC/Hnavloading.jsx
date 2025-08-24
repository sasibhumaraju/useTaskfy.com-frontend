import React from 'react'
import Style from './zloading.module.css'


function Hnavloading({n=4}) {

    var l = new Array(n).fill(0);

  return (
    <div className={Style.zhorizontal} >
        {l.map((_,i)=><div className={Style.zhInActive} style={{width: i===n-1? "50px" : null }} >
            <div  className={Style.zhInActiveChild}></div>
        </div>)}
    </div>
  )
}

export default Hnavloading