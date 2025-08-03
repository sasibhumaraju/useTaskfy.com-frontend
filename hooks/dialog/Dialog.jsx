import React, { useRef } from 'react'
import Style from './dialog.module.css'

function useDialog(children) {
  const dialogRef = useRef();

  const openDialog = () => {

    console.log("hello from dialog hook");
    
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  var Dialog = <dialog className={Style.dialog} ref={dialogRef}>
    <div className={Style.dialogContent}>
       <button onClick={closeDialog}>Close</button>
        {children}
    </div>
       
      </dialog>;

  return [openDialog, closeDialog, Dialog];
}
    
export default useDialog;