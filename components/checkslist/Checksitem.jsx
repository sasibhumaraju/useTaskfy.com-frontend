import React from 'react'
import Style from './checkslist.module.css'
import Divider from '../divider/Divider'
import Tag from '../tags/Tag'
import parseISODuration from '../../util/ParseISODuration'

function Checksitem({
    itemHeaderText, 
    projectName, 
    teamName, 
    repeattType, 
    onWhichDays, 
    itemTitleText, 
    itemSubtitleText, 
    actionElements, 
    isLastItem, 
    onClick, 
    bordered=true, 
    cursor, 
    occurrences, 
    startTime, 
    endTime,
    duration, 
    intervels, 
    status,
    acknowledgeBy,
    isTagged=false}) {
  return (
    <div className={Style.itemContainer} onClick={onClick} style={{ borderBottom: isLastItem || !bordered? "none" : null, cursor:cursor, padding: status? "30px 35px" : "20px 25px" }}>
       { status && <div className={Style.taggedContainer} > <div className={Style.tagged}>{status}</div></div>}
        <div className={Style.itemBody}>

            <div className={Style.itemTitle}>{itemTitleText || "Check onlines"} <Tag colorNum={3} text={projectName || ""}/><Tag colorNum={5} text={teamName || ""}/>{repeattType && <Tag colorNum={1} text={repeattType}/>}{onWhichDays && <Tag colorNum={1} text={onWhichDays}/>}{null && <Tag colorNum={1} text={"Hidden"}/>} {acknowledgeBy && <Tag colorNum={1} text={acknowledgeBy}/>}</div>

            <div className={Style.itemSubtitle}>{  itemSubtitleText || "Go to ops mvs check online cics and make sure to send email to all members including managers of every team and remeber to release all jobs. Later fix any abends which may occur with other teams first do call out then sent a mail then proceed with instructions "}</div>
           
            <div className={Style.itemOptions}>

                 <div className={Style.itemOption}>
                    <div className={Style.itemOptionTitle}>Start Time</div>
                    <div className={Style.itemOptionSubtitle}>{startTime}</div>
                </div>
               { endTime && <div className={Style.itemOption}>
                    <div className={Style.itemOptionTitle}>End Time</div>
                    <div className={Style.itemOptionSubtitle}>{endTime}</div>
                </div>}
              { occurrences && <div className={Style.itemOption}>
                    <div className={Style.itemOptionTitle}>Occurrences</div>
                    <div className={Style.itemOptionSubtitle}>{occurrences}</div>
                </div> }
               
               { duration && <div className={Style.itemOption}>
                    <div className={Style.itemOptionTitle}>Duration</div>
                    <div className={Style.itemOptionSubtitle}>{parseISODuration(duration).hours!==0 && `${parseISODuration(duration).hours} h`} { ` ${parseISODuration(duration).minutes} min`} </div>
                </div>}
               { intervels && <div className={Style.itemOption}>
                    <div className={Style.itemOptionTitle}>Inervels</div>
                    <div className={Style.itemOptionSubtitle}>{intervels    }</div>
                </div>}
                
            </div>
           
        </div>
        
        <div className={Style.itemTail}>{actionElements}</div>
    </div>
  )
}

export default Checksitem