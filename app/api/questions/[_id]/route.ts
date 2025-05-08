import QuestionEntity from "@/interfaces/entity/question";
import { MongoConnect } from "@/lib/mongodb";
import { GetQuestionById } from "@/services/Database-service/table-services/Question-service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params } : { params: { _id: string } }){
    await MongoConnect();
    const { _id } = await params;

    const _question = await GetQuestionById(_id);

    if(!_question){
        return NextResponse.json({ message: "Question not found" }, { status: 404 });
    }

    return NextResponse.json(_question);
}