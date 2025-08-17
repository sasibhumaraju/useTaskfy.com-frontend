import React, { useEffect, useRef, useState } from 'react'
import Style from './filter.module.css'
import Icon from '../icon/Icon'
import Icons from '../icon/Icons'
import { IconSizes } from '../../strings/constants'


const  Filter = ({ filters, selectedFilter, setSelectedFilter }) => {
  const [showOptions, setShowOptions] = useState(false);
  const containerRef = useRef(null);

  const [allFilters, setAllFilters] = useState(filters || []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFilterSelect = (filter) => {
     console.log(`Selected filter: ${filter}`);
    setSelectedFilter(prev => {
      if (prev.includes(filter)) {
        return prev.filter(item => item !== filter);
      } else {
        return [...prev, filter];
      }
    });
     setAllFilters(prev => {
      if (prev.includes(filter)) {
        return prev.filter(item => item !== filter);
      } else {
        return [...prev, filter];
      }
    });
    // console.log(`Selected filter: ${filter}`);
    
    // Optionally, you can close the dropdown after selection
    setShowOptions(false);
  };


   const removeSelectedFilter = (filter) => {
     console.log(`Removed selected filter: ${filter}`);
    setSelectedFilter(prev => {
      if (prev.includes(filter)) {
        return prev.filter(item => item !== filter);
      } else {
        return [...prev, filter];
      }
    });
     setAllFilters(prev => {
      if (prev.includes(filter)) {
        return prev.filter(item => item !== filter);
      } else {
        return [...prev, filter];
      }
    });
    // console.log(`Selected filter: ${filter}`);
    
    // Optionally, you can close the dropdown after selection
    setShowOptions(false);
  };

  return (
    <div className={Style.filter}>
        <div ref={containerRef} className={`${Style.hInActive} ${Style.lightButton}`} onClick={() => setShowOptions((prev) => !prev)}  >
            <Icon size={IconSizes.sm} icon={Icons.FILTER} />
            Filter
            <Icon size={IconSizes.sm} icon={Icons.DROP_DOWN} />
        </div>
        {selectedFilter && selectedFilter.length > 0 && 
            selectedFilter.map((filter, index) => (
                <div key={index} className={Style.selectedFilter} onClick={() => removeSelectedFilter(filter)} >
                  <Icon size={IconSizes.sm} icon={Icons.CLOSE} />  {filter}
                </div>
            ))
        }
        {showOptions && (
            <div className={Style.filterOptions} ref={containerRef}  >
            <div  className={Style.filterOption} onClick={()=>console.log("Select Filter By")}   >
                    Select Filter By
            </div>
            {allFilters &&
                allFilters.map((filter, index) => (
                <div key={index} className={Style.filterOption} onClick={() => handleFilterSelect(filter)}  >
                    {filter}
                </div>
                ))}
            </div>
        )}
    </div>
  );
};

export default Filter;
