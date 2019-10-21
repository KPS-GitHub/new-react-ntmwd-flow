import React from 'react'

class Render extends React.Component {

  state={
    refreshIframe: 0
  }

  render() {

    // refresh iframe after a certain amount of time to update the data coming through the iframe
    setInterval(() => {
      // var prev = this.state.refreshIframe
      // prev += 1;
      // this.setState({
      //   refreshIframe: prev
      // })
      document.getElementById("dataLoad").src="https://cors-anywhere.herokuapp.com/https://ntx.watermarksmartdesign.com/raw-water-supplies/flow-information/";
      console.log("state update for iframe comp")
      // console.log(this.state.refreshIframe)
    }, 60000)
    
    return(
        <iframe src="https://cors-anywhere.herokuapp.com/https://ntx.watermarksmartdesign.com/raw-water-supplies/flow-information/" style={{display: 'none'}} title={"dataLoad"} id={"dataLoad"} /> 
    )
  }
}

export default Render

// style={{display: 'none'}}