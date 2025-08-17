import React from 'react'
import Style from './featuretemplate.module.css'
import Button from '../button/Button'
import { ButtonTheme } from '../button/ButtonTheme'
import useTaskfyCoreFeatures from '../../util/Features'
import Card from '../card/Card'

function FeatureTemplate({createTeamFunc}) {

  return (
    <div className={Style.templateContainer}>
        <div className={Style.teamplateHeader}>
            <div className={Style.headerTitle}>Usetaskfy.com is better with teams</div>
            <div className={Style.headerSubtitle}>Collaborate with your team efficiently — organize and track, checklists and tasks, execute projects together in one place."</div>
            <div className={Style.action}>
              <Button text="Create Team" onClick={createTeamFunc} theme={ButtonTheme.DARK} marginTop="10px" marginBottom="10px" type="submit"  />  
            </div>
        </div>
        <div className={Style.templateBody}>
          {useTaskfyCoreFeatures && useTaskfyCoreFeatures.map((fe,i) => {
            return <Card key={i} icon={fe.icon} title={fe.title} message={fe.message} /> 
          })}
        </div>
    </div>
  )
}

export default FeatureTemplate