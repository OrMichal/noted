import AnswerEntity from "@/interfaces/entity/Answer";
import { GetQuestionById } from "./Question-service";
import { AnswerModel } from "@/database/models/AnswerModel";
import mongoose, { Mongoose, Schema, Types } from "mongoose";

export async function GetQuestionAnswers(question_id: string) : Promise<AnswerEntity[] | null | undefined> {
    try {
        const _quesiton = await GetQuestionById(question_id);
        
        if(!_quesiton){
            throw new Error("Could not find question");
        }

        const _answers: AnswerEntity[] = await AnswerModel.find({ question_id: _quesiton._id });

        return _answers;
    } catch (error) {
        throw new Error("Error with getting answers" + error);
    }
}

export async function AddAnswer(answer: AnswerEntity): Promise<void>{
    try {
        const question_id = new mongoose.Types.ObjectId(answer.question_id!);
        const author_id = new mongoose.Types.ObjectId(answer.author_id!);

        await AnswerModel.insertOne({ author_id: author_id, question_id: question_id, content: answer.content });
    } catch (error) {
        throw new Error("Error with adding answers" + error);
    }
}