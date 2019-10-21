import React from "react";
import { Table } from "react-bootstrap";
// import styled from "styled-components";

// const TableWrap = styled.div`
//   max-height: 50vh;
//   overflow: scroll;
//   tbody {
//     width: 100%;
//   }
// `;

const RosserTable = props => {

    // Group flow data by day
    // const days = {}
    // const dayData = props.data.rosser.map((entry)=>{
    //     const dateStr = entry.date.toLocaleDateString()
    //     if(typeof days[dateStr] === 'undefined'){
    //         days[dateStr] = []
    //     }            
    //     days[dateStr].push(entry.discharge)
    //     return days
    // })
    // // taking the reformatted rosser data by day
    // // and creating two arrays, one with the date,
    // // one with values associated by date
    // const rosserTableData = dayData[0]
    // const rosserVals = []
    // const rosserLbls = []
    // for(let date in rosserTableData){
    //     rosserVals.push(rosserTableData[date])
    //     rosserLbls.push(date)
    // }
    // rosserVals.reverse()
    // rosserLbls.reverse()
    //const stemData = 


    // GATHER AND FORMAT DATA
    // mainstem
    const mainstem = props.data.mainstem ? props.data.mainstem.map((entry, i)=>(
      {
        discharge: entry.discharge,
        date: (entry.date.getMonth()+1)+`/`+(entry.date.toString().slice(8, 10))+`/`+(entry.date.getUTCFullYear().toString()),
      }
    )) : null;
    // console.log("=====mainstem=====");
    // console.log(mainstem);

    // eastfork
    const eastfork = props.data.eastfork ? props.data.eastfork.map((entry, i)=>(
      {
        discharge: entry.discharge,
        date: (entry.date.getMonth()+1)+`/`+(entry.date.toString().slice(8, 10))+`/`+(entry.date.getUTCFullYear().toString()),
      }
    )) : null;
    // console.log("=====eastfork=====");
    // console.log(eastfork);

    // rosser
    const rosser = props.data.rosser ? props.data.rosser.map((entry, i)=>(
      {
        discharge: entry.discharge,
        date: (entry.date.getMonth()+1)+`/`+(entry.date.toString().slice(8, 10))+`/`+(entry.date.getUTCFullYear().toString()),
      }
    )) : null;
    // console.log("===========ROSSER==============")
    // console.log(rosser)


    // CALCULATING DAILY TOTALS

    // 1 - create array of days 

      // mainstem

      const dayArrayMS = [];
      const populateDayArrayMS = mainstem ? 
        mainstem.map(entry => (
          dayArrayMS.indexOf(entry.date) === -1 ? dayArrayMS.push(entry.date) : null
        ))
      : null;
      const newDayArrayMS = dayArrayMS.slice(0);
      // console.log("===== day array ms =====")
      // console.log(newDayArrayMS)

      // eastfork

      const dayArrayEF = [];
      const populateDayArrayEF = mainstem ? 
        mainstem.map(entry => (
          dayArrayEF.indexOf(entry.date) === -1 ? dayArrayEF.push(entry.date) : null
        ))
      : null;
      const newDayArrayEF = dayArrayEF.slice(0);

      // props.popDayArray(newDayArrayEF);
      
      // console.log("===== day array ef =====")
      // console.log(newDayArrayEF)

    // 2 - totals for each day

      const countArrMS = [];
      
      for (var i = 0; i < newDayArrayMS.length; i++) {
        var countMS = 0;
        for (var j = 0; j < mainstem.length; j++) {
          if (mainstem[j].date === newDayArrayMS[i]) {
            countMS += mainstem[j].discharge;
            // console.log("ms count")
            // console.log(countMS)
          }
        }
        countArrMS.push(countMS);
      }
       // average each count - done!
       for (var p= 0; p < countArrMS.length; p++) {
        countArrMS[p] = (countArrMS[p]/96).toFixed(2);
      }
      // console.log("countArrMS");
      // console.log(countArrMS);

      const countArrEF = [];
      
      for (var k = 0; k < newDayArrayEF.length; k++) {
        var countEF = 0;
        for (var m = 0; m < eastfork.length; m++) {
          if (eastfork[m].date === newDayArrayMS[k]) {
            countEF += eastfork[m].discharge;
            // console.log("ef count")
            // console.log(countEF)
          }
        }
        countArrEF.push(countEF);
        // console.log("countArrEF");
        // console.log(countArrEF);
      }
      // average each count - done!
      for (var q = 0; q < countArrEF.length; q++) {
        countArrEF[q] = (countArrEF[q]/96).toFixed(2);
      }
      // console.log("countArrEF");
      // console.log(countArrEF);


      // ROSSER DAILY MINIMUM DISCHARGE
      const rosserDays = newDayArrayEF;
      const rosserMins = [];
      const populateRosserMins = (rosserDays, rosser, rosserMins) => {
        for (var r=0; r<rosserDays.length; r++) {
          var currentMin = 1000000000;
          for (var w=0; w<rosser.length; w++) {
            if (rosser[w].date === rosserDays[r] && rosser[w].discharge < currentMin) {
              currentMin = rosser[w].discharge;
              // console.log(currentMin)
            }
          }
          if (currentMin !== 1000000000) {
            rosserMins.push(currentMin);
          } else {
            rosserMins.push("n/a")
          }
          
          // console.log(rosserMins)
        }
        return rosserMins;
      }
      const rosserMinArray = rosser ? populateRosserMins(rosserDays, rosser, []) : null
      // console.log("=========rosserMins===========")
      // console.log(rosserMinArray);



      // send current day totals to parent state - DOESN'T WORK - "Unhandled Rejection (Invariant Violation): Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops."
      // const sendData = countArrMS.length === 8 && countArrEF.length === 8 ? props.dailyToState(countArrMS[0], countArrEF[0]) : null
      

    

    // Create array of table rows with relevant values - will be used in component return
      const dataArr = [];
      const combinePumpData = (countArrEF, countArrMS, newDayArrayEF, newDayArrayMS, rosserMinArray, props) => {
        for (var n = 0; n < (countArrEF.length - 1); n++) {
          dataArr.push(<tr key={`data-${n}`}>
                        <td>{newDayArrayEF[n]}</td>
                        <td>{countArrMS[n]}</td>
                        <td>{countArrEF[n]}</td>
                        <td>{props.data.tra[n].value}</td>
                        <td>{rosserMinArray[n]}</td>
                      </tr>)
        }
      }
      const combination = rosserMinArray && props.data.tra !== [] ? combinePumpData(countArrEF, countArrMS, newDayArrayEF, newDayArrayMS, rosserMinArray, props) : null  //not sure why, but the rosserMinArray was the only function argument that wasn't always ready when the function ran, so I'm only running the function if we know we have it
      // console.log(dataArr)

    return(
      <Table>
        <thead>
          <tr>
            <th>Date</th>
            <th><div>Total Pumped - Main Stem</div><div>(million gallons)</div></th>
            <th><div>Total Pumped - East Fork</div><div>(million gallons)</div></th>
            <th><div>TRA Wastewater Combined</div><div>Discharge (Previous Day)</div></th>
            <th><div>Rosser Lowest Daily</div><div>Discharge (cubic feet per second)</div></th>
          </tr>
        </thead>
        <tbody>
          {dataArr.map(row => (
            row
          ))}
          {/* {renderPumpData(countArrEF, countArrMS, newDayArrayEF, newDayArrayMS)} */}
        </tbody>
      </Table>
    )
}

export default RosserTable;


// <tbody>
//{rosserVals && rosserLbls && rosserVals.length === rosserLbls.length ?
//  rosserLbls.map((entry, i) => (
 //     <tr key={"entry-" + i}>
   //     <td>N/A</td>
     //   <td>N/A</td>
       // <td>N/A</td>
       // {/* <td>{i < rosserVals.length ? Math.min(...rosserVals[i]) : null}</td> */}
      // </tr>
    // ))
  // : null}
// </tbody> */}