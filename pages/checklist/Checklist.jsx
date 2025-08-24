import React, { useCallback, useEffect, useMemo, useState } from 'react'
import App from '../../app/App'
import Appbar from '../../components/appbar/Appbar'
import Pagebody from '../pagebody/Pagebody'
import Listview from '../../components/listview/Listview';
import { Actionsbutton, Icon, Icons, Toggle } from '../../components';
import Style from './checklist.module.css';
import EmptyScreen from '../../components/emptyscreen/EmptyScreen';
import { IconSizes } from '../../strings/constants';
import { useLocation, useNavigate } from 'react-router';
import Teamlist from '../../components/teamlist/Teamlist';
import Teamitem from '../../components/teamlist/Teamitem';
import Tag from '../../components/tags/Tag';
import { useAuth } from '../../context/AuthContext';
import { useDialog } from '../../hooks';
import Projectmodal from '../../models/projectmodal/Projectmodal';
import { getTeamsWithProjectsAndChecklistsByUserId, getTeamsWithProjectsByUserId } from '../../api/Team';
import Checkslist from '../../components/checkslist/Checkslist';
import Checksitem from '../../components/checkslist/Checksitem';
import Checklistmodal from '../../models/checklistmodel/Checklistmodal';
import InputElement from '../../components/inputelement/InputElement';
import { deleteCheck } from '../../api/CheckList';
import Hnavloading from '../../components/loadingC/Hnavloading';
import Teamsloading from '../../components/loadingC/Teamsloading';


function Checklist() {

  const navigate = useNavigate()
  const [teams, setTeams] = useState(null);
  const [activeIndex2, setActiveIndex2] = useState(0);
  const [activeIndex1, setActiveIndex1] = useState(0);
  const [checklist, setChecklist] = useState(null);
  const {user} = useAuth();

  const location = useLocation(); 

  useEffect(()=> {
      const queryParams = new URLSearchParams(location.search);
      const currentTeam = queryParams.get('team');
      const currentProject = queryParams.get('project');
      if(!currentTeam && teams) navigate(`/checklist?team=${ teams && teams[0].name}&project=${ teams && teams[0]?.projects[0]?.name }`);
      var a1=activeIndex1;
      var a2=activeIndex2;
      teams && teams.map((t,_i)=>{
        if(t.name === currentTeam) {
          console.log("active index1", _i);
              var flag = 0;
              setActiveIndex1(_i);
              a1=_i;
              t.projects.map((p,_j)=>{
                if(p.name === currentProject){
                console.log("active index1", _j);
                flag = 1;
                setActiveIndex2(_j);
                a2=_j}
                if(_j===t.projects.length-1 && flag===0) {
                  setActiveIndex2(0);
                  a2=0;
                }
              })
        }
      })

    loadChecklists(a1,a2);

  },[location,teams])
  
   const lT = useCallback((teams)=>{
    setTeams(teams);
  },[])

  const loadChecklists = async (a1,a2) => {
    setChecklist(null)
    const tp = await getTeamsWithProjectsAndChecklistsByUserId(user.id);
     if(!tp || tp && tp.length===0) return
    var l = tp[a1].checklists.filter((i)=>i.projectName===tp[a1].projects[a2].name);
    l.sort((a, b) => {
      // Create Date objects using a dummy date (e.g., '1970-01-01') and the time string
      const dateA = new Date(`1970-01-01T${a.startTime}Z`);
      const dateB = new Date(`1970-01-01T${b.startTime}Z`);
      
      // Subtracting Date objects returns the difference in milliseconds
      return dateA - dateB; 
    })
    console.log(JSON.stringify(l));
    setChecklist(l)
    // lT(tp)
    // setTeams(tp);
    return tp;
  }

 

  const getProjectsFromTeam = async (teamName, projectName) => {
    const queryParams = new URLSearchParams(location.search);
    const tN = teamName? teamName : queryParams.get('team');
    const pN = projectName? projectName : queryParams.get('project');
    navigate(`/checklist?team=${tN}&project=${pN}`);
  }

  const loadTeams = async () => {
    setChecklist(null)
    if(!user && !user.id) return;
    const tp = await getTeamsWithProjectsAndChecklistsByUserId(user.id);
    if(!tp || tp && tp.length===0) return
    var l = tp[activeIndex1].checklists.filter((i)=>i.projectName===tp[activeIndex1].projects[activeIndex2].name);
    setChecklist(l)
    if(!tp) return;
    setTeams(tp);
  }

  const removeCheck = async (checkId) => {
      await deleteCheck(checkId)
      loadTeams()
  }

  useEffect(()=>{
      loadTeams();
  },[])

  const [openDialog, closeDialog, Dialog] = useDialog(<Checklistmodal loadTeams={loadTeams} teamId={teams && teams[activeIndex1].id} teamName={teams && teams[activeIndex1].name } projectName={teams && teams[activeIndex1].projects.length > 0 && teams[activeIndex1].projects[activeIndex2].name } getProjectsFromTeam={getProjectsFromTeam}/>)

  return (
    <div>
      <Appbar showBackButton={false} title="Checklist" subtitle="Manage your checklist efficiently" showActionsButtons={ teams && teams[activeIndex1].ownerId===user.id && teams && teams[activeIndex1].projects.length > 0 } actionButtonText='Add new check' actionFunc={()=>{openDialog()}}  />
        <Pagebody 
          pageNavs1={teams && teams.map(t=>{ return { element:<p>{t.name}</p>, click:()=>{getProjectsFromTeam(t.name,null)} }}  )} 
          intialActiveIndex1={activeIndex1}
          loadingElement1={<Hnavloading n={3}/>}

          pageNavs2={teams && teams[activeIndex1].projects.map(p=>{ return { element:<p>{p.name}</p>, click:()=>{getProjectsFromTeam(null,p.name)} }}  )} 
          intialActiveIndex2={activeIndex2}
          loadingElement2={<Hnavloading n={5}/>}
        >

      { (!teams || !checklist) && <Teamsloading bordered={true}/>}
      { teams && teams.length===0 && <EmptyScreen iconElement={<Icon size={IconSizes.lg} icon={Icons.LIST}></Icon>} messageHeaderText={"No Teams! No Projects! So no checklist"} messageText={"First create your team or be a part of others to see or add checklist"} /> }   
      { teams && teams.length>0 &&  teams[activeIndex1].projects.length===0 && <EmptyScreen iconElement={<Icon size={IconSizes.lg} icon={Icons.LIST}></Icon>} messageHeaderText={"Add projects come again here"} messageText={"Go to your project section add new project for your team come again here"} />}
      { teams && teams[activeIndex1].projects.length>0 && checklist && checklist.length===0 && <EmptyScreen iconElement={<Icon size={IconSizes.lg} icon={Icons.LIST}></Icon>} messageHeaderText={`Add checklists to your project`} messageText={"Only owners of the team could add checklist as of now if you are the one feel free to add one"} /> }

       { checklist && checklist.length>0 &&
              <Checkslist bordered={true}> 
                  { checklist.map((item,_i)=>{
                    return <Checksitem
                  
                        isLastItem={_i===checklist.length-1}
                        key={_i}
                        cursor={"default"}
                        bordered={true}
                        itemTitleText={item.name}
                        itemSubtitleText={ item.description}
                        occurrences={item.occurrences || "∞"}
                        startTime={item.startTime}
                        duration={item.duration}
                        intervels={item.intervals}
                
                        projectName={item.projectName}
                        teamName={ teams && teams[activeIndex1].name}
                        repeattType={item.repeatType}
                        onWhichDays={item.onWhichDays && item.onWhichDays.length>0 && item.onWhichDays.flat()}
                        actionElements={<> { teams && teams[activeIndex1]?.ownerId===user.id &&  <Actionsbutton actions={[{ name: "Remove", actionFunc: ()=>{removeCheck(item.id)} },  ]} />}</>} />
                      
                    })}  
                 </Checkslist>
        }    
             
        {Dialog}
      </Pagebody>
    </div>
  )
}

export default Checklist