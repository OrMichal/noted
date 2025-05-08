import QuestionEntity from "@/interfaces/entity/question";
import { MongoConnect } from "@/lib/mongodb";
import { GetQuestionById } from "@/services/Database-service/database-service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params } : { params: { id: string } }){
    await MongoConnect();

    const _question = await GetQuestionById(params.id);

    if(!_question){
        return NextResponse.json({ message: "Question not found" }, { status: 404 });
    }

    return NextResponse.json(_question);
}