import IUserDTO from "@/interfaces/DTO/IUserDTO";
import UserEntity from "@/interfaces/entity/user";

export default class DTOService{
    public async GetUserDTO(user: UserEntity){
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
}