import React from 'react'
import Style from './emptyscreen.module.css';

function EmptyScreen({iconElement, messageHeaderText, messageText}) {
  return (
    <div className={Style.emptyScreenContainer}>
        <div className={Style.messageContainer}>
            <div className={Style.messageIcon}>{iconElement}</div>
            <div className={Style.messageHeader}>{messageHeaderText}</div>
            <div className={Style.message}>{messageText}</div>
        </div>
    </div>
  )
}

export default EmptyScreen