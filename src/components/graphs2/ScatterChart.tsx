"use client";
import React from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { findMinMax } from "@/lib/utils";
export default function MyScatterChart({
  data, x_axis, y_axis
}:{
  data:any, 
  x_axis:string
  y_axis:string
}){
    const [loading, setLoading] = React.useState(false);
    React.useEffect(()=>{setLoading(true)},[data]);
    
    if(!loading) return(<div>loading</div>);

    const xProps = findMinMax(data, "name");
    const yProps = findMinMax(data, y_axis);
    const ofst = 100; // offset for nice view of graph
    // console.log('from scatter',data)
    return(
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          bottom: 5,
          left: 20,
        }}
      >
        <Legend/>
        <CartesianGrid />
        <XAxis 
          type="number" 
          dataKey={"name"} name={x_axis} 
          padding={{ left: 30, right: 30 }}
          domain={[Number(xProps.min+ofst), Number(xProps.max+ofst)]} />
        <YAxis 
          type="number" 
          dataKey={y_axis} name={y_axis} 
          domain={[Number(yProps.min+ofst), Number(yProps.max+ofst)]}  
        />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name={x_axis} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
    )
}

