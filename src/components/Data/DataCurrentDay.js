import React, { PureComponent } from "react";


export default class CurrentDay extends PureComponent {

  render() {

    const data = this.props.data ? this.props.data.map(entry=>(
      {
        discharge: entry.discharge,
        date: entry.date.toDateString()
      }
    )) : null;
    // Step 1 - store current date in a variable
      const currentDate = data[0].date;

      const checkFirstDis = data[0].discharge;
      const checkTenthDis = data[0].discharge;
      // console.log(data[0].date);
      // console.log(data);
      // console.log(`current date 2: `+currentDate+` -- firstDis: `+checkFirstDis+` -- tenthDis: `+checkTenthDis);
    // Step 2 - make array of discharges that happen on current date
      const totalFlowArr = [];
      const populateArray = data ? 
        data.map((entry,i)=>(
          entry.date === currentDate ? totalFlowArr.push(entry.discharge) : null
        ))
      : null;
      // console.log(`totalFlowArr: `+totalFlowArr);
    // Step 3 - currentAverage - sum all entries in array and divide by array length
    //          currentTotal = currentAverage * percent of day gone by --> (((totalFlowArr.length)*15)/1440)
        var currentSum = 0;
        for (var i=0; i<totalFlowArr.length; i++) {
          currentSum += totalFlowArr[i];
        }
        var currentAverage = (currentSum/(totalFlowArr.length));
        var currentTotal = currentAverage*(((totalFlowArr.length)*15)/1440);
        // console.log(currentTotal);


    return(
      <div>
        <p><strong>Today's Total Flow: {currentTotal.toFixed(2)} million gallons</strong></p> 
      </div>
    )
  }
}