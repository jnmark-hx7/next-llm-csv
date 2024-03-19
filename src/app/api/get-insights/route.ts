import { NextRequest, NextResponse } from "next/server";
import { AskModel } from "@/lib/llm-hook";

export async function GET(req:NextRequest){
    try{

        return NextResponse.json({status:200, payload: "hello world"})
    }catch(err){
        return NextResponse.json({status:400, error: `Unable to retrieve insights.\n${err}`})
    }
}

export async function POST(req:NextRequest){
    try{
        const context = await req.json();
        const insights = await AskModel(context.context, 'What insights that can be gain from context above?')
        return NextResponse.json({status:200, payload:insights})
    }catch(err){
        return NextResponse.json({status:400, error: `Unable to retrieve insights.\n${err}`})
    }
}