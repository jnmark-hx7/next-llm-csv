"use client";
import React from "react";
import LayoutWrapper from "@/components/layout/layout-wrapper";
import { Button } from "@/components/ui/button";
import { BarChart2Icon, MoveLeft } from "lucide-react";
import { ChartCard } from "@/components/custom/chart-card";
import { ReGraphType } from "@/lib/type";
import { RetrieveFile } from "@/hooks/retrieveFile";

export default function Home(){
  const currentFile = RetrieveFile({fileName:"Financial Sample.csv"});
  return(
    <LayoutWrapper>
      <SideMenu>
        <h1 className="font-bold py-5 p-4 text-lg">Demo</h1>
        <div className=" flex w-full  px-2">
          <Button variant={"outline"} className="w-full flex gap-1 justify-start font-light">
            <BarChart2Icon className="h-5 w-5 rounded "/> Graph
          </Button>
        </div>
      </SideMenu>
      <MainSection>
        <div className="py-5 p-4 text-lg flex gap-2 items-center">
          <button className="drop-shadow p-2 rounded bg-white"><MoveLeft className="w-3 h-3"/></button>
          Analytics 
        </div>
      <GraphSection>
      <GridWrapper>
        {currentFile.loading && <>Loading...</>}
        {
          currentFile.data.length <= 0 && currentFile.loading == false ? 'Cannot generate data'
          : currentFile.data.map((item:ReGraphType,index:number)=> 
          <ChartCard 
            key={`Chart-${index+1}`} 
            title={item.title}
            graph={item.graph}
            data={item.data}
            x_axis={item.x_axis}
            y_axis={item.y_axis}
            // insights={item.insights}
            />)
        }
      </GridWrapper>
      </GraphSection>
      </MainSection>
    
    </LayoutWrapper>
  )
}

function GridWrapper({children}:{children:React.ReactNode}){
  const style = `grid grid-cols-3 gap-2`;
  return(<div className={style}>{children}</div>)
}

function GraphSection({children}:{children:React.ReactNode}){
  const style = ` flex-1 p-4 bg-muted/50`;
  return(<div className={style}>{children}</div>)
}

function MainSection({children}:{children:React.ReactNode}){
  const style = `w-[90%] flex flex-col`;
  return(<div className={style}>{children}</div>)
}

function SideMenu({children}: {children:React.ReactNode}){
  const style = `bg-gray-100/10 w-[10%] px-1 flex flex-col border-muted-foreground/20 border-r-[0.1rem]`;
  return(<div className={style}>{children}</div>)
}
