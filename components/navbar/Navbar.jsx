import React, { use, useEffect, useState } from 'react'
import {ButtonType, Constants, NavType} from '../../strings/constants';
import Style from './navbar.module.css'
import { useLocation, useNavigate } from 'react-router';

export default function Navbar({links, direction, divId, type, buttonType, bordered=false, intialActiveIndex=0,  

    activeIndex, 
}) {

    const [navs, setNavs] = useState(null);     
    const navigate = useNavigate(); 
    const location = useLocation(); 

    useEffect(()=>{
       activateThisLink(intialActiveIndex)
    },[intialActiveIndex])
  
    const getNavLinkClass = (classType) => {     
        if( Constants.VERTICAL === direction ) {        
            return classType === Constants.ACTIVE? Style.vActive : Style.vInActive;     
        }       
        if( Constants.HORIZONTAL === direction ) {      
            return classType === Constants.ACTIVE? Style.hActive : Style.hInActive;        
        }       
    }    

    const [classL, setClassL] = useState(Array.from({ length: links.length }, (_,i)=> i==intialActiveIndex && type==NavType.NAV? getNavLinkClass(Constants.ACTIVE) : getNavLinkClass(Constants.IN_ACTIVE)))

    const makeThisActive = (idx) => {
        links[idx]?.to && navigate(links[idx]?.to);
        links[idx].click && links[idx].click();
        activateThisLink(idx)
    }

    const activateThisLink = (idx) => {
         if(NavType.NAV === type) {
            links[idx]?.to && navigate(links[idx]?.to);
            var l = Array.from({ length: links.length }, (_,i)=> i==idx? getNavLinkClass(Constants.ACTIVE) : getNavLinkClass(Constants.IN_ACTIVE))
            setClassL(l); }
    }

    useEffect(()=>{
        var l = links.map((link,_i)=>{
            var toLink = link.to;
            var element = link.element;
            var headIcon = link.headIcon? <div className={Style.headIcon}>{link.headIcon}</div> : null;
            var tailIcon = link.tailIcon? <div className={Style.tailIcon}>{link.tailIcon}</div> : null;
            if(type===NavType.BUTTON) {
                return <div key={_i} className={`${classL[_i]}  ${buttonType===ButtonType.LIGHT? Style.lightButton : Style.darkButton}`} style={{border: bordered? 'default' : 'none', outline: bordered? 'default' : 'none', boxShadow: bordered? 'default' : 'none'}} onClick={()=>makeThisActive(_i)} > {headIcon}  {element} {tailIcon} </div>
            }
            return <div key={_i} id={divId} className={classL[_i]} onClick={()=>makeThisActive(_i)} > {headIcon}  {element} {tailIcon} </div>
        })
        setNavs(l);
    },[links,classL])

  return (
    <div className={ Constants.VERTICAL===direction? `${Style.vertical}` : `${Style.horizontal}`}> {navs} </div>
  )

}
