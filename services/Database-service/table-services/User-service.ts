import { UserModel } from "@/database/models/UserModel";
import UserEntity from "@/interfaces/entity/user";
import * as bcyrpt from "bcrypt";
import { Encrypt } from "../cypher-service";

export async function GetUserByUsername(username: string | undefined): Promise<UserEntity | null | undefined> {
    try {
        const _user = await UserModel.findOne({ username: username });

        return _user;
    } catch (error) {
        throw new Error("Error with userDto conversion" + error);
    }
}

export async function GetUserById(userId: string | undefined): Promise<UserEntity | null | undefined> {
    try {
        const _user = await UserModel.findOne({ _id: userId });

        return _user;
    } catch (error) {
        throw new Error("Error with user " + error);
    }
}

export async function AddUser(user: UserEntity){
    try {
        const encryptedPassword = await Encrypt(user.password.toString());
        await UserModel.insertOne({ 
            firstname: user.firstname, 
            username: user.username, 
            lastname: user.lastname, 
            password: encryptedPassword, 
            email: user.email 
        });
    } catch (error) {
        throw new Error("Error with creating user " + error)
    }
}