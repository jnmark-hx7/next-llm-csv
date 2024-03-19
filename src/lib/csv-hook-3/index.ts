/** 
 * @Devlog
 * Generate the type of graphs with the pair columns (x,y)
 */
import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";
import { RunnableSequence, RunnablePassthrough } from "@langchain/core/runnables";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI} from "@langchain/openai";

export class AIGraphProvider{
    data : string;
    private openAIKey = "" ;
    constructor(data:any){ this.data = data;}

    AIModel(schema:any){ // any schema 
        const modelParams = {
            functions: [
              {
                name: "extractor",
                description: "Extracts fields from the input.",
                parameters: zodToJsonSchema(schema),
              },
            ],
            function_call: { name: "extractor" },
        };
        const model = new ChatOpenAI({ temperature: 0, openAIApiKey:this.openAIKey, modelName:"gpt-4"}).bind(modelParams);
        return model;
    }

    async getProperties(){
        /** Global methods **/
        const Chainer = (template:string, schema:any):RunnableSequence =>{
            return RunnableSequence.from([
                PromptTemplate.fromTemplate(template),
                this.AIModel(schema),
                new JsonOutputFunctionsParser()
            ])
        }
        const Invoker = async(
            chain: RunnableSequence, 
            schema:any, 
            question:string
        )=>{
            return await chain.invoke({
                context: JSON.stringify(this.data),
                question
            }) as z.infer<typeof schema>;
        } 

        //1st Sequence retrieve multiple types of graph or charts for this data
        const schema =  _required().schema;     // Schema for graph
        const schema2 = _required().schema2;    // Schema for graph Properties
        const QTemplate = _required().questionTemplate
        const q1 =  _required().graphCustomQuery;
        const invoker = await Invoker( Chainer(QTemplate, schema), schema, q1) as z.infer<typeof schema>;
            
        // 2nd Sequence retrieve the graph properties for every graph in GraphCaller
        let results = [] as any;

        for(let graph of invoker.graphs){
            const q2 = _required().propsCustomQuery(graph);
            const invoke_items = await Invoker( Chainer(QTemplate, schema2), schema2, q2) as z.infer<typeof schema2>;
            invoke_items.props.forEach( 
                ({x_axis, y_axis, title}) =>{
                const temp = {graph, x_axis, y_axis, title}
                results.push(temp)
            } );
        }
        return results;
    }

}

function _required(){
    const questionTemplate:string = `Answer the users question as best as possible,
    context: {context},
    question: {question}
    `
    const graphCustomQuery = "Answer these few questions below. What is the best graph to describe context above?";
    const propsCustomQuery = (graph:string):string=>`
    What are x-axis and y-axis names when plotting ${graph} graph using this inputs?
    What is the best ${graph} graph title to describe the corresponding x-axis and y-axis mentioned?` 
    const schema = z.object({
        graphs: z.array(
            z.string().describe("Type of graph for plotting. The output should returns <type_of_graphs> only. ")
        ).describe(" A list of of array that contain multiple types of graph that best to describe this context.")
    })
    const schema2 = z.object({
        props:z.array(
            z.object({
                x_axis: z.string().describe("X-axis column name for graph plotting"),
                y_axis: z.string().describe("Y-axis column name for graph plotting"),
                title: z.string().describe("Graph title for corresponding x-axis and y-axis")
            }),
          
        ).describe(" A list of multiple object that contain the a pair of axes (x-axis, y-axis) and title for graphs that best to describe this context.")
    })
    const modelParams = {
        functions: [
            {
              name: "extractor",
              description: "Extracts fields from the input.",
              parameters: zodToJsonSchema(schema),
            }],
        function_call: { name: "extractor" }, 
    }

    return{
        questionTemplate,
        graphCustomQuery,
        propsCustomQuery,
        schema,
        schema2,
        modelParams,
    }
}

