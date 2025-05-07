import { ObjectId } from "mongoose";

export default interface IUserDTO{
    _id: ObjectId,
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    question_ids: Array<Number>,
    birthdate: string
}