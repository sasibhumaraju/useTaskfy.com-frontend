import React from 'react'
import Style from './listview.module.css'
import Icon from '../icon/Icon'
import { IconSizes } from '../../strings/constants'
import Icons from '../icon/Icons'
import Tags from '../tags/Tags'
import TagsTags from '../tags/TagsTags'



function Listview({ items, actionsElement }) {
  return (
    <div className={Style.listviewContainer}>
      <div className={Style.listview}>
        {items && items.map((item, index) => (
          <div key={index} className={Style.listviewItem} style={{borderBottom: index === items.length - 1 ? 'none' : '1px solid var(--border-default)'}}>
            
            <div className={Style.listviewItemContent}>
                {/* <div className={Style.listviewItemHeaderContainer}> */}
                    <div className={Style.listviewItemHeader}>{"Do cics activity"}</div>
                      <div className={Style.listviewItemTags}><Tags tags={[TagsTags.PROJECT, TagsTags.TASK_ACTIVE, TagsTags.TASK_FINISHED, TagsTags.TASK_FOCUS, TagsTags.TASK_OVERDUE, TagsTags.TEAM, TagsTags.USER]}/></div>

                
                {/* </div> */}

                   <div className={Style.listviewItemBody}>{"Contact cics team before doing this and do a call out to automation team to know the satus of region germany then proceed with IPL"}</div>
                    <div className={Style.listviewItemSubHeader}> <Icon size={IconSizes.xs} icon={Icons.TIME}></Icon> &nbsp; <p>{"Start after 2023-10-31 and Complete before 2023-10-31"}</p></div>
            </div>
            
            <div className={Style.listviewItemActions}>
              {actionsElement}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Listview