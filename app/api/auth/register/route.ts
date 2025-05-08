import UserEntity from "@/interfaces/entity/user";
import { MongoConnect } from "@/lib/mongodb";
import { JWTcreateToken } from "@/services/Database-service/jwt-service";
import { AddUser, GetUserByUsername } from "@/services/Database-service/table-services/User-service";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest){
    try {
        await MongoConnect();
        const registerData: UserEntity = await req.json();
        const cookieStore = await cookies();

        const _ = await GetUserByUsername(registerData.username.toString());
        if(_){
            return NextResponse.json({ emessage: "someone is already using this username. Choose a different one please" });
        }

        await AddUser(registerData);

        const _user = await GetUserByUsername(registerData.username.toString());
        const token: string = JWTcreateToken(String(_user?._id));

        cookieStore.set("auth_token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 3600,
            path: "/",
        });

        return NextResponse.json({ message: "User successfully created" });
    } catch (error) {
        return NextResponse.json({ emessage: "Internal server error" });
    }
}