// context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../util/Localstorage';
import { useNavigate } from 'react-router';
import { stillLoggedIn } from '../api/IsLoggedIn';

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const navigate = useNavigate()
  const [user, setUser] = useState(getLocalStorage('user')); // null means not logged in

  const login = (userData) => {
    // Store user data in localStorage
    console.log("from context:",userData);
    
    userData.jwtToken && setLocalStorage("jwtToken", userData.jwtToken);
    userData && setLocalStorage("user", userData);
    setUser(userData);
  }

  const logout = () => {
    removeLocalStorage("jwtToken");
    removeLocalStorage("user");
    setUser(null);
  }

  const checkLoginStatus = async (email) => {
    var u = await stillLoggedIn(email);
    if(u===null) setUser(null);
  }

  useEffect(() => {
    // Check if user data is stored in localStorage
    const storedUser = getLocalStorage('user');
    if (storedUser) {
      setUser(storedUser);
      checkLoginStatus(storedUser.email)
    } else {
      setUser(null);
    } 

  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
