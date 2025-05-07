import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    username: String,
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    question_ids: Array<Number>
});

export const UserModel = models.User || model("User", UserSchema);