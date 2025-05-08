import { Schema } from "mongoose";

export default interface QuestionEntity{
    _id: Schema.Types.ObjectId,
    author_id: Schema.Types.ObjectId,
    title: String ,
    tags: String[],
    content: String,
    created_at: Date 
}