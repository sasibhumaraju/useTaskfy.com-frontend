import React from 'react'
import Style from './formelement.module.css'
import Appbar from '../appbar/Appbar'

function FormElement({children, onSubmit, title=null, subtitle="", gap="1rem"}) {
  return (
    <form onSubmit={onSubmit} className={Style.formContainer} style={{ gap }}>
     { title && <Appbar title={title} horizontalPadding='0px' verticalPadding='0px' subtitle={subtitle}></Appbar>}  
      {children}
    </form>
  )
}

export default FormElement