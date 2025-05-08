import { Schema } from "mongoose";

export default interface QuestionEntity{
    _id?: string,
    author_id: string,
    title: String ,
    tags: String[],
    content: String,
    created_at: Date 
}