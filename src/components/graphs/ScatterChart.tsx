"use client";
import { 
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

import { useState, useEffect } from "react";
export default function MyScatterChart({
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
    <ScatterChart
        width={400} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <Scatter dataKey={y_axis} fill="#ff0000"/>
        <XAxis dataKey={x_axis} />
        <YAxis />
        <Tooltip/>
    </ScatterChart>
    )
}
