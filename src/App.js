import React from 'react';
import Layout from './components/Layout/Layout'
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'

import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'


const options = {
  // you can also just use 'bottom center'
  position: positions.CENTER,
  timeout: 0,
  offset: '0px',
  type: 'info',
  // you can also just use 'scale'
  transition: transitions.SCALE
}



function App() {
  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <div className="App">
        <Layout />
      </div>
    </AlertProvider>
  );
}

export default App;
