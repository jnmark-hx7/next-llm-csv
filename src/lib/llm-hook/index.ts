import { PromptTemplate } from "@langchain/core/prompts"
import { StringOutputParser, BytesOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence, RunnablePassthrough } from "@langchain/core/runnables";
import { ChatOpenAI } from "@langchain/openai";
export async function AskModel(context: string, question:string){
    const QTemplate = `You are helpful and enthusiatic support bot who can answer a given question based on the context provided. 
    Try to find the answer in the context. If you really don't know the answer, say "I'm sorry, I don't know the answer to that." 
    Don't try to make up an answer. Always speak as if you were chatting to a friend.
    context: {context}
    question: {question}
    answer:`

    const chain = RunnableSequence.from([
        PromptTemplate.fromTemplate(QTemplate),
        new ChatOpenAI(),
        new StringOutputParser
    ])

    const result = await chain.invoke({
        context,
        question
    })
    return result;
}