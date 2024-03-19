import { useEffect, useState } from "react";
import { AIGraphProvider } from "@/lib/csv-hook-3";
import { GSchema } from "@/lib/type";
function Testing(data:any){
    const items = {
      props: [
        {
            graph: 'scatter',
            x_axis: 'SalePrice',
            y_axis: 'UnitsSold',
            description: 'A scatter plot illustrating the relationship between the sale price of products and the number of units sold.',
            insights : 'Based on the data provided, we can see that there is a direct correlation between the number of units sold and the profit generated. For example, in the segment of Government in France, the higher number of units sold (3421.5) resulted in a higher profit of 3968.94. Similarly, in the segment of Midmarket in France, selling even more units (3874.5) led to an even higher profit of 12398.40. This suggests that increasing the number of units sold can positively impact profit across different segments and countries.'
        },
        {
          graph: 'bar',
          x_axis: 'Country',
          y_axis: 'GrossSales',
          description: 'Comparison of Gross Sales in different countries.',
          insights: "Based on the data provided, the comparison of Gross Sales in different countries shows that France had the highest Gross Sales for the product Amarilla in the government segment compared to other countries. This indicates that there may be a higher demand for the product in France. It would be interesting to further analyze the factors contributing to the differences in Gross Sales between countries, such as marketing strategies, customer preferences, or economic conditions."
        },
        {
          graph: 'line',
          x_axis: 'MonthName',
          y_axis: 'COGS',
          description: 'Trend of Cost of Goods Sold over different months.',
          insights: 'none'
        }
      ]
    }
    let _this = []
    _this = items.props.map(
      (item) => UniqueIdentifier({
        data, 
        x_axis:item.x_axis, 
        y_axis:item.y_axis})
    )
    _this = _this.map( (currentData,index) => ({
        title: items.props[index].description,
        graph: items.props[index].graph,
        x_axis: items.props[index].x_axis,
        y_axis: items.props[index].y_axis,
        insights: items.props[index].insights,
        data: currentData
    }))
    return _this
}

function JsonModifier(items:GSchema[], data:any[]){
    let _this = []
    _this = items.map(
      (item) => UniqueIdentifier({
        data, 
        x_axis:item.x_axis, 
        y_axis:item.y_axis})
    )
    _this = _this.map( (currentData,index) => ({
        title: items[index].title,
        graph: items[index].graph,
        x_axis: items[index].x_axis,
        y_axis: items[index].y_axis,
        data: currentData
    }))
    return _this
}

export function RetrieveFile({fileName}:{fileName:string}){
    const [data, loadData] = useState<any[]>([]); 
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        const fetchCSV = async()=>{
            setLoading(true)
            await fetch(`http://localhost:3000/api/get-csv`)
            .then(async (item:any) =>{
                const response = await item.json();
                if(response.status !== 200){
                    console.log(response.error);
                    return;
                }
                const aiGraph = new AIGraphProvider(response.payload)
                const graphProps = await aiGraph.getProperties();
                const result = JsonModifier(graphProps, response.payload)
                loadData(prev => prev = result)

            })
            .catch(err => console.log(`Unable to fetch csv file.\n${err}`))
            .finally(()=>setLoading(false))
        }
        fetchCSV()
    },[fileName])

    return {data,loading};
}

function UniqueIdentifier({
    data, x_axis, y_axis
}:{data:any, x_axis:string, y_axis:string
}){
    const x_format = x_axis.replace(/\s/g, '');
    const arr = data.map((p:any)=>p[x_format])
    const s= new Set(arr);
    const unique = Array.from(s);

    let temp = []
    for (let item of unique){
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