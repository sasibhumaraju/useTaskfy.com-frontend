import React, { useEffect, useState } from 'react'
import Style from './login.module.css'
import FormElement from '../../components/formelement/Formelement'
import InputElement from '../../components/inputelement/InputElement'
import { Button } from '../../components'
import { ButtonTheme } from '../../components/button/ButtonTheme'
import { useNavigate } from 'react-router'
import { useAuth } from '../../context/AuthContext'
import { authenticateUser } from '../../api/Auth'

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {login} = useAuth(); // Assuming you have a useAuth hook to manage authentication context

    const navigate = useNavigate();

    useEffect(() => {
      document.title = "Login | UseTaskfy.com";
    }, []);

    const handleLogin = async (e) => {
      e.preventDefault();

      console.log("Logging in with:", email, password);
      
      // Call your login API here
      const user = await authenticateUser(email, password);
      console.log("User data received:", user);
      if (user) {
        console.log("before login function call:", user);
        
        login(user);
        window.location.reload();
        console.log("after login function call:", user);

      }
      console.log("User logged in:", user);
      
    }

  return (
    <div className={Style.loginContainer} >
        <div className={Style.logo}>UseTaskfy.com</div>
        <div className={Style.welcome}>Welcome back</div>
        <div className={Style.loginFormContainer}>
          <FormElement 
            onSubmit={handleLogin}
            // title="Login"
            // subtitle="Please enter your credentials to continue"
          >
            <InputElement
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={email}
                required
                title={"Enter a valid email address (e.g., user@example.com)"}
                pattern={"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"}
                onChange={(e) => setEmail(e.target.value)}
             />

              <InputElement
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                title={"Password must be at least 8 characters, and include uppercase, lowercase, a number, and a special character"}
                required
                pattern={"^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{8,}$"}
                onChange={(e) => setPassword(e.target.value)}
             />

             <Button text="Login" theme={ButtonTheme.LIGHT} marginTop="20px" marginBottom="10px" type="submit" />

        </FormElement>  
        </div>  
         <div className={Style.footer} onClick={() => navigate("/signup")}>Don't have an account?</div>
    </div>
  )
}

export default Login