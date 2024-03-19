"use client";
import React from "react";
import { PieChart, Pie, ResponsiveContainer, Tooltip, Legend } from 'recharts';
// const data01 = [
//   { name: 'Group A', value: 400 },
//   { name: 'Group B', value: 300 },
//   { name: 'Group C', value: 300 },
//   { name: 'Group D', value: 200 },
// ];
// const data02 = [
//   { name: 'A1', value: 100 },
//   { name: 'A2', value: 300 },
//   { name: 'B1', value: 100 },
//   { name: 'B2', value: 80 },
//   { name: 'B3', value: 40 },
//   { name: 'B4', value: 30 },
//   { name: 'B5', value: 50 },
//   { name: 'C1', value: 100 },
//   { name: 'C2', value: 200 },
//   { name: 'D1', value: 150 },
//   { name: 'D2', value: 50 },
// ];
// const data03 = [
//   { name: 'Group A', value: 500 },
//   { name: 'Group B', value: 200 },
//   { name: 'Group C', value: 100 },
//   { name: 'Group D', value: 600 },
// ];
export default function MyPieChart({
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
    <ResponsiveContainer width="100%" height="100%" >
      <PieChart width={500} height={500} >
        <Tooltip />
        {/* <Legend /> */}
        {/* <Pie data={data03} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" />
        <Pie data={data01} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" /> */}
        <Pie data={data} dataKey={y_axis} cx="50%" cy="50%" outerRadius={90} fill="#82ca9d" label />
      </PieChart>
    </ResponsiveContainer>
    )
}