import React, { useCallback, useEffect, useRef, useState } from 'react'
import Appbar from '../../components/appbar/Appbar'
import Pagebody from '../pagebody/Pagebody'
import { Form, useLocation, useNavigate, useParams } from 'react-router';
import { getLocalStorage, setLocalStorage } from '../../util/Localstorage';
import Listview from '../../components/listview/Listview';
import { Actionsbutton, Icon, Icons } from '../../components';
import { useDialog } from '../../hooks';
import InputElement from '../../components/inputelement/InputElement';
import FormElement from '../../components/formelement/Formelement';
import EmptyScreen from '../../components/emptyscreen/EmptyScreen';
import { IconSizes } from '../../strings/constants';
import Checkslist from '../../components/checkslist/Checkslist';
import Checksitem from '../../components/checkslist/Checksitem';
import { getTeamsByUserId, getTeamsWithProjectsAndChecklistsByUserId } from '../../api/Team';
import { useAuth } from '../../context/AuthContext';
import Checklistmodal from '../../models/checklistmodel/Checklistmodal';
import { acknowledgeTaskByMe, completeTaskByMe, getActiveTasksByTeamId, killTaskByMe } from '../../api/Task';
import Taskmodel from '../../models/taskmodel/Taskmodel';
import { getProjectsByTeamId } from '../../api/Project';
import Hnavloading from '../../components/loadingC/Hnavloading';
import Teamsloading from '../../components/loadingC/Teamsloading';
import Checklistloading from '../../components/loadingC/Checklistloading';


function Tasks() {

  useEffect(() => {
        document.title = "Tasks | UseTaskfy.com";
      }, []);
  

  const navigate = useNavigate()
  const [teams, setTeams] = useState(null);
  const [activeIndex2, setActiveIndex2] = useState(0);
  const [activeIndex1, setActiveIndex1] = useState(0);
  const [checklist, setChecklist] = useState([]);
  const [tasks, setTasks] = useState(null);
  const [showBorder, toggleShowBorder] = useState(true);
  const [projects, setProjects] = useState(null)
  const {user} = useAuth();

  const location = useLocation(); 

  const statusClicks = [ 
    {element:"Upcoming", click:()=>{navigateTasks("Upcoming")}}, 
    {element:"Active", click:()=>{navigateTasks("Active")}},
    {element:"Overdue", click:()=>{navigateTasks("Overdue")}},
    {element:"Working", click:()=>{navigateTasks("Working")}}, ]

 

  useEffect(()=> {

      const queryParams = new URLSearchParams(location.search);
      const currentTeam = queryParams.get('team');
      const currentStatus = queryParams.get('status');
      if(!currentTeam && teams && teams.length>0 ) navigate(`/tasks?team=${ teams && teams[0].name}&status=${currentStatus}`);

      var a1=activeIndex1;
      var a2=activeIndex2;
      teams && teams.map((t,_i)=>{
        if(t.name === currentTeam) {
              setActiveIndex1(_i); a1=_i;
              statusClicks.map((status,_j)=>{
                if(status.element === currentStatus) {
                  setActiveIndex2(_j); a2=_j }
              })
        }
      })
      // loadChecklists(a1,a2)
      if(teams === null || teams.length===0) return;
      const teamId = teams[a1].id;
      loadActiveTasksByTeam(teamId,a2)
  },[location,teams])


  const loadActiveTasksByTeam = async (teamId,a2) => {
    setTasks(null)
    console.log("team id : ", teamId, "idex",  a2);
    const activeTasks = await getActiveTasksByTeamId(teamId);
    if(!activeTasks) return;
    var h = activeTasks.filter((item)=>item.status===statusClicks[a2].element.toUpperCase());
    console.log(h);
    setTasks(h)
  }


  const navigateTeams = async (teamName) => {
    navigate(`/tasks?team=${teamName}&status=${statusClicks[0].element}`);
  }

  const navigateTasks = (statusType) => {
    navigate(`/tasks?team=${teams && teams[activeIndex1].name}&status=${statusType}`);
  }

  const loadTeams = async () => {
    if(!user && !user.id) return;
    const tp = await getTeamsByUserId(user.id);
    setTeams(tp);
    if( tp && tp.length===0) return
    loadProjects(tp[activeIndex1]?.id);
  }

  const acknowledgeTask = async (taskId) => {
      await acknowledgeTaskByMe(taskId);
      await loadActiveTasksByTeam( teams[activeIndex1].id, activeIndex2)
  }

  const completeTask = async (taskId) => {
    await completeTaskByMe(taskId)
    await loadActiveTasksByTeam( teams[activeIndex1].id, activeIndex2)
  }

  const killTask = async (taskId) => {
    await killTaskByMe(taskId)
    await loadActiveTasksByTeam( teams[activeIndex1].id, activeIndex2)
  }

  useEffect(()=>{
    if(!teams || teams && teams.length===0) return
    loadProjects(teams[activeIndex1]?.id);
  },[activeIndex1])

  const loadProjects = async (teamId) => {
    const ps = await getProjectsByTeamId(teamId);
    console.log(JSON.stringify(ps));
    if( ps && ps.length===0){ 
      setProjects(null)
      return;}
    console.log(JSON.stringify(ps));
    var t = ps.map((p)=>p.name);
    setProjects(t)
    
  }

  useEffect(()=>{
      loadTeams();
  },[])

  useEffect(() => {
  const loopThis = async () => {
    console.log("Interval running...");
    if (projects && projects.length > 0 && teams && teams.length > 0) {
      await loadActiveTasksByTeam(teams[activeIndex1].id, activeIndex2);
    }
  };

  const interval = setInterval(loopThis, 30 * 1000);
  return () => clearInterval(interval);
}, [projects, teams, activeIndex1, activeIndex2]);

  const [openDialog, closeDialog, Dialog] = useDialog(<Taskmodel loadTasks={()=>loadActiveTasksByTeam( teams && teams.length>0 && teams[activeIndex1].id, activeIndex2)} teamId={teams && teams.length>0 && teams[activeIndex1].id} teamName={teams && teams.length>0 && teams[activeIndex1].name }  />)

  return (
    <div>
      <Appbar showBackButton={false} title="🌦️ Tasks" subtitle="Work on your tasks efficiently" showActionsButtons={ teams && projects && teams  } actionButtonText='Add new task' actionFunc={()=>{openDialog()}}  />
        <Pagebody 
          pageNavs1={teams && teams.map((t)=>{ return { element:<p>{t.name}</p>, click:()=>{navigateTeams(t.name)} }}  )} 
          intialActiveIndex1={activeIndex1}
          loadingElement1={<Hnavloading n={3}/>}

          pageNavs2={ (teams && teams.length===0 && []) ||teams && projects  && statusClicks} 
          intialActiveIndex2={activeIndex2}
          loadingElement2={<Hnavloading n={5}/>}
        >


      {( !teams && !tasks )  && <Checklistloading status={true} n={3} />}   
      {teams && teams.length===0  && <EmptyScreen iconElement={<Icon size={IconSizes.lg} icon={Icons.TASK}></Icon>} messageHeaderText={`Be in some team or create yours`} messageText={"Add tasks to your list or be in some team or create your own team."} /> }
      {teams && teams.length>0 && projects && projects.length===0 && <EmptyScreen iconElement={<Icon size={IconSizes.lg} icon={Icons.TASK}></Icon>} messageHeaderText={"Add projects come again here"} messageText={"Tasks won't be created or found without projects"} /> }
      {teams && projects && tasks && tasks.length===0 && projects && <EmptyScreen iconElement={<Icon size={IconSizes.lg} icon={Icons.TASK}></Icon>} messageHeaderText={`No ${statusClicks[activeIndex2].element} tasks found`} messageText={"No tasks found right now! wait for sometime and monitor properly."} />  }
       { tasks && tasks.length>0 &&
              <Checkslist bordered={true}> 
                  { tasks.map((item,_i)=>{
                    
                    if(item.status === statusClicks[activeIndex2].element.toUpperCase()) {
                      
                    return  <Checksitem
                        isLastItem={_i===tasks.length-1}
                        key={_i}
                        cursor={"default"}
                        bordered={true}
                        itemTitleText={item.name}
                        itemSubtitleText={ item.description}
                        // occurrences={item.occurrences || "∞"}
                        startTime={item.startTime}
                        endTime={item.endTime}
                        status={item.status}
                        // duration={item.duration}
                        // intervels={item.intervals}
                
                        projectName={item.projectName}
                        teamName={item.teamName}
                        acknowledgeBy={item.acknowledgeBy}
                        // repeattType={item.repeatType}
                        // onWhichDays={item.onWhichDays.flat()}
                        actionElements={<> {  item.status!=="UPCOMING" && item.status!=="COMPLETED" && item.status!=="KILLED" &&  item.acknowledgeBy===null && <Actionsbutton actions={[ { name: "Acknowledge", actionFunc: ()=>{acknowledgeTask(item.id)} },  ]} />}
                        { item.acknowledgeBy===user.email && item.status!=="COMPLETED" && item.status!=="KILLED" && <Actionsbutton actions={[ { name: "Completed", actionFunc: ()=>{completeTask(item.id)} }, { name: "Kill", actionFunc: ()=>{killTask(item.id)} } ]} />}
                        </>} />}
                      
                    })}  
                 </Checkslist>
        }    
             
        {Dialog}
      </Pagebody>
    </div>
  )
}

export default Tasks