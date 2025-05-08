import IAnswerDTO from "@/interfaces/DTO/IAnswerDTO";
import { MongoConnect } from "@/lib/mongodb";
import { GetAnswerDTO } from "@/services/Database-service/DTO-service";
import { AddAnswer, GetQuestionAnswers } from "@/services/Database-service/table-services/Answer-service";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context : { params: { _id: string } }){
    const { _id } = await context.params;
    await MongoConnect();
    const _answers = await GetQuestionAnswers(_id);

    if(_answers?.length == 0){
        return NextResponse.json({ message: "There are no answers for this question yet" });
    }

    let res: IAnswerDTO[] = await Promise.all(
        _answers!.map(a => GetAnswerDTO(a))
    );

    return NextResponse.json(res);
}

export async function POST(req: NextRequest, context: { params: { _id: string } }){
    try {
        const cookieStore = await cookies();
        const hasToken = !!cookieStore.get("auth_token")?.value;
        
        if(!hasToken){
            return NextResponse.json({ emessage: "You must be logged in to answer questions" });
        }

        const { _id } = await context.params;
        await MongoConnect();
        const body = await req.json();
    
        await AddAnswer(body);
        
        return NextResponse.json({ message: "Answer posted successfully" });
    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}