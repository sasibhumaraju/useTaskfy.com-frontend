import React, { useEffect, useState } from 'react'
import Appbar from '../../components/appbar/Appbar'
import Pagebody from '../pagebody/Pagebody'
import { useLocation, useNavigate, useParams } from 'react-router';
import { getLocalStorage, setLocalStorage } from '../../util/Localstorage';


function Tasks() {

  const location = useLocation();
  const navigate = useNavigate();
   const  [intialActiveParamIndex, setIntialActiveParamIndex] = useState(null);

  const pageNavs = [
                {to:"/focus",element:<p>Focus</p>,  headIcon: null}, 
                {to:"/active",element:<p>Active</p>,  headIcon: null}, 
                {to:"/pending",element:<p>Pending</p>, headIcon: null}, 
                {to:"/finished",element:<p>Finished</p>, headIcon: null}, 
                {to:"/all",element:<p>All</p>, headIcon: null}, ];  
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
  }
  
  useEffect( () => {
    setUp();
  }, [location.search]); // ✅ watch for search change




  const getTeamTaks = (team) => {
    // console.log(`Fetching tasks for team: ${team} from location: ${location.pathname}`);
    navigate(`/task?team=${team}`);
    // console.log(`Location changed to: ${JSON.stringify(queryParams.get('team'))}`);

  }

  return (
    <div> 
      <Appbar  title="Tasks" subtitle="Manage your tasks efficiently" showActionsButtons={true} />
       {intialActiveParamIndex !== null && (
      <Pagebody 
        pageNavs={pageNavs} 
        paramClicks={paramClicks} 
        intialActiveParamIndex={intialActiveParamIndex} 
      />
    )}
    </div>
  )
}

export default Tasks