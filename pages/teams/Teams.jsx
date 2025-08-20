import React, { useEffect, useState } from 'react'
import Appbar from '../../components/appbar/Appbar'
import Pagebody from '../pagebody/Pagebody'
import Listview from '../../components/listview/Listview'
import { Actionsbutton, Tags, Toggle } from '../../components'
import Style from './teams.module.css';
import FeatureTemplate from '../../components/featuretemplate/FeatureTemplate'
import { useDialog } from '../../hooks'
import Teammodal from '../../models/teammodel/Teammodal'
import { getTeamsByUserId } from '../../api/Team'
import { useAuth } from '../../context/AuthContext'
import Teamlist from '../../components/teamlist/Teamlist'
import Tag from '../../components/tags/Tag'
import Teamitem from '../../components/teamlist/Teamitem'
import { useNavigate } from 'react-router'

function Teams() {
    
  const navigate = useNavigate()
  const [teams, setTeams] = useState(null);
  const {user} = useAuth();

  const loadTeams = async () => {
    if(!user && !user.id) return;
    const teams = await getTeamsByUserId(user.id);
    if(!teams) return;
    setTeams(teams);
  }

  const navigateToTeamView = (teamId, teamObject) => {
    navigate(`/teams/${teamId}`,{ state: teamObject })
  }

  useEffect(()=>{
    loadTeams();
  },[])

  const [openDialog, closeDialog, Dialog] = useDialog(<Teammodal loadTeams={loadTeams}/>)

  
  return (
    <div id='teams'>
      <Appbar showBackButton={false} title="Teams" subtitle="Manage your teams efficiently" showActionsButtons={true} actionButtonText='Create team' actionFunc={openDialog}  />
        <Pagebody > 
          { teams && teams.length===0 && Actionsbutton && <FeatureTemplate createTeamFunc={openDialog}></FeatureTemplate>}
          {/* { teams && JSON.stringify(teams)} */}
          { teams && teams.length!==0 && <Teamlist> 
              {teams && teams.map((item,_i)=>{
                return <Teamitem
                isLastItem={_i===teams.length-1}
                key={_i}
                onClick={()=>navigateToTeamView(item.id, item)}
                itemHeaderText={"SU"}
                itemTitleText={item.name}
                itemSubtitleText={"About - " + item.description}
                actionElements={<Tag colorNum={5} text={item.ownerId===user.id? "You are Owner" : null} />} />})}    
              </Teamlist>}
          {Dialog}
      </Pagebody>
    </div>
  )
}

export default Teams