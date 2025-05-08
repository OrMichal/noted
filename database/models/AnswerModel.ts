import { model, models, Schema } from "mongoose";

const AnswerSchema = new Schema({
    author_id: { type: Schema.Types.ObjectId, ref: "User" },
    question_id: { type: Schema.Types.ObjectId, ref: "Question" },
    content: { type: String }
});

export const AnswerModel = models.Answer ?? model("Answer", AnswerSchema);