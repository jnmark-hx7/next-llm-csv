"use client";
import { 
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

import { useState, useEffect } from "react";
export default function MyLineChart({
    data, x_axis, y_axis
}:{
    data:any, 
    x_axis:string
    y_axis:string
}){
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        setLoading(true)
    },[data])
    if(!loading) return(<div>loading</div>)
    return(
    <LineChart
        width={400} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <Line dataKey={y_axis} fill="#ff0000"/>
        <XAxis dataKey={x_axis} />
        <YAxis />
        <Tooltip/>
    </LineChart>
    )
}
