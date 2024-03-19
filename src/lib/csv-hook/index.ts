import { CSVLoader } from "langchain/document_loaders/fs/csv";

/**
 * LLM dependencies **/
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RunnableSequence} from "@langchain/core/runnables";
import { OpenAIEmbeddings, ChatOpenAI, OpenAI} from "@langchain/openai";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";

/** Zod Schema dependecies */
import {z} from "zod"
import { zodToJsonSchema } from "zod-to-json-schema";


const csvToJson = require("convert-csv-to-json");

const path =(filename:string)=> `C:/NEXTJS/test/llm-csv/public/sample/${filename}`
export async function getCSV(filename:string){
    const json = csvToJson.fieldDelimiter(',').getJsonFromCsv(path(filename));
    return json
}
export async function getCSVllm(filename:string){
    console.log('initating get csv file')
    const loader = new CSVLoader(path(filename));
    const docs = await loader.load();
    const text_splitter = new RecursiveCharacterTextSplitter({chunkSize: 500, chunkOverlap:0});
    const splitDocs = await text_splitter.splitDocuments(docs);
    const vectorStore = await MemoryVectorStore.fromDocuments(
        splitDocs,
    new OpenAIEmbeddings()
    );
    const retriever = vectorStore.asRetriever(); // Add make vectorStore as Retriever
    const combineDocuments = (docs:any) => docs.map((doc:any) => doc.pageContent).join('\n\n');

    const schema = z.object({
        graph: z.string().describe("Determine the best type of graph to show this information. The output should returns like this format : <TYPE_OF_GRAPH> Graph"),
        x_axis: z.string().describe("X-axis column name for graph plotting"),
        y_axis: z.array(z.string().describe("Y-axis column name for graph plotting. Can be a list or single output."))
    });

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

    const answerTemplate = `Answer the users question as best as possible.
    Return the following outputs with short concise answer by matching the column names from context below.
    Provide simple \n context: {context}, question: {question}`;
    const model = new ChatOpenAI({ temperature: 0, }).bind(modelParams);
    
    const run = RunnableSequence.from([
        PromptTemplate.fromTemplate(answerTemplate),
        model,
        new JsonOutputFunctionsParser()
    ]);

    const question =  "Answer few questions below. What type of graph to plot this input. What is the x-axis name when plotting graph using these inputs?. What is the y-axis name when plotting graph using these inputs?";
    const response = await run.invoke(
        {
            context: await (async()=>{ const query = await retriever.invoke(question); return combineDocuments(query)})(),
            question
        }
    );

    return response;
}