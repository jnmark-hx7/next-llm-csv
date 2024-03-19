"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';


export default function MyLineChart({
  data, x_axis, y_axis
}:{
  data:any, 
  x_axis:string
  y_axis:string
}){
    const [loading, setLoading] = React.useState(false);
    React.useEffect(()=>{setLoading(true)},[data]);

    if(!loading) return(<div>loading</div>);

    return(
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={500} height={300} data={data} 
       margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={"name"} padding={{ left: 30, right: 30 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={y_axis} stroke="#8884d8" activeDot={{ r: 8 }} />
        {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
      </LineChart>
    </ResponsiveContainer>
    )
}