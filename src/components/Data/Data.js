import React from "react";
import styled from 'styled-components';
import Remaining from "./DataFlowRemaining";
import LargeChart from "./DataAreaChart";
import SmallChart from "./DataAreaChartSmall";
import Table from "./DataTable";
import CurrentDay from './DataCurrentDay';
import TRAInput from './ManualInputTRA';
import { Container, Row, Col } from "react-bootstrap";
import { useAlert } from 'react-alert'

const Titles = styled.p`
  margin-top: 2rem;
  font-weight: bold;
`

const MinMax = styled.p`
  margin-top: -20px;
  font-size: 75%;
`

class Data extends React.Component {
  state = {
    rosser: null,
    usgsEF: null,
    width: 0,
    mainstem: null,
    eastfork: null,
    tra: null,
    traLatest: null,
    manualTraLatest: 0,
    dailyTotalMS: 0,
    dailyTotalEF: 0,
    dayArray: [],
    formData: [],
    traDaily: []
  };


  componentDidMount() {
    const usgsRoss =
      "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=08062500&period=P7D&parameterCd=00060&siteStatus=all";
    fetch(usgsRoss)
      .then(res => res.json())
      .then(res =>
        res.value.timeSeries[0].values[0].value.map(value => {
          return {
            discharge: parseInt(value.value),
            date: new Date(value.dateTime)
          };
        })
      )
      .then(discharge =>
        this.setState({
          rosser: discharge
        })
      );
      const main = document.getElementById('main-container')
      if(main){
        this.setState({
          width: main.offsetWidth
        })
      }

    const usgsEF =
      "https://waterdata.usgs.gov/nwis/iv/?format=json&sites=08062000&period=P7D&parameterCd=00060&siteStatus=all";
    fetch(usgsEF)
      .then(res => res.json())
      .then(res =>
        res.value.timeSeries[0].values[0].value.map(value => {
          return {
            discharge: parseInt(value.value),
            date: new Date(value.dateTime)
          };
        })
      )
      .then(discharge =>
        this.setState({
          usgsEF: discharge
        })
      );

      const ntmwdData = 'https://ntx.watermarksmartdesign.com/server-side/ntmwd.php'
      fetch(ntmwdData)
      .then(res=>res.json())
      // pop off header row
      .then(res=>res.slice(1,res.length))
      // remap data structure
      .then(res=>res.map(entry=>{
        return {
          discharge: parseFloat(entry[2]) ? parseFloat(entry[2]) : 0,
          date: new Date(entry[0])
        }
      }))
      .then(eastfork=>this.setState({
        eastfork
      }))
      

      //const mainstem = 'https://ntx.watermarksmartdesign.com/server-side/mainstem.php'
      fetch(ntmwdData)
      .then(res=>res.json())
      // pop off header row
      .then(res=>res.slice(1,res.length))
      // remap data structure
      .then(res=>res.map(entry=>{
        return {
          discharge: parseFloat(entry[1]) && parseFloat(entry[1]) > 0 ? parseFloat(entry[1]) : 0,
          date: new Date(entry[0])
        }
      }))
      .then(mainstem=>this.setState({
        mainstem
      }))

      const traFig = "https://ntx.watermarksmartdesign.com/server-side/tra7.php"
      fetch(traFig)
      .then(res=>res.json())
      .then(res=>{
        const data = []
        res.forEach(day=>data.push({
          date: day.date,
          value: Number(day.value)
        }))
        this.setState({
          manualTraLatest: data[0].value,
          traDaily: data
        })
      })
      

  }
  
  render() {

    // populate an array with latest dates from data
    // const popDayArray = (data) => {
    //   const arrayPH = [];
    //   return (
    //     data ? 
    //       data.map(entry => (
    //         arrayPH.push((entry.date.getMonth()+1)+`/`+(entry.date.toString().slice(8, 10))+`/`+(entry.date.getUTCFullYear().toString().slice(2)))
    //       ))
    //     : null
    //   )
    // }
    // const dayArr = popDayArray(this.state.mainstem);
    // console.log("===== popDayArray =====");
    // console.log(dayArr);

    // set this.state.dayArray equal to the array of days we just created


    // const formDataToState = (data) => {
    //   this.setState({
    //     formData: data
    //   })
    // }

    const dailyTotalsToState = (totalMS, totalEF) => {
      this.setState({
        dailyTotalMS: totalMS,
        dailyTotalEF: totalEF
      })
    }

    // console.log("===== FORM DATA IN STATE =====");
    // console.log(this.state.formData);

    // console.log("===== eastfork og data =====");
    // console.log(this.state.eastfork ? this.state.eastfork : "data not in state yet");
    return (
      this.state.traDaily !== [] ?

      <Container id="main-container">
        <br>
        </br>
        <br>
        </br>
        {/* REMAINING BAR */}
        {/* <Row> */}
          {/* <Col> */}
            {/* { this.state.traLatest && this.state.mainstem && this.state.eastfork ? <Remaining data={{ traLatest: this.state.traLatest, mainstem: this.state.mainstem, eastfork: this.state.eastfork }}/> : null} */}
            {/* { this.state.mainstem && this.state.eastfork ? <Remaining data={{ traLatest: this.state.manualTraLatest, mainstem: this.state.mainstem, eastfork: this.state.eastfork }}/> : null} */}
          {/* </Col> */}
        {/* </Row> */}
        {/* SMALL GRAPHS */}
        <Row>
          <Col sm={6}>
          <Titles>Main Stem</Titles>
            {this.state.mainstem ? 
              <>
                <SmallChart data={this.state.mainstem} width={this.state.width}/> 
                <CurrentDay data={this.state.mainstem}/>
                <MinMax>Max Pumping Rate of 114 MG</MinMax>
                <MinMax>Min Pumping Rate of 50 MG</MinMax>
                <p><a></a></p>
              </>
            : null}
            
          </Col>
          <Col sm={6}>
          <Titles>East Fork</Titles>
            {this.state.eastfork ? 
              <>
                <SmallChart data={this.state.eastfork} width={this.state.width}/> 
                <CurrentDay data={this.state.eastfork}/>
                <MinMax>Max Pumping Rate of 114 MG</MinMax>
                <MinMax>Min Pumping Rate of 50 MG</MinMax>
                <p><a></a></p>
              </>
            : null}
          </Col>
        </Row>
        <br>
        </br>
        {/* LARGE GRAPH - USGS ROSSER */}
        <Row>
          <Col>
            <Titles>Trinity Rv nr Rosser, TX (08062550)</Titles>
            {this.state.rosser ? <LargeChart data={this.state.rosser} width={this.state.width} minimum={387} /> : null}
            <p>USGS Site: <a href="https://waterdata.usgs.gov/nwis/dv/?site_no=08062500&PARAmeter_cd=00060">https://waterdata.usgs.gov/nwis/dv/?site_no=08062500&PARAmeter_cd=00060</a></p>
          </Col>
        </Row>
        <br>
        </br>
        <br>
        </br>
        {/* TABLE */}
        <Row>
          <Col>
            {/* {this.state.mainstem && this.state.eastfork && this.state.tra && this.state.rosser ? <Table data={{ mainstem: this.state.mainstem, eastfork: this.state.eastfork, rosser: this.state.rosser, tra: this.state.tra }}  dailyToState={dailyTotalsToState}/> : null} */}
            { this.state.mainstem && this.state.eastfork && this.state.rosser && this.state.traDaily.length > 0 ? <Table data={{ mainstem: this.state.mainstem, eastfork: this.state.eastfork, rosser: this.state.rosser, tra: this.state.traDaily }}/>  : null}
          </Col>
        </Row>
        <br>
        </br>
        {/* LARGE GRAPH - EAST FORK */}
        <Row>
          <Col>
            <Titles>East Fork Trinity River Gauge (Crandall, TX)</Titles>
            {this.state.usgsEF ? <LargeChart data={this.state.usgsEF} width={this.state.width} minimum={25} /> : null}
            <p>USGS Site: <a href="https://waterdata.usgs.gov/usa/nwis/uv?08062000">https://waterdata.usgs.gov/usa/nwis/uv?08062000</a></p>
          </Col>
        </Row>

        <Row>
          <Col>
            {/* {this.state.eastfork ? <TRAInput data={this.state.eastfork} sendData={formDataToState}/> : null} */}
          </Col>
        </Row>
      </Container>
    
    : <div>tra data did not come through in time</div> 
    
    );
  }
}

export default Data;
