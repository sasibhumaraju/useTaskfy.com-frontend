import React, { useState } from 'react'
import Style from './membermodel.module.css'
import FormElement from '../../components/formelement/Formelement'
import InputElement from '../../components/inputelement/InputElement'
import Searchelement from '../../components/searchelement/Searchelement'
import { addUsersToTeam } from '../../api/Team'

function Membermodel({existingItems=[],teamId, loadTeams}) {

    const [f, setF] = useState([])

    const handleOnSubmit = async (e) => {
         e.preventDefault();
         console.log(JSON.stringify(f));
         const userIds = f.map(u=>u.id)
         await addUsersToTeam(teamId,userIds);
        //  window.location.reload(); 
        loadTeams()
     }

  return (
    <div className={Style.memberModelContainer}>
         <FormElement
          title='Add members '
          subtitle='Search and find members to add'
          onSubmit={handleOnSubmit}>

         <Searchelement
            filters={["sasibhumaraju"]}
            existingItems={existingItems}
            selectedItems={f}
            setSelectedItems={setF}
            marginBottom='30px'
          />

        <button id='modalSubmit' style={{ 
          visibility:"hidden",
           display:"none" 
           }}> hello</button>

        </FormElement>
    </div>
  )
}

export default Membermodel