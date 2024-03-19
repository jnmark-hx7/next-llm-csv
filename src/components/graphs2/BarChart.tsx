"use client";
import React from "react";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function MyBarChart({
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
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={"name"}/>
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={y_axis} fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          {/* <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} /> */}
        </BarChart>
    </ResponsiveContainer>
    )
}