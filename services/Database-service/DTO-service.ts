import IAnswerDTO from "@/interfaces/DTO/IAnswerDTO";
import IUserDTO from "@/interfaces/DTO/IUserDTO";
import AnswerEntity from "@/interfaces/entity/Answer";
import UserEntity from "@/interfaces/entity/user";
import { GetUserById } from "./table-services/User-service";

export async function GetUserDTO(user: UserEntity): Promise<IUserDTO>{
    const res: IUserDTO = {
        _id: user._id,
        username: String(user.username),
        firstname: String(user.firstname),
        lastname: String(user.lastname),
        email: String(user.email),
        birthdate: String(user.email),
        question_ids: user.question_ids
    }

    return res;
}

export async function GetAnswerDTO(answer: AnswerEntity): Promise<IAnswerDTO> {
    const author: UserEntity | null | undefined = await GetUserById(answer.author_id);
    
    const res: IAnswerDTO = {
        _id: answer._id?.toString()!,
        content: answer.content,
        author: author?.username.toString()!
    }

    return res;
}