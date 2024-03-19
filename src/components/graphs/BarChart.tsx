"use client";
import { 
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

import { useState, useEffect } from "react";
export default function MyBarChart({
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
    <BarChart
        className=""
        width={400} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey={y_axis} />
        <XAxis dataKey={x_axis} />
        <YAxis />
        <Tooltip/>
    </BarChart>
    )
}
