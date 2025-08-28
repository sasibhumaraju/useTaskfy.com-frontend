import React, { useEffect, useState } from 'react'
import Appbar from '../../components/appbar/Appbar'
import Pagebody from '../pagebody/Pagebody'
import Teamsloading from '../../components/loadingC/Teamsloading'
import Hnavloading from '../../components/loadingC/Hnavloading'
import { useLocation, useNavigate } from 'react-router'
import { getTeamsWithProjectsByUserId } from '../../api/Team'
import { useAuth } from '../../context/AuthContext'

function Leaderboard() {
    const navigate = useNavigate()
    const [teams, setTeams] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const {user} = useAuth();

    const location = useLocation(); 

    useEffect(()=> {
        const queryParams = new URLSearchParams(location.search);
        const currentTeam = queryParams.get('team');
        if(!currentTeam && teams) navigate(`/leaderboard?team=${ teams && teams[0]?.name}`);
        teams && teams.map((t,_i)=>{
            if(t.name === currentTeam) {
            console.log("active index", _i);
                setActiveIndex(_i);
            }
        })
    },[location,teams])

    const getLeaderboardFromTeam = async (teamName) => {
        navigate(`/leaderboard?team=${teamName}`);
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

  return (
    <div id='leaderboard'>
      <Appbar showBackButton={false} title="Leaderboard" subtitle="Where team members show their taskies proudly" showActionsButtons={false}   />
        <Pagebody
            pageNavs1={teams && teams.map(t=>{ return { element:<p>{t.name}</p>, click:()=>{getLeaderboardFromTeam(t.name)} }}  )} 
            loadingElement1={<Hnavloading n={4}/>}
            intialActiveIndex1={activeIndex}
        > 
         Coming soon...
      </Pagebody>
    </div>
  )
}

export default Leaderboard