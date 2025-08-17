import React, { useState } from 'react'
import Style from './projectmodal.module.css'
import { useAuth } from '../../context/AuthContext'
import FormElement from '../../components/formelement/Formelement'
import InputElement from '../../components/inputelement/InputElement'
import { addProjectToTeam } from '../../api/Project'

function Projectmodal({teamId,teamName, loadTeams, existingProjects}) {

    const { user } = useAuth()

    const [description, setDescription] = useState("")
    const [projectName, setProjectName] = useState("")
    const [info, setInfo] = useState("project name should be unique")
    const [infoColor, setInfoColor] = useState("green")
  
  const handleOnSubmit = async (e) => {
      e.preventDefault();
      var isExists = checkIsAlreadyExists(projectName)
      if(isExists) return;
      if(!user && !user.id) return;
       await addProjectToTeam(teamId, {
        name: projectName,
        description: description,
        teamId: teamId,
        isActive: true
       });
       await loadTeams();
       setDescription("")
       setProjectName("")
       closeDialog()
  }

  const checkIsAlreadyExists = (projectName) => {
    for( var i = 0; i<existingProjects.length; i++){
      if(projectName.trim().toLowerCase()===existingProjects[i].name.toLowerCase()) {
        return true;
      } 
    }
    return false;
  }

  const closeDialog = () => {
    const e = document.getElementById("clickToClose");
    e.click()
  }

  const handleOnChangeProjectName = async (projectName) => {
    var isExists = checkIsAlreadyExists(projectName)
    if(isExists) {
      setInfo("entered project name already taken")
      setInfoColor("tomato")}
    else {
      setInfo("project name should be unique")
      setInfoColor("green")}
    setProjectName(projectName); 
  }

  return (
    <div className={Style.projectModalContainer}>

        <FormElement
          title='New project'
          subtitle={`Add new project to ${teamName}`}
          onSubmit={handleOnSubmit}>
        
       <InputElement
          label="Project Name"
          type="text"
          info={info}
          infoColor={infoColor}
          placeholder={`Enter new project name for ${teamName}`}
          marginBottom='0px'
          value={projectName}
          required
          title="Project name must be 3–25 characters long and can include letters, numbers, spaces, and underscores."
          pattern="^[a-zA-Z0-9_ ]{2,25}$"
          onChange={(e) => handleOnChangeProjectName(e.target.value) }
        />
        {/* <span style={{fontSize:"var(--font-size-body-sm)", fontWeight:"500", marginBottom:"20px", color:"tomato"}}>This project already exists</span> */}

        <InputElement
          label="About Project"
          type="text"
          value={description}
          required
          placeholder="Brief description about the project (max 100 characters)"
          title="Description can include letters, numbers, spaces, and punctuation. Maximum 100 characters."
          pattern={`^[a-zA-Z0-9.,!?'\\"()\\-\\s]{3,100}$`}
          onChange={(e) => setDescription(e.target.value)}
        />
       
        <button id='modalSubmit' style={{ 
          visibility:"hidden",
           display:"none",
           }}> hello</button>

        </FormElement>
    </div>
  )
}

export default Projectmodal