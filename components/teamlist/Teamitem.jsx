import React from 'react'
import Style from './teamlist.module.css'

function Teamitem({itemHeaderText, itemTitleText, itemSubtitleText, actionElements, isLastItem, onClick, bordered=true, cursor}) {
  return (
    <div className={Style.itemContainer} onClick={onClick} style={{ borderBottom: isLastItem || !bordered? "none" : null, cursor:cursor }}>
        {/* <div className={Style.itemHeader}>{itemHeaderText}</div> */}
        <div className={Style.itemBody}>
            <div className={Style.itemTitle}>{itemTitleText}</div>
            <div className={Style.itemSubtitle}>{  itemSubtitleText}</div>
        </div>
        <div className={Style.itemTail}>{actionElements}</div>
    </div>
  )
}

export default Teamitem