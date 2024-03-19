/**
 * @DevLog 
 * Library for all graphs component that will be display on the page.
 */
import MyBarChart from "./BarChart";
import MyLineChart from "./LineChart";
import MyPieChart from "./PieChart";
import MyScatterChart from "./ScatterChart";

export default function Graph({
    graph,
    data,
    x_axis,
    y_axis,
}:{
    graph: string,
    data:any,
    x_axis:string
    y_axis:string 
}){
    if(graph == "Bar" || graph == 'bar' || graph == 'bar chart'|| graph == "Bar Graph" || graph == "Bar graph") return <MyBarChart data={data} x_axis={x_axis} y_axis={y_axis}/>
    if(graph == "Line" || graph == 'line' || graph == 'line graph' || graph == 'Line Graph '|| graph == "Line graph") return <MyLineChart data={data} x_axis={x_axis} y_axis={y_axis}/>
    if(graph == "Scatter" || graph == 'scatter' || graph == 'scatter plot') return <MyScatterChart data={data} x_axis={x_axis} y_axis={y_axis}/>
    if(graph == "Pie" || graph == 'pie'|| graph == 'pie chart' || graph == 'Pie Chart' || graph == "Pie chart") return <MyPieChart data={data} x_axis={x_axis} y_axis={y_axis}/>
    return <>{graph}</> //return default what type of graph
}

