import React from 'react'
import styled from 'styled-components'


const Legend = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 25px;
`

const boxSize = "25px";
const LegendBox = styled.div`
  width: ${boxSize};
  height: ${boxSize};
  background: ${props => props.green ? "#7CCE6E" : props.yellow ? "#e6d81d" : "#ce2929" };
  border: 1px solid black;
  margin-right: 10px;
  :not(:first-child) {
    margin-left: 50px;
  }
`


const Remaining = (props) => {

// NOTE: below data gathering and manipulating is copied from DataTable. It is overkill, but, in the interest of time, it was quickest to copy the code and just use the bits I need for the remaining flow bar


  // GATHER AND FORMAT DATA
    // mainstem
    const mainstem = props.data.mainstem ? props.data.mainstem.map((entry, i)=>(
      {
        discharge: entry.discharge,
        date: (entry.date.getMonth()+1)+`/`+(entry.date.toString().slice(8, 10))+`/`+(entry.date.getUTCFullYear().toString()),
        time: entry.date.toTimeString().slice(0,5)
      }
    )) : null;
    // console.log("=====mainstem=====");
    // console.log(mainstem);

    // eastfork
    const eastfork = props.data.eastfork ? props.data.eastfork.map((entry, i)=>(
      {
        discharge: entry.discharge,
        date: (entry.date.getMonth()+1)+`/`+(entry.date.toString().slice(8, 10))+`/`+(entry.date.getUTCFullYear().toString()),
        time: entry.date.toTimeString().slice(0,5)
      }
    )) : null;
    // console.log("=====eastfork=====");
    // console.log(eastfork);


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



    // END OF CODE COPIED STRAIGHT FROM DataTable.js


    // console.log("=========== tra ============")
    // console.log(props.data.tra)


    
    
    
    // STORE NEEDED VALUES
    const dailyTotalMS = parseFloat(countArrMS[0]);
    // console.log(dailyTotalMS)
    // const dailyTotalEF = parseFloat(countArrEF[0]);   // turns out the remaining is just tra - mainstem, no eastfork involved
    // console.log(dailyTotalEF)
    const tra = props.data.traLatest.toFixed(2);
    // console.log("======== tra =========")
    // console.log(tra)
    

    // CALCULATE REMAINING FLOW
    const remain = parseFloat((tra - dailyTotalMS ).toFixed(2))
    // console.log(remain)

    // CALCULATE REMAINING FLOW AS PERCENTAGE OF TOTAL (USED FOR WIDTH OF DIV REPRESENTING REMAINING)
    const remainPercent = (((tra-dailyTotalMS)/tra)*100).toFixed(2)
    // console.log(remainPercent)

    // set color of bar to green/yellow/red depending on how much water is remaining
    var barColor = (remainPercent <= 25 ? 
                  "#ce2929" //red
                : remainPercent <= 50 ?
                  "#e6d81d" //yellow
                : "#7CCE6E") //green
 

    return(
      <div>
        <div style={{ textAlign: `left`, marginBottom: `-15px` }} ><p><strong>Flow Information (MG)</strong> &nbsp; &nbsp; &nbsp; &nbsp; Date/Time &nbsp; &nbsp; {mainstem[0].date} &nbsp; {mainstem[0].time} </p></div>
        {/* full bar (gray) */}
        <div style={{ content: `""`, width: `100%`, height: `50px`, border: `1px solid black`, background: `lightGray` }}>
          {/* remaining bar (green/yellow/red) */}
          <div style={{ content: `""`, width: (remainPercent.toString())+`%`, height: `100%`, borderRight: `1px solid black`, background: barColor }} >
          </div>

          <div style={{ position: `absolute`, zIndex: 2, top: `32%`, left: `4%` }} >
            <p><strong>{remainPercent} %</strong> &nbsp; &nbsp; &nbsp; &nbsp; ({remain} million gallons remaining from {tra} million gallon total)</p>
          </div>
        </div>
        <Legend>
          <LegendBox green /> Over 50% <LegendBox yellow /> 50%-26% <LegendBox red /> At or Under 25%
        </Legend>
      </div>
      
    )

}


export default Remaining