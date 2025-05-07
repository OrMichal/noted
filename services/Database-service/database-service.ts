import { UserModel } from "@/database/models/UserModel";
import IUserDTO from "@/interfaces/DTO/IUserDTO";
import UserEntity from "@/interfaces/entity/user";
import { Model, ObjectId } from "mongoose";


export async function GetUserByUsername(username: string | undefined): Promise<UserEntity | null | undefined> {
    try {
        const _user = await UserModel.findOne({ username: username });

        if (_user) {
            return null;
        }

        return _user;
    } catch (error) {
        throw new Error("Error with userDto conversion" + error);
    }
}

export async function GetUserById(userId: string | undefined): Promise<UserEntity | null | undefined> {
    try {
        const _user = await UserModel.findOne({ _id: userId });

        if (_user) {
            return null;
        }

        return _user;
    } catch (error) {
        throw new Error("Error with userDto conversion" + error);
    }
}
