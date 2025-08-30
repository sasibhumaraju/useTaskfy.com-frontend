import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import Appbar from '../../components/appbar/Appbar'
import { useLocation, useNavigate } from 'react-router';
import Checklistmodal from '../../models/checklistmodel/Checklistmodal';
import Pagebody from '../pagebody/Pagebody';

function Editchecklist() {

    const location = useLocation()
    const navigate = useNavigate()
    const check = location.state;
    const { user } = useAuth()

    const [checkId, setCheckId] = useState( check.id || "")
    const [checkName, setCheckName] = useState( check.name || "")
    const [description, setDescription] = useState( check.description || "")
    const [repeatType, setRepeatType] = useState(0)
    const [selectedOptions, setSelectedOptions] = useState(check.onWhichDays ||[])
    const [startTime, setStartTime] = useState(check.startTime || "")
    const [duration, setDuration] = useState({H:0,M:0})
    const [intervals, setIntervals] = useState(check.intervals || 1);
    const [infoColor, setInfoColor] = useState("green")
    const [disable,setDisable] = useState(false);

  return (
    <div className='editchecklist'>
        <Appbar showBackButton={true} backButtonFunc={()=>navigate(-1)}  title={"Update Check"} subtitle={"Change check you wanted yet relavent to work"} showActionsButtons={true} actionButtonIcon={null}  actionButtonText='Update' />
        <Pagebody > 
            <Checklistmodal showHeader={false}/>
      </Pagebody>
        
    </div>
  )
}

export default Editchecklist