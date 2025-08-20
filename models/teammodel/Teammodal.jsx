import React, { useState } from 'react'
import Style from './teammodal.module.css'
import FormElement from '../../components/formelement/Formelement';
import InputElement from '../../components/inputelement/InputElement';
import { Button } from '../../components';
import { useAuth } from '../../context/AuthContext';
import { createTeam } from '../../api/Team';
import { useDialog } from '../../hooks';

function Teammodal({loadTeams}) {

  const { user } = useAuth()
  const [teamName, setTeamName] = useState("")
  const [description, setDescription] = useState("")
  const [companyName, setCompanyName] = useState("Dxc Technology")
  const [email, setEmail] = useState("")

  
  const handleOnSubmit = async (e) => {
      e.preventDefault();
      if(!user && !user.id) return;
       await createTeam({
        name: teamName,
        ownerId: user.id,
        description: description,
        companyName: companyName,
        email: email
       });
       
       loadTeams()
       setTeamName("")
       setDescription("")
       setEmail("")
       closeDialog();
  }

  const closeDialog = () => {
    const e = document.getElementById("clickToClose");
    e.click()
  }



  return (
    <div className={Style.teamModalContainer}>

        <FormElement
          title='Create New Team'
          subtitle='Fill in the details below to create a new team'
          onSubmit={handleOnSubmit}>
        
       <InputElement
          label="Team Name"
          type="text"
          placeholder="Enter your team name"
          value={teamName}
          required
          title="Team name must be 3–25 characters long and can include letters, numbers, spaces, and underscores."
          pattern="^[a-zA-Z0-9_ ]{3,25}$"
          onChange={(e) => setTeamName(e.target.value)}
        />

        <InputElement
          label="About Team"
          type="text"
          value={description}
          required
          placeholder="Brief description about the team (max 100 characters)"
          title="Description can include letters, numbers, spaces, and punctuation. Maximum 100 characters."
          pattern={`^[a-zA-Z0-9.,!?'\\"()\\-\\s]{3,100}$`}
          onChange={(e) => setDescription(e.target.value)}
        />

        <InputElement
                label="Provide An Email For Notifications"
                type="email"
                placeholder="Enter your email"
                value={email}
                required
                title={"Enter a valid email address (e.g., user@example.com)"}
                pattern={"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"}
                onChange={(e) => setEmail(e.target.value)}
             />
        
        <button id='modalSubmit' style={{ 
          visibility:"hidden",
           display:"none" 
           }}> hello</button>

        </FormElement>
    </div>
  )
}

export default Teammodal;