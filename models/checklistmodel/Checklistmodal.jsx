import React, { useRef, useState } from 'react'
import Style from './checklistmodel.module.css'
import FormElement from '../../components/formelement/Formelement';
import InputElement from '../../components/inputelement/InputElement';
import { Button } from '../../components';
import { useAuth } from '../../context/AuthContext';
import { createTeam } from '../../api/Team';
import { useDialog } from '../../hooks';
import Selectopen from '../../components/selectopen/Selectopen';
import Select from 'react-select/base';
import Searchelement from '../../components/searchelement/Searchelement';
import Selectoptions from '../../components/selectoptions/Selectoptions';
import Duration from '../../components/duration/Duration';
import Textarea from '../../components/textarea/Textarea';
import Weeklydays from '../../data/WeeklyDays';
import MonthlyDates from '../../data/Monthlydates';
import { createCheck } from '../../api/CheckList';
import RepeatTypes from '../../data/Repeacttype';

// import { MultiSelect } from 'primereact/multiselect';
        

function Checklistmodal({loadTeams, getProjectsFromTeam, teamId, teamName, projectName, showHeader=true}) {

    const { user } = useAuth()

    const [checkName, setCheckName] = useState("")
    const [description, setDescription] = useState("")

    const [repeatType, setRepeatType] = useState(0)

    const [selectedOptions, setSelectedOptions] = useState([])

    const [startTime, setStartTime] = useState("")
    const [duration, setDuration] = useState({H:0,M:0})

    const [intervals, setIntervals] = useState(1);

    const [infoColor, setInfoColor] = useState("green")
    const [disable,setDisable] = useState(false);

 
  const handleOnSubmit = async (e) => {
      e.preventDefault();
      setDisable(true);
      if(!user && !user.id) return;
      if( (selectedOptions && selectedOptions.length<=0) && repeatType!==0) {
        console.log("trapped");
        
        setInfoColor("tomato")
        return;
      }
      console.log("checkName:", checkName);
      console.log("description:", description);
      console.log("repeatType:", repeatType);
      console.log("selectedOptions:", selectedOptions);
      console.log("startTime:", startTime);
      console.log("duration:", `Hours: ${duration.H}, Minutes: ${duration.M}`);
      console.log("intervals:", intervals);


    await  createCheck({
        name: checkName,
        description: description,
        repeatType: RepeatTypes[repeatType],
        onWhichDays: selectedOptions.map((o)=>o.value),
        startTime: startTime,
        duration: "PT"+duration.H+"H"+duration.M+"M",
        active: true,
        occurrences: null,
        intervals: intervals,
        projectName: projectName,
        teamId: teamId
      })

      getProjectsFromTeam(teamName,projectName)
      
      //  loadTeams()
       closeDialog();
  }

  const closeDialog = () => {
    const e = document.getElementById("clickToClose");
    e.click()
  }


  return (
    <div className={Style.teamModalContainer}>

        <FormElement
          title={ showHeader && `Create New Check - ${teamName}`}
          subtitle={ showHeader && `Fill details & create a new check for ${projectName}`}
          onSubmit={handleOnSubmit}>
        
       <InputElement
          label="Title for the check"
          type="text"
          placeholder="Enter your check title"
          value={checkName}
          required
          title="Check title must be 3–25 characters long and can include letters, numbers, spaces, and underscores."
          pattern="^[a-zA-Z0-9_ ]{3,25}$"
          onChange={(e) => setCheckName(e.target.value)}
        />

        <Textarea
          label='Description about check'
          name={"Description"}
          title={"Description can include letters, numbers, spaces, and punctuation. Maximum 250 characters."}
          pattern={`^[a-zA-Z0-9.,!?'\\"()\\-\\s]{20,250}$`}
          placeholder='Write more about check...'
          value={description}
          onChange={setDescription}
        />

        
        <Selectopen 
          label={"Repeat Type"} 
          options={RepeatTypes} 
          selectedOption={repeatType} 
          setSelectedOption={setRepeatType}
        />

        { repeatType===1 &&  <Selectoptions
          label={"Select days of week"}
          placeholder={"choose days..."}
          optionsList={Weeklydays}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          info={"Please select days of week then submit"}
          infoColor={infoColor}
        />}

        { repeatType===2 &&  <Selectoptions
          label={"Select dates of month"}
          placeholder={"choose days..."}
          optionsList={MonthlyDates}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          info={"Please select dates of months then submit"}
          infoColor={infoColor}
        />}

        <InputElement
            label="Start Time"
            type="time"
            
            value={startTime}
            required
            placeholder="0H:0M AM"
            title="Should hours and minutes then set AM or PM"
            pattern={`^([01]?[0-9]|2[0-3]):[0-5][0-9]$`}
            onChange={(e) => setStartTime(e.target.value)}
        />

        <Duration
         duration={duration}
         setDuration={setDuration}
        />

        <InputElement
          label="Intervels"
          type="number"
          value={intervals}
          required
          placeholder="Enter intervals from 1 to 5"
          title="Enter intervels ( min-1 to max-5 )"
          pattern={`^[1-5]$`}
          onChange={(e) => setIntervals(e.target.value)}
        />
        <button id='modalSubmit' disabled={disable} style={{ 
          visibility:"hidden",
           display:"none" 
           }}> hello</button>

        </FormElement>
    </div>
  )
}

export default Checklistmodal;