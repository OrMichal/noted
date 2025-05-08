import { MongoConnect } from "@/lib/mongodb";
import { AddQuestion } from "@/services/Database-service/table-services/Question-service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try {
        await MongoConnect();
        const questionData = await req.json();
        await AddQuestion(questionData);

        return NextResponse.json({ message: "Your question was posted successfully" });
        
    } catch (error) {
        return NextResponse.json({ emessage: "Internal server error" }, { status: 500 });
    }

}