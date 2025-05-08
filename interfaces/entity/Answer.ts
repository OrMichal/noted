import { Schema } from "mongoose";

export default interface AnswerEntity{
    _id?: string,
    author_id?: string,
    question_id?: string,
    content: string
}