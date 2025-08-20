import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import RepeatTypes from '../../data/Repeacttype'
import FormElement from '../../components/formelement/Formelement'
import InputElement from '../../components/inputelement/InputElement'
import Textarea from '../../components/textarea/Textarea'
import Selectopen from '../../components/selectopen/Selectopen'
import Selectoptions from '../../components/selectoptions/Selectoptions'
import Duration from '../../components/duration/Duration'
import Style from './taskmodel.module.css'
import { getProjectsByTeamId } from '../../api/Project'
import { addNewTask } from '../../api/Task'

function Taskmodel({teamId, teamName, loadTasks}) {
  
  const { user } = useAuth()

  const [taskName, setTaskName] = useState("")
  const [description, setDescription] = useState("")

  const [projects, setProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState("")

  const [selectedOptions, setSelectedOptions] = useState([])

  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [duration, setDuration] = useState({H:0,M:0})



const [infoColor, setInfoColor] = useState("green")

 
  const handleOnSubmit = async (e) => {
      e.preventDefault();
      if(!user && !user.id) return;
      if(selectedProject ==="") {
        setInfoColor("tomato")
        return;
      }
      console.log("taskName:", taskName);
      console.log("description:", description);
      console.log("project:", selectedProject);
      console.log("selectedOptions:", selectedOptions);
      console.log("startTime:", startTime);
      console.log("endTime:", endTime);
     
    await addNewTask({
        name: taskName,
        description: description,
        startTime: startTime,
        endTime: endTime,
        projectName: projects[selectedProject],
        status: "UPCOMING",
        teamId: teamId,
        teamName: teamName, 
     })
    await  loadTasks()
      
      //  loadTeams()
       closeDialog();
  }

  const closeDialog = () => {
    const e = document.getElementById("clickToClose");
    e.click()
  }

  const loadProjects = async (teamId) => {
    const ps = await getProjectsByTeamId(teamId);
    if(!ps) return;
    console.log(JSON.stringify(ps));
    var t = ps.map((p)=>p.name);
    setProjects(t)
    
  }

  useEffect(()=> {
    loadProjects(teamId)
  },[teamId])

  

  return (
    <div className={Style.taskModalContainer}>

        <FormElement
          title={`Add New Task`}
          subtitle={`Fill details & create a new task for ${teamName}`}
          onSubmit={handleOnSubmit}>
        
       <InputElement
          label="Title for the task"
          type="text"
          placeholder="Enter your task title"
          value={taskName}
          required
          title="Check title must be 3–25 characters long and can include letters, numbers, spaces, and underscores."
          pattern="^[a-zA-Z0-9_ ]{3,25}$"
          onChange={(e) => setTaskName(e.target.value)}
        />

        <Textarea
          label='Description about task'
          name={"Description"}
          required={true}
          title={"Description can include letters, numbers, spaces, and punctuation. Maximum 250 characters."}
          pattern={`^[a-zA-Z0-9.,!?'\\"()\\-\\s]{20,250}$`}
          placeholder='Write more about check...'
          value={description}
          onChange={setDescription}
        />

        
         <Selectopen 
          label={"Select project"} 
          options={projects} 
          selectedOption={selectedProject} 
          setSelectedOption={setSelectedProject}
        />



        <InputElement
            label="Start Time"
            type="datetime-local"
            
            value={startTime}
            required
            placeholder="0H:0M AM"
            title="Should hours and minutes then set AM or PM"
            pattern={`^([01]?[0-9]|2[0-3]):[0-5][0-9]$`}
            onChange={(e) => setStartTime(e.target.value)}
        />

         <InputElement
            label="End Time"
            type="datetime-local"
            
            value={endTime}
            required
            placeholder="0H:0M AM"
            title="Should hours and minutes then set AM or PM"
            pattern={`^([01]?[0-9]|2[0-3]):[0-5][0-9]$`}
            onChange={(e) => setEndTime(e.target.value)}
        />


        

        <button id='modalSubmit' style={{ 
          visibility:"hidden",
           display:"none" 
           }}> hello</button>

        </FormElement>
    </div>
  )
}

export default Taskmodel