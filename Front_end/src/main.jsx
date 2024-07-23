import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import  { createContext, useState } from "react";

export const context = createContext({ isAuthenticated: false });

const AppWraper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [userBlogUpdate, setBlogUpdate] = useState({});

  return ( 
<context.Provider value={{ isAuthenticated, setIsAuthenticated, user , setUser,userBlogUpdate,setBlogUpdate}}>
    <App />
  </context.Provider>
  )
 
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <AppWraper />
    
  </React.StrictMode>
)
