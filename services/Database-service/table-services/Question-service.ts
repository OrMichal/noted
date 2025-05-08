import { QuestionModel } from "@/database/models/QuestionModel";
import QuestionEntity from "@/interfaces/entity/question";
import mongoose, { Types } from "mongoose";

export async function GetAllQuestions() : Promise<QuestionEntity[] | null | undefined> {
    try {
        const _questionsQuerr = await QuestionModel.find();

        return _questionsQuerr;
    } catch (error) {
        throw new Error("Error with getting questions" + error);
    }
}

export async function GetQuestionById(_id: string) : Promise<QuestionEntity | null | undefined> {
    try {
        const _questionQuerr = await QuestionModel.findOne({ _id: new Types.ObjectId(_id) });
        return _questionQuerr;
    } catch (error) {
        throw new Error("Error with getting question" + error)
    }
}

export async function AddQuestion(question: QuestionEntity): Promise<void> {
    try {
        await QuestionModel.insertOne({ author_id: new mongoose.Types.ObjectId(question.author_id), title: question.title, tags: question.tags, content: question.content });
    } catch (error) {
        throw new Error("Error with adding question" + error);
    }
}