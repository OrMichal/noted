import UserEntity from "@/interfaces/entity/user";
import { MongoConnect } from "@/lib/mongodb";
import { JWTgetUserId } from "@/services/Database-service/jwt-service";
import { NextRequest, NextResponse } from "next/server";
import { GetUserById } from "@/services/Database-service/database-service";
import { GetUserDTO } from "@/services/Database-service/DTO-service";
import { cookies } from "next/headers";

export async function GET(req: NextRequest){
    await MongoConnect();

    const cookieStore = cookies();
    const token = (await cookieStore).get("auth_token")?.value;
    const userId = JWTgetUserId(token);

    if(!userId){
        return NextResponse.json({ message: "Unauthorized access" }, { status: 401 });
    }

    const user = await GetUserById(userId);

    if(!user){
        return NextResponse.json({ message: "Couldn't get user data" }, { status: 500 });
    }

    const userDTO = await GetUserDTO(user)    

    return NextResponse.json(userDTO);
}