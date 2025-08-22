import React, { useEffect, useState } from 'react'
import Style from './teamview.module.css'
import Appbar from '../../components/appbar/Appbar'
import Pagebody from '../pagebody/Pagebody'
import { useDialog } from '../../hooks'
import { useAuth } from '../../context/AuthContext'
import { getUsersByTeamId, removeUserFromTeam } from '../../api/Team'
import { useLocation, useNavigate, useParams } from 'react-router'
import EmptyScreen from '../../components/emptyscreen/EmptyScreen'
import { Actionsbutton, Button, Filter, Icon, Icons } from '../../components'
import { IconSizes } from '../../strings/constants'
import Teamlist from '../../components/teamlist/Teamlist'
import Teamitem from '../../components/teamlist/Teamitem'
import Tag from '../../components/tags/Tag'
import { formatZonedTime, formatZonedTime2 } from '../../util/Convertzonedtime'
import Membermodel from '../../models/membermodel/Membermodel'
import Searchelement from '../../components/searchelement/Searchelement'
import InputElement from '../../components/inputelement/InputElement'
import Divider from '../../components/divider/Divider'
import { ButtonTheme } from '../../components/button/ButtonTheme'
import Teamsloading from '../../components/loadingC/Teamsloading'

function Teamview() {

  
  const navigate = useNavigate()
  const location = useLocation()
  const team = location.state;
  const [users, setUsers] = useState(null);
  const {user} = useAuth();
  const params = useParams()
  

  const [f, setF] = useState([])

  const loadTeams = async () => {
    if(!user && !user.id) return;
    const teamId = params.teamId;
    if(!teamId) return
    const users = await getUsersByTeamId(teamId);
    if(!users) return;
    setUsers(users);
  }
  const [openDialog, closeDialog, Dialog] = useDialog(<Membermodel existingItems={users} teamId={params.teamId} loadTeams={loadTeams}/>)

  useEffect(()=>{
    loadTeams();
  },[])

  const helper = (mid,uid,role) =>  {
    if(mid===uid ) return `You are ${role.toLowerCase()}`;
    return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
  }

  const removeMember = async (mid) => {
       await removeUserFromTeam(team.id, mid )
       loadTeams();
  }

  return (
    <div className={Style.teamView}>
        <Appbar showBackButton={true} backButtonFunc={()=>navigate(-1)}  title={ (team && team.name || "Team name")} subtitle={( users?  `${users.length} people work here   &  ` : ` `) + (team && ` Email — ${team.email} `)} showActionsButtons={team && team.ownerId===user.id}  actionButtonText='Add member' actionFunc={openDialog}  />
        <Pagebody > 
          { !users &&  <Teamsloading bordered={false} />}
          { users && users.length===0 && <EmptyScreen iconElement={<Icon size={IconSizes.lg} icon={Icons.TEAM}></Icon>} />}
          { users && <Teamlist bordered={false}> 
              {users && users.map((item,_i)=>{
                return <Teamitem
                isLastItem={_i===users.length-1}
                key={_i}
                cursor={"default"}
                bordered={false}
                itemHeaderText={"SU"}
                itemTitleText={" "+item.name}
                itemSubtitleText={"Email - "+ item.email }
                actionElements={<>{ <Tag colorNum={item.role==="OWNER"? 5 : 3} text={helper(item.id,user.id,item.role)} />} { team.ownerId === user.id && team.ownerId!==item.id && <Actionsbutton actions={[{ name: "Remove", actionFunc: ()=>removeMember(item.id) },  ]} />}</>} />})}    
              </Teamlist> }
          {Dialog}
      </Pagebody>
    </div>
  )
}

export default Teamview