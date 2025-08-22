import React, { use, useEffect, useState } from 'react'
import Style from './signup.module.css'
import FormElement from '../../components/formelement/Formelement';
import InputElement from '../../components/inputelement/InputElement';
import { Button } from '../../components';
import { ButtonTheme } from '../../components/button/ButtonTheme';
import { Navigate, useLocation, useNavigate } from 'react-router';
import { registerUser } from '../../api/Auth';
import ToastDark from '../../util/Toastt';
import Appbar from '../../components/appbar/Appbar';
import { setLocalStorage } from '../../util/Localstorage';
import { sendVerificationMail, verifyCode } from '../../api/Mail';
import { useAuth } from '../../context/AuthContext';


function Signup() {

    const { user, login, logout } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [company, setCompany] = useState("Dxc Technology");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [verificationCode, setVerificationCode] = useState("");

    const [disableSubmit, setDisableSubmit] = useState(false);

    const [step1, setStep1] = useState(true);
    const [step2, setStep2] = useState(false);
    const [step3, setStep3] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Sign up | UseTaskfy.com";
    }, []);

    const backButtonFunc = () => {
       if (step2) {
            setStep2(false);
            setStep1(true);
        } else if (step3) {
            setStep3(false);
            setStep2(true);
        } 
    }

    const forwardButtonFunc = () => {
        if (step1) {
            setStep1(false);
            setStep2(true);
        } else if (step2) {
            setStep2(false);
            setStep3(true);
        }
    }

    const clearData = () => {
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setUsername("");
        setVerificationCode("");
    }

    const backTostart = () => {
        setStep1(true);
        setStep2(false);
        setStep3(false);
        clearData();
    }

    const step1Func = async () => {
      // send verification email
      const regex = /^[a-zA-Z0-9._%+-]+@dxc\.com$/;
      
      if(!regex.test(email)) {
         ToastDark({
            message: 'Enter proper dxc technology email',
            icon: '🐥'
        });
        return;
      }
      
      const success = await sendVerificationMail(email);
      if (success) {
          forwardButtonFunc();
      }
    }

    const step2Func = async () => {
        // verify the code
        console.log("hello from step 2");
        
       const success = await verifyCode(email, verificationCode);
       if (success) {
          forwardButtonFunc();
       } else {
          backButtonFunc(); 
       }
    }

    const step3Func =  async () => {

       if(password!==confirmPassword) {
             ToastDark({
                  message: 'Passwords do not match',
                  icon: '😬'
              });
              return;
        }
        // create account
        
        const user = await registerUser({ email: email, password: password, company: company, name: username, role: "USER", phoneNumber: null });
        if(user) {
          login(user);
          window.location.reload();
        }
        
    }

  

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisableSubmit(true);
        step1 && await step1Func();
        step2 && await step2Func();
        step3 && await step3Func();
        setDisableSubmit(false);
    } 


  return (
    <div className={Style.signupContainer}>
        <div className={Style.logo}>Create your  <u> usetaskfy.com </u>account</div>
        {/* <div className={Style.welcome}>Free for individuals. Team plans for collaborative features.</div> */}
        <div className={Style.welcome}>Free for everyone — solo or with your team</div>

        <div className={Style.loginFormContainer}>

          <FormElement 
            onSubmit={handleSubmit}
            // title="Login"
            // subtitle="Please enter your credentials to continue"
          >
              {/* <ul className={Style.passwordRequirements} shape="circle">
               <li> username must be at least 3 characters long and can include letters, numbers, and underscores</li>
                <li>Cannot contain spaces</li>
             </ul> */}

               { step1 && <>
              <Appbar showBackButton={false} horizontalPadding='0px' title="Step 1" subtitle="Sending verification email" showActionsButtons={false} />

              <InputElement
                label="Company"
                disabled
                type="text"
                placeholder="Enter your company name"
                value={company}
                required
                title={"Enter a valid company name"}
                pattern={"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"}
                onChange={(e) => setCompany(e.target.value)}
             />

            <InputElement
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={email}
                required={true}
                // title={"Enter a valid email address (e.g., user@example.com)"}
                title={"Enter a valid Dxc Technology email address (e.g., user@dxc.com)"}
                // pattern={"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"}
                pattern={"^[a-zA-Z0-9._%+-]+@dxc\.com$"}
                onChange={(e) => setEmail(e.target.value)}
             />

              <Button text="Send verification email" disabled={disableSubmit} theme={ButtonTheme.DARK} marginTop="20px" marginBottom="30px" type="submit" />

               </>}

            { step2 && <>
              <Appbar showBackButton={false} backButtonFunc={backButtonFunc} horizontalPadding='0px' title="Step 2" subtitle={`Enter verification code which sent to ${email}`} showActionsButtons={false} />        
               <InputElement
                label="6 digit verification code"
                type="text"
                placeholder="Enter your verification code"
                value={verificationCode}
                required
                title={"Enter a valid verification code"}
                pattern={"^[0-9]{6}$"}
                onChange={(e) => setVerificationCode(e.target.value)}
             />

              <Button text="Verify" disabled={disableSubmit} theme={ButtonTheme.DARK} marginTop="20px" marginBottom="10px" type="submit"  />  
               <Button text="Go back to start" onClick={backTostart}  theme={ButtonTheme.LIGHT} marginTop="0px" marginBottom="30px" type="button" />

                </>}


            { step3 && <> 
              <Appbar showBackButton={false} backButtonFunc={backButtonFunc} horizontalPadding='0px' title="Step 3" subtitle="Create your account" showActionsButtons={false} />
            <InputElement
                label="Username"
                type="text"
                marginBottom='0px'
                placeholder="Enter your username"
                value={username}
                required
                title={"Username must be at least 3 characters long and can include letters, numbers, and underscores"}
                pattern={"^[a-zA-Z0-9_]{3,}$"}
                onChange={(e) => setUsername(e.target.value)}
             />

             <InputElement
                label="Password"
                marginBottom='0px'
                type="password"
                placeholder="Enter your password"
                value={password}
                title={"Password must be at least 8 characters, and include uppercase, lowercase, a number, and a special character"}
                required
                pattern={"^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{8,}$"}
                onChange={(e) => setPassword(e.target.value)}
             />

             <InputElement
                label="Confirm password"
                marginBottom='0px'
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                title={"Password must be at least 8 characters, and include uppercase, lowercase, a number, and a special character"}
                required
                pattern={"^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{8,}$"}
                onChange={(e) => setConfirmPassword(e.target.value)}
             />
              <ul className={Style.passwordRequirements} shape="circle">
               <li>Must be at least 8 characters</li>
               <li>Include uppercase, lowercase, a number and a special character</li>
                <li>Cannot contain spaces</li>
             </ul>

            <Button text="Create Account" disabled={disableSubmit} theme={ButtonTheme.DARK} marginTop="20px" marginBottom="10px" type="submit" /> 
            <Button text="Go back to start" onClick={backTostart}   theme={ButtonTheme.LIGHT} marginTop="0px" marginBottom="30px" type="button" />

            </>}

        </FormElement>  

        </div>  
         <div className={Style.footer} onClick={() => navigate("/login")}  >Already have an account? <b color='black'><b> <u> Sign in</u> </b></b></div>
    </div>
  )
}

export default Signup