import React, { useEffect, useRef, useState } from 'react'
import Appbar from '../../components/appbar/Appbar'
import Pagebody from '../pagebody/Pagebody'
import { useLocation, useNavigate, useParams } from 'react-router';
import { getLocalStorage, setLocalStorage } from '../../util/Localstorage';
import Listview from '../../components/listview/Listview';
import { Actionsbutton } from '../../components';
import { useDialog } from '../../hooks';
import InputElement from '../../components/inputelement/InputElement';


function Tasks() {

  const location = useLocation();
  const navigate = useNavigate();
   const  [intialActiveParamIndex, setIntialActiveParamIndex] = useState(null);
   const  [intialTaskStatus, setIntialTaskStatus] = useState(null);

   const [openDialog, closeDialog, Dialog] = useDialog( <InputElement
         label="Title"
         type="text"
         placeholder={"Enter task title"}
        
         onChange={() => {}}
       />);

   const [selectedFilter, setSelectedFilter] = useState([]);

  const pageNavs = [
                {to:"/focus",element:<p>Focus</p>,  headIcon: null}, 
                {to:"/active",element:<p>Active</p>,  headIcon: null}, 
                {to:"/pending",element:<p>Overdue</p>, headIcon: null}, 
                {to:"/finished",element:<p>Finished</p>, headIcon: null},  ];  
  const paramClicks = [
                {click:()=>{getTeamTaks("Mainframe Operations")},element:<p>Mainframe Operations</p>,  headIcon: null}, 
                {click:()=>{getTeamTaks("Mainframe Storage")},element:<p>Mainframe Storage</p>, headIcon: null}, 
                {click:()=>{getTeamTaks("Mainframe CICS")},element:<p>Mainframe CICS</p>, headIcon: null}, 
                {click:()=>{getTeamTaks("Mainframe Automation")},element:<p>Mainframe Automation</p>, headIcon: null}]; 


  const setUp = async () => {
    const queryParams = new URLSearchParams(location.search);
      let team = queryParams.get('team');
      if(team === null || team === undefined) {
        team = await getLocalStorage("team");
      }

      console.log(`Team from query params: ${team}`);

      switch(team) {
        case "Mainframe Operations":
          setIntialActiveParamIndex(0);
          break;
        case "Mainframe Storage":
          setIntialActiveParamIndex(1);
          break;
        case "Mainframe CICS":
          setIntialActiveParamIndex(2);
          break;
        case "Mainframe Automation":
          setIntialActiveParamIndex(3);
          break;
        default:
          setIntialActiveParamIndex(0);
      }
      setLocalStorage("team", team);
      setLocalStorage("taskStatus", "active");
  }
  
  useEffect( () => {
    setUp();
  }, [location.search]); // ✅ watch for search change

  const getTeamTaks = (team) => {
    // console.log(`Fetching tasks for team: ${team} from location: ${location.pathname}`);
    navigate(`/task?team=${team}`);
    // console.log(`Location changed to: ${JSON.stringify(queryParams.get('team'))}`);
  }

  const testMethod = () => { 
    console.log("hello from actions button"); 
  } 

  return (
    <div> 
      <Appbar  title="Tasks" subtitle="Manage your tasks efficiently" showActionsButtons={true} actionFunc={openDialog} />
       {intialActiveParamIndex !== null && (
      <Pagebody 
        pageNavs={paramClicks} 
        paramClicks={pageNavs} 
        intialActiveParamIndex={intialActiveParamIndex}
        // filters={["Mainframe Operations", "Mainframe Storage", "Mainframe CICS", "Mainframe Automation"]}
        // selectedFilter={selectedFilter}
        // setSelectedFilter={setSelectedFilter}
        > 

        {/* <h1>Tasks Page</h1>
        <p>Selected Team: {getLocalStorage("team")}</p>
        <p>Selected Task Status: {getLocalStorage("taskStatus")}</p>
        <p>Selected Filters: {selectedFilter.join(', ')}</p> */}
       {Dialog}
       <InputElement
         label="Title"
         type="text"
         placeholder={"Enter task title"}
        
         onChange={() => {}}
       />
        <Listview items={["Task 1", "Task 2", "Task 3", "Task 4"]} actionsElement={ <Actionsbutton actions={[{ name: "Acknowledge", actionFunc: testMethod },  ]} />}  />

      </Pagebody>
    )}
  
    </div>
  )
}

export default Tasks