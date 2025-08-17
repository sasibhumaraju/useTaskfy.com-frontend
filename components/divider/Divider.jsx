import React from 'react'

function Divider({ horizontalMargin = "0px", verticalMargin = "0px", borderWidth = "1px", borderColor = "var(--border-default)" }) {
  return (
    <div style={{ borderBottom: `${borderWidth} solid ${borderColor}`, height: `${borderWidth}`, margin: `${verticalMargin} ${horizontalMargin}` }}></div>
  )
}

export default Divider