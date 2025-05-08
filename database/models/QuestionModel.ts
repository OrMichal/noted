import mongoose, { model, models, Schema } from "mongoose";

const QuestionSchema = new Schema({
    author_id: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String },
    tags: [String],
    content: { type: String },
    created_at: { type: Date, default: Date.now }
});

export const QuestionModel = mongoose.models.Question ?? model("Question", QuestionSchema);