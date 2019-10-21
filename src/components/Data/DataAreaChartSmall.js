import React, { PureComponent } from "react";
import styled from 'styled-components'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

// const data = [
//   {
//     name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
//   },
//   {
//     name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
//   },
//   {
//     name: 'Page C', uv: -1000, pv: 9800, amt: 2290,
//   },
//   {
//     name: 'Page D', uv: 500, pv: 3908, amt: 2000,
//   },
//   {
//     name: 'Page E', uv: -2000, pv: 4800, amt: 2181,
//   },
//   {
//     name: 'Page F', uv: -250, pv: 3800, amt: 2500,
//   },
//   {
//     name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
//   },
// ];


// function CustomTooltip({ payload, active }) {
//   if (active) {
//     return (
//       <div className="custom-tooltip">
//         <p className="date">{`${payload.date}`}</p>
//         <p className="time">{`${payload.time}`}</p>
//         <p className="amount">{`${payload.discharge}`}</p>
//       </div>
//     );
//   }

//   return null;
// }


const YLabel = styled.div`
  position: absolute;
  left: -25%;
  top: 45%;
  transform: rotate(-90deg);
`


export default class Example extends PureComponent {
  // static jsfiddleUrl = "https://jsfiddle.net/alidingling/64v6ocdx/";

  render() {
    const data = this.props.data ? this.props.data.slice(0,97).map((entry, i)=>(
        {
          discharge: entry.discharge,
          date: (entry.date.getMonth()+1)+`/`+(entry.date.toString().slice(8, 10))+`/`+(entry.date.getUTCFullYear().toString().slice(2)),
          time: entry.date.toTimeString().slice(0,5),
          // unixTime: entry.date.getUnixTime()
        }
    )) : null;
    const currentDay = data[0].date;
    data.reverse();
    // console.log("====== DATA FROM SMALL CHART PULL ======")
    // console.log(data);
    // isolate only the data for the current day
    var currentData = [];
    const populateCurrentData = data ? 
      data.map(entry => 
        entry.date === currentDay ? 
          currentData.push(entry)
        : null
      )
    : null
    // console.log("====== currentData ======")
    // console.log(currentData);

    // create and fill in final array of data (full day including times that have not occurred yet so that the graph shows full day)
    var finalData = [ {discharge: null, date: currentDay, time: "00:00"}, {discharge: null, date: currentDay, time: "00:15"}, {discharge: null, date: currentDay, time: "00:30"}, {discharge: null, date: currentDay, time: "00:45"}, {discharge: null, date: currentDay, time: "01:00"}, {discharge: null, date: currentDay, time: "01:15"}, {discharge: null, date: currentDay, time: "01:30"}, {discharge: null, date: currentDay, time: "01:45"}, {discharge: null, date: currentDay, time: "02:00"}, {discharge: null, date: currentDay, time: "02:15"}, {discharge: null, date: currentDay, time: "02:30"}, {discharge: null, date: currentDay, time: "02:45"}, {discharge: null, date: currentDay, time: "03:00"}, {discharge: null, date: currentDay, time: "03:15"}, {discharge: null, date: currentDay, time: "03:30"}, {discharge: null, date: currentDay, time: "03:45"}, {discharge: null, date: currentDay, time: "04:00"}, {discharge: null, date: currentDay, time: "04:15"}, {discharge: null, date: currentDay, time: "04:30"}, {discharge: null, date: currentDay, time: "04:45"}, {discharge: null, date: currentDay, time: "05:00"}, {discharge: null, date: currentDay, time: "05:15"}, {discharge: null, date: currentDay, time: "05:30"}, {discharge: null, date: currentDay, time: "05:45"}, {discharge: null, date: currentDay, time: "06:00"}, {discharge: null, date: currentDay, time: "06:15"}, {discharge: null, date: currentDay, time: "06:30"}, {discharge: null, date: currentDay, time: "06:45"}, {discharge: null, date: currentDay, time: "07:00"}, {discharge: null, date: currentDay, time: "07:15"}, {discharge: null, date: currentDay, time: "07:30"}, {discharge: null, date: currentDay, time: "07:45"}, {discharge: null, date: currentDay, time: "08:00"}, {discharge: null, date: currentDay, time: "08:15"}, {discharge: null, date: currentDay, time: "08:30"}, {discharge: null, date: currentDay, time: "08:45"}, {discharge: null, date: currentDay, time: "09:00"}, {discharge: null, date: currentDay, time: "09:15"}, {discharge: null, date: currentDay, time: "09:30"}, {discharge: null, date: currentDay, time: "09:45"}, {discharge: null, date: currentDay, time: "10:00"}, {discharge: null, date: currentDay, time: "10:15"}, {discharge: null, date: currentDay, time: "10:30"}, {discharge: null, date: currentDay, time: "10:45"}, {discharge: null, date: currentDay, time: "11:00"}, {discharge: null, date: currentDay, time: "11:15"}, {discharge: null, date: currentDay, time: "11:30"}, {discharge: null, date: currentDay, time: "11:45"}, {discharge: null, date: currentDay, time: "12:00"}, {discharge: null, date: currentDay, time: "12:15"}, {discharge: null, date: currentDay, time: "12:30"}, {discharge: null, date: currentDay, time: "12:45"}, {discharge: null, date: currentDay, time: "13:00"}, {discharge: null, date: currentDay, time: "13:15"}, {discharge: null, date: currentDay, time: "13:30"}, {discharge: null, date: currentDay, time: "13:45"}, {discharge: null, date: currentDay, time: "14:00"}, {discharge: null, date: currentDay, time: "14:15"}, {discharge: null, date: currentDay, time: "14:30"}, {discharge: null, date: currentDay, time: "14:45"}, {discharge: null, date: currentDay, time: "15:00"}, {discharge: null, date: currentDay, time: "15:15"}, {discharge: null, date: currentDay, time: "15:30"}, {discharge: null, date: currentDay, time: "15:45"}, {discharge: null, date: currentDay, time: "16:00"}, {discharge: null, date: currentDay, time: "16:15"}, {discharge: null, date: currentDay, time: "16:30"}, {discharge: null, date: currentDay, time: "16:45"}, {discharge: null, date: currentDay, time: "17:00"}, {discharge: null, date: currentDay, time: "17:15"}, {discharge: null, date: currentDay, time: "17:30"}, {discharge: null, date: currentDay, time: "17:45"}, {discharge: null, date: currentDay, time: "18:00"}, {discharge: null, date: currentDay, time: "18:15"}, {discharge: null, date: currentDay, time: "18:30"}, {discharge: null, date: currentDay, time: "18:45"}, {discharge: null, date: currentDay, time: "19:00"}, {discharge: null, date: currentDay, time: "19:15"}, {discharge: null, date: currentDay, time: "19:30"}, {discharge: null, date: currentDay, time: "19:45"}, {discharge: null, date: currentDay, time: "20:00"}, {discharge: null, date: currentDay, time: "20:15"}, {discharge: null, date: currentDay, time: "20:30"}, {discharge: null, date: currentDay, time: "20:45"}, {discharge: null, date: currentDay, time: "21:00"}, {discharge: null, date: currentDay, time: "21:15"}, {discharge: null, date: currentDay, time: "21:30"}, {discharge: null, date: currentDay, time: "21:45"}, {discharge: null, date: currentDay, time: "22:00"}, {discharge: null, date: currentDay, time: "22:15"}, {discharge: null, date: currentDay, time: "22:30"}, {discharge: null, date: currentDay, time: "22:45"}, {discharge: null, date: currentDay, time: "23:00"}, {discharge: null, date: currentDay, time: "23:15"}, {discharge: null, date: currentDay, time: "23:30"}, {discharge: null, date: currentDay, time: "23:45"} ];
    // console.log("=== finalData ===")
    // console.log(finalData)

    const populateFinalData = currentData && finalData ?
        finalData.map((entry, i) => 
          currentData[i] !== undefined ?
            finalData[i].discharge = currentData[i].discharge
          : finalData[i].discharge = "n/a"
        )
    : null
    // console.log("======= final data arr ======")
    // console.log(finalData)

    function CustomTooltip({ active }) {
      if (active) {
        return (
          <div className="custom-tooltip">
            <p className="date">{data.date}</p>
            <p className="time">{data.time}</p>
            <p className="amount">{data.discharge}</p>
          </div>
        );
      }
    
      return null;
    }

    // console.log(`current date: `+data[0].date)
    // console.log(data[0].time)
    const dataMax = Math.max(...data.map(i => i.discharge));
    const dataMin = Math.min(...data.map(i => i.discharge));
    const dataMaxInt = parseInt(dataMax)
    const gradientOffset = () => {
      if (dataMax <= 0) {
        return 0;
      }
      if (dataMin >= 0) {
        return 1;
      }
      const ret = dataMax / (dataMax - dataMin)
      return ret ? ret : 0;
    };
    const off = gradientOffset();
    //const max = dataMax + (dataMax /2)


    return (
      <div>
        <AreaChart
          width={this.props.width / 2}
          height={this.props.width / 3}
          data={finalData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" interval={100} xAxisId={1}/>
          <XAxis dataKey="time" interval={15} xAxisId={0}/>
          <YAxis type="number" domain={[0, Math.ceil((dataMaxInt + 10)/10)*10]} />
          {/* <Tooltip content={<CustomTooltip />}/> */}
          <Tooltip />
          {/* <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={off} stopColor="green" stopOpacity={1} />
              <stop offset={off} stopColor="red" stopOpacity={1} />
            </linearGradient>
          </defs> */}
          <Area
            type="monotone"
            dataKey="discharge"
            stroke="#000"
            fill="#7fbddd"
          />
        </AreaChart>
        <YLabel>
        Discharge, millions of gallons per day
      </YLabel>
    </div>
    );
  }
}
