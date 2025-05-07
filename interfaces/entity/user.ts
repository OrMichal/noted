import { ObjectId } from "mongoose"

export default interface UserEntity {
    _id: ObjectId,
    username: String,
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    question_ids: Array<Number>
}