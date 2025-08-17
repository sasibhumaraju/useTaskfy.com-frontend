import React, { useEffect, useRef, useState } from 'react'
import InputElement from '../inputelement/InputElement'
import Style from './selectoptions.module.css'
import Icon from '../icon/Icon';
import Icons from '../icon/Icons';
import { IconSizes } from '../../strings/constants';

function Selectoptions({label, placeholder, optionsList, selectedOptions, setSelectedOptions, info, infoColor}) {

    const [searchValue, setSearchValue] = useState("");
    const [showOptions, setShowOptions] = useState(false);
    const [optionsListReplica, setOptionsListReplica ] = useState(optionsList || [])
    const [searchList, setSearchList] = useState(optionsListReplica || []);
    const containerRef = useRef(null);

    useEffect(()=>{

        return ()=>{
            setSelectedOptions([])
        };
    },[])

    const handleOnChange = (sv) => {
        const sl = optionsListReplica.filter((item)=>item.name.includes(sv.trim()))
        setSearchList(sl)
        setSearchValue(sv)
    }

    const handleOnFocus = () => {
        setShowOptions(true)
    }

    const handleOnBlur = () => {
        // setShowOptions(false)
    }

    const selectItem = (item) => {
        setOptionsListReplica(prev=>prev.filter((i)=>i.name!==item.name))
        setSearchList(prev=>prev.filter((i)=>i.name!==item.name))
        setSelectedOptions(prev=>[...prev, item])
    }

     const removeItem = (item) => {
        setOptionsListReplica(prev=>[...prev, item])
        setSearchList(prev=>[...prev, item])
        setSelectedOptions(prev=>prev.filter((i)=>i.name!==item.name))
    }

      useEffect(() => {
        const handleClickOutside = (e) => {
          if (containerRef.current && !containerRef.current.contains(e.target)) {
            setShowOptions(false);
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }, []);

  return (
    <div>
    <label className={Style.label} htmlFor={"optionsFilter"} >{label}</label>
    <div className={Style.selectContainer} style={{outline: showOptions? "2px solid black" : "1px solid var(--border-default)"}}>

        {/* {selectedOptions && selectedOptions.map((item)=>{
            return <div>{item.name}</div>
        })} */}

        {selectedOptions &&  
            <div className={Style.selectedFilterContainer}>
            {selectedOptions.map((item, index) => (
                <div key={index} className={Style.selectedOption} onClick={() => removeItem(item)} >
                  <Icon size={IconSizes.sm} icon={Icons.CLOSE} />  {item.name}
                </div>
            ))}
            </div>
        }

         <input
            id='optionsFilter'
            ref={containerRef}
            className={Style.input}
            onChange={(e)=>handleOnChange(e.target.value)}
            onFocus={handleOnFocus}
            value={searchValue}
            type="search" 
            placeholder={placeholder}
            pattern="^\S+$" 
            title="No spaces allowed" 
        ></input>

        {showOptions && searchList && searchList.length>=0 && (
            <div className={Style.filterOptions} ref={containerRef} style={{outline: searchList.length!=0? "1px solid var(--border-default)" : "0px solid transparent"}} >
                {searchList.map((item, index) => (
                    <div key={index} className={Style.filterOption} onClick={() => selectItem(item)}  >
                        {item.name}
                    </div>
                ))}
            </div>
        )}

    </div>
            {info && <div className={Style.info} style={{color:infoColor}}><Icon icon={Icons.INFO}/>{info}</div>}

    </div>
  )
}

export default Selectoptions