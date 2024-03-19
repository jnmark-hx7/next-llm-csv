import { join } from "path";
import { NextRequest, NextResponse } from "next/server";
const csvToJson = require("convert-csv-to-json");

async function getCSV(filename:string){
    const json = csvToJson.fieldDelimiter(',').getJsonFromCsv(filename);
    return json
}
export async function GET(req:NextRequest){
    try{
        const path = join(process.cwd(), 'public/sample', "Financial Sample 2.csv");
        const response = await getCSV(path);
        
        if(!response || response.length<0) return;
        
        /*-- Rate limiting csv file up until 50 data per session! --*/
        let temp = [];
        temp = response.filter((_:any,index:number) => index <= response.length && index >= response.length-30 )
        return NextResponse.json({status:200, payload: temp})
    }catch(err){
        return NextResponse.json({status:400, error: `Unable to retrieve data from specified csv.\n${err}`})
    }
}
