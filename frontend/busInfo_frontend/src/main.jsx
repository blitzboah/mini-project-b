import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Login from './login.jsx'
import Register from './register.jsx'
import RegisterDrivers from './driverReg.jsx'
import './App.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Register /> */}
    {/* <App/> */}
    <RegisterDrivers/>
    {/* <Login/> */}
  </React.StrictMode>,
)
