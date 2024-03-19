import { DialogDropzone } from "@/components/dropzone-dialog";
import LayoutWrapper from "@/components/layout/layout-wrapper";
import GraphDemo from "@/components/graphs/example";
import PokemonStatsChart from "@/components/graphs/example-poke";
import { data } from "@/lib/dummy/dummy";
import MyBarChart from "@/components/graphs/BarChart";
import { getCSV, getCSVllm } from "@/lib/csv-hook";
import Graph from "@/components/graphs";

function ItemWrapper({children}:{children:React.ReactNode}){
  const style = `flex justify-center items-center relative `
  return(<div className={style}>{children}</div>)
}

//dummy
// const llm_dummy = {
//   graph: 'Bar',
//   x_axis: 'Name',
//   y_axis: [ 'Attack', 'Defense', 'Sp.Atk', 'Sp.Def', 'Speed' ]
// }

const llm_dummy = {
  graph: 'Line',
  x_axis: 'Name',
  y_axis: [
    'Total',     'HP',
    'Attack',    'Defense',
    'Sp.Atk',    'Sp.Def',
    'Speed',     'Generation',
    'Legendary'
  ]
}

type llm_csv ={
  graph:string,
  x_axis: string,
  y_axis: string[]
}

export const revalidate = 0;
export default async function Home() {
  // Server action
  const data = await getCSV("Financial Sample.csv");
  // const llm_dummy = await getCSVllm("Financial Sample.csv") as llm_csv;
  // console.log(llm_dummy)

  // const _this = await TestRun("AAPL_Montly_updates.csv");
  const _this = [
    {
      graph: 'Bar',
      x_axis: 'Country',
      y_axis: [ 'Profit', 'Sales', 'COGS' ]
    },
    { graph: 'Pie', x_axis: 'Country', y_axis: [ 'Profit' ] },
    {
      graph: 'Line',
      x_axis: 'Month Name',
      y_axis: [ 'Sales', 'Profit' ]
    }
  ]
  // console.log(data)
  // console.log(_this)
    return (
    <LayoutWrapper>
    <div className=" w-full p-4 rounded-lg  text-center">
        <span className="font-bold text-black/90 text-4xl ">Demo of LLM-CSV</span>
        <p className="mt-2 mb-5">This is a demo version of how llm-csv generating graph/charts <br/>for analytics purposes.</p>
        <DialogDropzone/>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3  md:gap-4 w-full mt-5 md:p-4 rounded-lg bg-muted/20 flex-1">
      <div className="text-center col-span-3 text-muted-foreground text-semibold italic ">
         Below shows the generated graph:
      </div>
      {
        _this?.map(
          (item,index) => <ItemWrapper key={index}>
             <Graph
              graph={item.graph}
              data={data}
              x_axis={item.x_axis}
              y_axis={item.y_axis[0]}
            />
          </ItemWrapper>
        )
      }
      {/* {
        llm_dummy.y_axis.map(
          (item,index) => <ItemWrapper key={index}>
            <Graph
              graph={llm_dummy.graph}
              data={data}
              x_axis={llm_dummy.x_axis}
              y_axis={item}
            />
          </ItemWrapper>
        )
      } */}
    </div>
    </LayoutWrapper>
  );
}


  {/* <MyBarChart 
              data={data} 
              x_axis={llm_dummy.x_axis} 
              y_axis={item}/> */}