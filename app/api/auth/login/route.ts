import { MongoConnect } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { JWTcreateToken } from "@/services/Database-service/jwt-service";
import { GetUserByUsername } from "@/services/Database-service/table-services/User-service";
import { GetUserDTO } from "@/services/Database-service/DTO-service";
import { cookies } from "next/headers";
import { CompareEncrypted } from "@/services/Database-service/cypher-service";

export async function POST(req: NextRequest) {
    try {
        await MongoConnect();
        const { username, password } = await req.json();
        const cookieStore = await cookies();

        const _user = await GetUserByUsername(username);

        if (!_user) {
            return NextResponse.json({ message: "Username or password is incorrect 1" }, { status: 400 });
        }

        const correctPassword = await CompareEncrypted(String(_user.password), password);

        if(!correctPassword){
            return NextResponse.json({message: "Username or password is incorrect"}, { status: 400 });
        }

        const userDTO = await GetUserDTO(_user);
        const token = JWTcreateToken(String(userDTO._id));

        cookieStore.set("auth_token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 3600,
            path: "/",
        });

        return NextResponse.json({ message: "ok" }, { status: 200 });
    } catch (error) {
        console.log("Login error" + error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}