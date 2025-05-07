import { UserModel } from "@/database/models/UserModel";
import IUserDTO from "@/interfaces/DTO/IUserDTO";
import UserEntity from "@/interfaces/entity/user";
import { Model, ObjectId } from "mongoose";

export default class DatabaseService {
    public async GetUser(username: string | undefined): Promise<UserEntity | null | undefined> {
        try {
            const _user =  await UserModel.findOne({ username: username });

            if(_user){
                return null;
            }

            return _user;
        } catch (error) {
            throw new Error("Error with userDto conversion" + error);
        }
    }
}