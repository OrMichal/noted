import { QuestionModel } from "@/database/models/QuestionModel";
import { UserModel } from "@/database/models/UserModel";
import IUserDTO from "@/interfaces/DTO/IUserDTO";
import QuestionEntity from "@/interfaces/entity/question";
import UserEntity from "@/interfaces/entity/user";
import { Model, ObjectId, Schema, Types } from "mongoose";


export async function GetUserByUsername(username: string | undefined): Promise<UserEntity | null | undefined> {
    try {
        const _user = await UserModel.findOne({ username: username });

        return _user;
    } catch (error) {
        throw new Error("Error with userDto conversion" + error);
    }
}

export async function GetUserById(userId: string | undefined): Promise<UserEntity | null | undefined> {
    try {
        const _user = await UserModel.findOne({ _id: userId });

        return _user;
    } catch (error) {
        throw new Error("Error with user" + error);
    }
}

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
