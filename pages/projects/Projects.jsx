import React, { useEffect, useState } from 'react'
import Appbar from '../../components/appbar/Appbar'
import Listview from '../../components/listview/Listview'
import { Actionsbutton, Icon, Icons, Toggle } from '../../components'
import Pagebody from '../pagebody/Pagebody';
import Style from './projects.module.css';
import EmptyScreen from '../../components/emptyscreen/EmptyScreen';
import { IconSizes } from '../../strings/constants';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { getTeamsByUserId, getTeamsWithProjectsByUserId } from '../../api/Team';
import { useDialog } from '../../hooks';
import Projectmodal from '../../models/projectmodal/Projectmodal';
import Teamlist from '../../components/teamlist/Teamlist';
import Teamitem from '../../components/teamlist/Teamitem';
import Tag from '../../components/tags/Tag';
import { removeProjectFromTeam } from '../../api/Project';

function Projects() {

  const navigate = useNavigate()
  const [teams, setTeams] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const {user} = useAuth();

  const location = useLocation(); 

  useEffect(()=> {
      const queryParams = new URLSearchParams(location.search);
      const currentTeam = queryParams.get('team');
      if(!currentTeam && teams) navigate(`/projects?team=${ teams && teams[0]?.name}`);
      teams && teams.map((t,_i)=>{
        if(t.name === currentTeam) {
          console.log("active index", _i);
            setActiveIndex(_i);
        }
      })
  },[location,teams])

  const getProjectsFromTeam = async (teamName) => {
    navigate(`/projects?team=${teamName}`);
    const tp = await getTeamsWithProjectsByUserId(user.id);
    setTeams(tp)
    console.log(JSON.stringify(tp[0].projects));
  }

  const loadTeams = async () => {
    if(!user && !user.id) return;
    const teams = await getTeamsWithProjectsByUserId(user.id);
    if(!teams) return;
    setTeams(teams);
  }

  const removeProject = async (teamId, projectId) => {
      await removeProjectFromTeam(teamId, projectId)
      loadTeams()

  }

  useEffect(()=>{
      loadTeams();
  },[])

  const [openDialog, closeDialog, Dialog] = useDialog(<Projectmodal teamId={teams!==null && 
    teams[activeIndex]?.id} 
    teamName={teams && teams[activeIndex]?.name} 
    existingProjectNames={teams && teams[activeIndex]?.projects} 
    existingProjects={teams && teams[activeIndex]?.projects} 
    loadTeams={loadTeams} />)


  return (
    <div>
      <Appbar showBackButton={false} title="Projects" subtitle="Manage your projects efficiently" showActionsButtons={ teams && teams[activeIndex]?.ownerId===user.id } actionButtonText='Add project' actionFunc={()=>{openDialog()}}  />
        <Pagebody 
          pageNavs1={teams && teams.map(t=>{ return { element:<p>{t.name}</p>, click:()=>{getProjectsFromTeam(t.name)} }}  )} 
          intialActiveIndex1={activeIndex}
        >
       {teams && teams.length===0 &&
          <EmptyScreen iconElement={<Icon size={IconSizes.lg} icon={Icons.PROJECT}></Icon>} messageHeaderText={"No Teams! So no projects"} messageText={"First create your team or be a part of others to see or add projects"} /> }   
       { teams && teams[activeIndex]?.projects.length===0 && <EmptyScreen iconElement={<Icon size={IconSizes.lg} icon={Icons.PROJECT}></Icon>} messageHeaderText={"Add your first project"} messageText={"You have to add a projects to your team or someone will, if you don't have option to do so, contact your team owner"} />}

       { teams && <Teamlist bordered={false}> 
              {teams && teams[activeIndex]?.projects.map((item,_i)=>{
                return <Teamitem
                isLastItem={_i===teams[activeIndex]?.projects.length-1}
                key={_i}
                cursor={"default"}
                bordered={false}
                itemHeaderText={"SU"}
                itemTitleText={"Project - "+item.name}
                itemSubtitleText={"About : " + item.description}
                actionElements={<><Tag colorNum={1} text={teams[activeIndex].name} /> { teams && teams[activeIndex].ownerId === user.id  && <Actionsbutton actions={[{ name: "Remove", actionFunc: ()=>{removeProject(teams[activeIndex].id, item.id)} },  ]} />}</>} />})}    
              </Teamlist>}
        {Dialog}
      </Pagebody>
    </div>
  )
}

export default Projects