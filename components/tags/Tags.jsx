import React from 'react'
import Style from './tags.module.css'
import Icon from '../icon/Icon'
import { IconSizes } from '../../strings/constants'
import Icons from '../icon/Icons'

function Tags({tags}) {

    // tag.name
    // tag.color
    // tag.id   
    // tag.description

    // team tag
    // project tag
    // task tag - Active tag, Finished tag, Overdue tag, Focus tag
    // user tag
  return (
    <div className={Style.tagsContainer}>
        {tags && tags.map((tag, index) => (
            <div key={index} className={Style.tag} style={{backgroundColor:tag.BG_COLOR, color:tag.TEXT_COLOR}}>
                {/* <Icon size={IconSizes.xs} icon={Icons.TAG_TEAM} />  */}
                {tag.ICON}
                {tag.NAME}
            </div>
        ))}
    </div>
  )
}

export default Tags