import React from 'react'
import Style from './zloading.module.css'


function Hnavloading() {

    var l = new Array(4).fill(0);

  return (
    <div className={Style.zhorizontal} >
        {l.map(()=><div className={Style.zhInActive}>
            <div className={Style.zhInActiveChild}></div>
        </div>)}
    </div>
  )
}

export default Hnavloading