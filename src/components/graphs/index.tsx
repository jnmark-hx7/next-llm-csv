import MyBarChart from "./BarChart"
import MyLineChart from "./LineChart"
import MyScatterChart from "./ScatterChart"
import MyPieChart from "./PieChart"
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
    
    const _this = UniqueIdentifier(data, x_axis, y_axis);
    console.log(graph, _this)
    if(graph == "Bar" || graph == 'bar') return <MyBarChart data={_this} x_axis={"name"} y_axis={"value"}/>
    if(graph == "Line" || graph == 'line') return <MyLineChart data={_this} x_axis={"name"} y_axis={"value"}/>
    if(graph == "Scatter" || graph == 'scatter') return <MyScatterChart data={_this} x_axis={"name"} y_axis={"value"}/>
    if(graph == "Pie" || graph == 'pie') return <MyPieChart data={_this} x_axis={"name"} y_axis={"value"}/>
    return <>{graph}</> //return default what type of graph
}

function UniqueIdentifier(data:any, x_axis:string, y_axis:string){
    const x_format = x_axis.replace(/\s/g, '');
    const arr = data.map((p:any)=>p[x_format])
    const s= new Set(arr);
    const unique = Array.from(s);

    let temp = []
    for (let item of unique){
        console.log(item)
        const current = data.filter( (p:any)=>p[x_format] == item);
        const value = current.reduce((accumulator : any ,item : any) => {
            return accumulator += Number(item[y_axis]);
        }, 0)
        temp.push({
            name: item,
            [y_axis]:value
        })
    }

    return temp;
}