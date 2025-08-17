import React, { useRef, useState } from 'react'
import Style from './searchelement.module.css'
import Icon from '../icon/Icon';
import { IconSizes } from '../../strings/constants';
import Icons from '../icon/Icons';
import InputElement from '../inputelement/InputElement';
import {  searchUsersByEmail } from '../../api/User';

function Searchelement({ label, title, placeholder, value, onChange,existingItems, offLineSelectItems, selectedItems, setSelectedItems }) {

      const [showOptions, setShowOptions] = useState(false);
      const containerRef = useRef(null);

      const [searchList, setSearchList] = useState(null);
      const [searchValue, setSearchValue] = useState("");

      const handleOnChange =  async (e) => {
        var v = e.target.value;
        setSearchValue(v);
        if(v.trim()==="") { setSearchValue(""); setSearchList(null); setShowOptions(false); return;}
        var us = await searchUsersByEmail(v)
        if(us && us.length>0) {
           console.log(JSON.stringify(us));
           checkBeforeAndSelect(us);
        } else {
            setSearchList(null); setShowOptions(false);
        }
      }

      const checkBeforeAndSelect = (us) => {
        var l = []
         for(var i = 0; i<us.length; i++) {
            var e1 = us[i].email;
            var f1 = (selectedItems.filter(o=>o.email===e1).length===0);
            var f2 = (existingItems.filter(o=>o.email===e1).length===0);
            if(f1 && f2) l.push(us[i]);
           }
        if(l.length>0){ setSearchList(l); setShowOptions(true); }else {setSearchList(null); setShowOptions(false)}

      }

      const removeSelectedItem = (item)=>{
        setSelectedItems(prev => prev.filter(i=>i.email!==item.email));
        setSearchList(null)
        setShowOptions(false);
        setSearchValue("")
      }

      const selectItem = (item) => {
         setSelectedItems(prev => [...prev,item]);
         setSearchList(null)
         setShowOptions(false);
         setSearchValue("")
      }


  return (
    <div className={Style.searchElementContainer}>
        {/* <div className={Style.searchElementContainer} style={{ marginBottom }}>
            <label htmlFor={label} className={Style.label}>{label}</label>
            <input title={title} type={type} placeholder={placeholder} value={value} pattern={pattern} onChange={onChange} className={Style.input} id={label} required={required} disabled={disabled} />
        </div> */}

         {selectedItems &&  
            <div className={Style.selectedFilterContainer}>
            {selectedItems.map((item, index) => (
                <div key={index} className={Style.selectedFilter} onClick={() => removeSelectedItem(item)} >
                  <Icon size={IconSizes.sm} icon={Icons.CLOSE} />  {item.email}
                </div>
            ))}
            </div>
        }

        <InputElement
            label={"Search email to add member"}
            onChange={handleOnChange}
            value={searchValue}
            type="search" 
            placeholder="Search email" 
            pattern="^\S+$" 
            title="No spaces allowed" 
            marginBottom='0px'
        />

        {showOptions && (
            <div className={Style.filterOptions} ref={containerRef}  >
                {searchList &&
                    searchList.map((item, index) => (
                    <div key={index} className={Style.filterOption} onClick={() => selectItem(item)}  >
                        {item.email}
                    </div>
                    ))}
            </div>
        )}
    </div>
  )
}

export default Searchelement