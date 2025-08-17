import React, { useRef } from 'react'
import Style from './dialog.module.css'
import { Button, Icon, Icons, Navbar } from '../../components';
import { ButtonTheme } from '../../components/button/ButtonTheme';
import { ButtonType, Constants, IconSizes, NavType } from '../../strings/constants';

function useDialog(children) {
  const dialogRef = useRef();

  const openDialog = () => {

    console.log("hello from dialog hook");
    
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    const a = setTimeout(()=>{
        dialogRef.current?.close();
        clearTimeout(a);
    },500)
  };

  var Dialog = <dialog className={Style.dialog} ref={dialogRef}>
    <div className={Style.dialogContent}>
      <div className={Style.content}>
        {children}
      </div>
        
        <div className={Style.footer}>
          {/* <Navbar divId={"clickToClose"} direction={Constants.HORIZONTAL} type={NavType.BUTTON} buttonType={ButtonType.LIGHT} links={[{click:closeDialog,element:<p>Close</p>}]}/> */}
          <Button text={"Close"} id={"clickToClose"} theme={ButtonTheme.LIGHT} bordered={false} showBoxShadow={false} onClick={closeDialog}></Button>
          <label  htmlFor="modalSubmit"  className={Style.darkButtonTheme}  > submit </label>
        </div>
    </div>
       
      </dialog>;

  return [openDialog, closeDialog, Dialog];
}
    
export default useDialog;