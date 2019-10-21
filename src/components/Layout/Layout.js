import React from 'react'
import Header from './Header'
import Data from '../Data/Data'
// import RenderData from '../Data/RenderData'
import { useAlert } from 'react-alert'



class Layout extends React.Component {

  render() {

    alert("Provisional data subject to revision")

    return(
      <div>
        <Header />
        <Data />
        {
          //<RenderData />
        }
      </div>
    )

  }
}
  
    


export default Layout