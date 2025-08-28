import React from 'react'
import Style from './zloading.module.css'
import Tag from '../tags/Tag';

function Checklistloading({
    status=false,
    n=4,
    bordered=true,
}) {
    var isLastItem = true;
     var l = new Array(n).fill(0);
  return (
    <div className={Style.zzchecksListContainer} >
        <div className={Style.zzchecksList}>
        
        {l.map((_,i)=>{
            return  <div className={Style.zzitemContainer} key={i} style={{ borderBottom: l.length===i+1 || !bordered? "none" : null, padding: status? "30px 35px" : "20px 25px" }}>
            {/* { status && <div className={Style.zztaggedContainer} > <div className={Style.zztagged}>""</div></div> } */}
                
                <div className={Style.zzitemBody}>
                    <div className={Style.zzitemTitle}> </div>
                    <div className={Style.zzitemSubtitle}></div>
                
                    <div className={Style.zzitemOptions}>
                        <div className={Style.zzitemOption}>
                            <div className={Style.zzitemOptionTitle}></div>
                            <div className={Style.zzitemOptionSubtitle}></div>
                        </div>
                    <div className={Style.zzitemOption}>
                            <div className={Style.zzitemOptionTitle}></div>
                            <div className={Style.zzitemOptionSubtitle}></div>
                        </div>
                    </div>
                </div>
        </div>
        })}

        </div>
    </div>
  )

}

export default Checklistloading