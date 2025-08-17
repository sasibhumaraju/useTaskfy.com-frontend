import React, { useEffect, useRef, useState } from 'react'
import Style from './actionsbutton.module.css'
import Icon from '../icon/Icon';
import Icons from '../icon/Icons';
import { ButtonType, Constants, IconSizes, NavType } from '../../strings/constants';
import Navbar from '../navbar/Navbar';
import ActionsIcons from './ActionsIcons';

function Actionsbutton({actions}) {

    const [showOptions, toggleShowOptions] = useState(false);
    const ref = useRef();

    useEffect(()=>{
        // console.log(JSON.stringify(actions));
        
        const handleClickOutside = (e) => {
            
            if(ref.current && !ref.current.contains(e.target)) {
                // console.log("heyy use effect");
                toggleShowOptions(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    },[])

    const handleToggle = () => {
        console.log("hello yaar!");
        toggleShowOptions(!showOptions);
    };
    
    const takeAction = (idx) => {
        console.log(JSON.stringify(actions));
        actions[idx].actionFunc();
        handleToggle();
    };


  return (
    <div className={Style.actionsButtonContainer} ref={ref}>
        {/* <div> */}
        <Navbar direction={Constants.HORIZONTAL} type={NavType.BUTTON} bordered buttonType={ButtonType.LIGHT} 
            links={[{click: handleToggle, element:null,  headIcon: <Icon size={IconSizes.sm} icon={Icons.OPTIONS}></Icon>}]}>
        </Navbar>
        {/* </div> */}

        {showOptions && (
        <div className={Style.filterOptions} ref={ref}>
            {/* <div  className={Style.filterOption} onClick={()=>console.log("Select Filter By")}   >
                    Select Action
            </div> */}
           
              {  actions.map((action, index) => (
                <div key={index} className={Style.filterOption} onClick={() => takeAction(index)}  >
                   {ActionsIcons[action.name.toUpperCase()]}  {action.name}
                </div>
                ))}
        </div>
        )}
    </div>
  )
}

export default Actionsbutton