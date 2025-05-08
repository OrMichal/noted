import { MongoConnect } from "@/lib/mongodb";
import { GetAllQuestions } from "@/services/Database-service/database-service";
import { NextResponse } from "next/server";

export async function GET(){
    await MongoConnect();
    const _questions = await GetAllQuestions();

    return _questions ? NextResponse.json(_questions, { status: 200 }) : NextResponse.json({ message: "There are no questions yet, but you can create one" }, { status: 202 });
}