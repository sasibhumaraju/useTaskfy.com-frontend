import React, { useEffect, useState } from 'react'
import Appbar from '../../components/appbar/Appbar'
import Pagebody from '../pagebody/Pagebody'
import Listview from '../../components/listview/Listview'
import { Actionsbutton, Button, Toggle } from '../../components'
import Style from './Profile.module.css'
import FormElement from '../../components/formelement/Formelement'
import InputElement from '../../components/inputelement/InputElement'
import Divider from '../../components/divider/Divider'
import { getUserByEmail, updateUser } from '../../api/User'
import { getLocalStorage } from '../../util/Localstorage'

function Profile() {
  
  const [disabled, setDisabled] = useState(true);
  const [company, setCompany] = useState("Dxc Technology");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [user, setUser] = useState(null);

  const testMethod =  () => {
      console.log("hello from actions button");
    }
  const loadUserByEmail = async () => {
    var u = getLocalStorage("user")
    if(u && u.email) {
      var e = u.email;
      const user = await getUserByEmail(e)
      console.log("user", user);
       
        if (user) {
          // setCompany(user.company);
          setUser(user);
          setEmail(user.email);
          setUsername(user.name);
          setPhoneNumber(user.phoneNumber? user.phoneNumber : "");
        }
      }
  }

  useEffect(()=>{
    loadUserByEmail();
  }, [])

  const onChangeListener = (setValue, value, name) => {

    if(user === null ) return;

    var e = name==="email"? value.trim() : email;
    var un = name==="username"? value.trim() : username;
    var ph = name==="number"? value.trim() : phoneNumber;
     
     if(user.email !== e || user.name !== un || (user.phoneNumber? user.phoneNumber : "") !== ph) {
       console.log("enabled");  
      setDisabled(false)
     } else {
      console.log("disabled");
      setDisabled(true)
     }
     setValue(value);
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    console.log("email: ", email);
    console.log("number: ", phoneNumber);
    console.log("name: ", username);
    await updateUser({name: username, email: email, phoneNumber: phoneNumber})
  }


  return (
  
    <div className={Style.profileContainer}>
      <div className={Style.profileInnerContainer}>
        <FormElement label="Name" type="text" placeholder="Enter your name" gap='0px' onSubmit={handleOnSubmit} >
          <Appbar showBackButton={false} title="Profile" subtitle="Manage your profile settings" showActionsButtons={false} actionButtonText='Save Changes' actionButtonElement={null} actionButtonIcon={null}/>

          <Divider horizontalMargin="0px" verticalMargin="0px" borderWidth="1px" borderColor="var(--border-default)" />

          <div className={Style.profileForm}>
             <InputElement
                label="Company"
                disabled
                type="text"
                placeholder="Enter your company name"
                value={company}
                marginBottom='20px'
                required
                title={"Enter a valid company name"}
                pattern={"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"}
                onChange={(e) => setCompany(e.target.value)}
             />

              <InputElement
                label="Email"
                type="email"
                disabled={true}
                placeholder="Enter your email"
                marginBottom='20px'
                value={email}
                required
                title={"Enter a valid email address (e.g., user@example.com)"}
                pattern={"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"}
                onChange={(e) => onChangeListener(setEmail, e.target.value, "email")}
             />

              <InputElement
                label="Username"
                type="text"
                marginBottom='20px'
                placeholder="Enter your username"
                value={username}
                required
                title={"Username must be at least 3 characters long and can include letters, numbers, and underscores"}
                pattern={"^[a-zA-Z0-9_]{3,}$"}
                onChange={(e) => onChangeListener(setUsername, e.target.value, "username")}
             />

              <InputElement
                label="Phone number"
                type="text"
                marginBottom='25px'
                placeholder="Enter your phone number"
                value={phoneNumber}
                required
                title={"Phone number must be 10 digits long and can include numbers only"}
                pattern={"^[0-9]{10,10}$"}
                onChange={(e) => onChangeListener(setPhoneNumber, e.target.value, "number")}
             />
          </div>

          <Divider horizontalMargin="0px" verticalMargin="0px" borderWidth="1px" borderColor="var(--border-default)" />

          <div className={Style.profileSubmit}> 
                      <Button onClick={testMethod} text='Update' type='submit' disabled={disabled} marginBottom='0px'></Button>
          </div>
           
        </FormElement>
      </div>
    </div>
   
  )
}

export default Profile