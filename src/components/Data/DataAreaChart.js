import React, { PureComponent } from "react";
import styled from "styled-components"
import {
  ComposedChart,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart, 
  Line,
  Label,
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


const YLabel = styled.div`
  position: absolute;
  left: -13%;
  top: 45%;
  transform: rotate(-90deg);
`



export default class Example extends PureComponent {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/64v6ocdx/";

  render() {
    const data = this.props.data ? this.props.data.map(entry=>(
      {
        discharge: (entry.discharge >= 0 ? entry.discharge : null),
        date: entry.date.toDateString(),
        time: entry.date.toTimeString().slice(0,5),
        minimum: this.props.minimum,
      }
    )) : null;
    // console.log(data);
    const dataMax = Math.max(...data.map(i => i.discharge));
    const dataMin = Math.min(...data.map(i => i.discharge));
    const gradientOffset = () => {
      if (dataMax <= 0) {
        return 0;
      }
      if (dataMin >= 0) {
        return 1;
      }

      return dataMax / (dataMax - dataMin);
    };
    const off = gradientOffset();
    return (
      <div>
        <ComposedChart
          width={this.props.width}
          height={this.props.width / 2.5}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" interval={95} xAxisId={0}/>
          <XAxis dataKey="time" interval={47} xAxisId={1}/>
          <YAxis type="number" domain={[0, Math.ceil((dataMax * 1.3)/10)*10]} />
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
          {/* render minimum line if 'min' prop is present */}
          {this.props.minimum ? <Line type="monotone" dataKey="minimum" stroke="red" strokeWidth={3} dot={false} /> : null}
        </ComposedChart>
        <YLabel>
          Discharge, cubic feet per second
        </YLabel>
      </div>
    );
  }
}
