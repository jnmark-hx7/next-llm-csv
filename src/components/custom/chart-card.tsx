import { Button } from "../ui/button";
import Graph from "../graphs2";
import React, {useState } from "react";

export function ChartCard({
    title, graph, data, x_axis, y_axis, 
  }:{
    title:string,
    graph: string,
    data: any[],
    x_axis: string,
    y_axis: string,
  }){
    const [insights, setInsights] = useState('none');
    const Wrapper = ({children}:{children:React.ReactNode}) =>{
      const style = ` drop-shadow relative
      border-muted-foreground/20 border-[0.04rem]
      hover:-translate-y-[0.05rem]
      duration-300 ease-in-out transition
      bg-white rounded-lg p-4 flex flex-col flex-1 gap-4`;
      return <div className={style}>{children}</div>
    }
    if(graph == "histogram" || graph == "heatmap" || graph == "Histogram") return null
    return(
      <Wrapper>
        <div className="font-semibold text-muted-foreground text-lg">{title}</div>
        <div className="h-[20rem] relative overflow-y-auto"><Graph graph={graph} data={data} x_axis={x_axis} y_axis={y_axis} /></div>
        <Button variant={"outline"} onClick={async()=>{
            const insights = await fetchInsights(JSON.stringify({data}));
            if(!insights){ setInsights('Unable to generate insights.'); return; }
            setInsights(insights)

        }}>View insights</Button>
        {
          insights == 'none' ? null: 
          <p className="text-muted-foreground px-2 text-sm flex-1"> {insights} </p>
        }
       
      </Wrapper>
    )
}

async function fetchInsights(context:string){
  try{
    const response = await fetch(`/api/get-insights`, {
      method:'POST', 
      body:JSON.stringify({context})})
    const item = await response.json();
    return item.payload;
  }catch(err){ console.log(err); return null}
   

}