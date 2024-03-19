"use client";
import { 
    PieChart,
    Pie,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

import { useState, useEffect } from "react";
export default function MyPieChart({
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
    // <PieChart
    //     className=""
    //     width={400} height={300} >
    //     {/* <CartesianGrid strokeDasharray="3 3" /> */}
    //     <Pie data={data} dataKey={y_axis} />
    //     {/* <XAxis dataKey={x_axis} /> */}
    //     <YAxis />
    //     <Tooltip/>
    // </PieChart>
    <PieChart width={730} height={250}>
        <Pie data={data} dataKey={y_axis} nameKey={x_axis} cx="50%" cy="50%" outerRadius={100}  />
        <Tooltip/>
        {/* <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label /> */}
    </PieChart>
    )
}
