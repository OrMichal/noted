import { MongoConnect } from "@/lib/mongodb";
import DatabaseService from "@/services/Database-service/database-service";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcrypt";
import DTOService from "@/services/Database-service/DTO-service";
import JWTService from "@/services/Database-service/jwt-service";


export async function POST(formData: FormData) {
    try {
        await MongoConnect();
        const databaseService: DatabaseService = new DatabaseService();
        const dtoService: DTOService = new DTOService();
        const jwtToken: JWTService = new JWTService();
        const username: string | undefined = formData.get("username")?.toString();
        
        const _user = await databaseService.GetUser(username);
        
        if(!_user) {
            return NextResponse.json({ message: "User not found" });
        } 

        const res = await dtoService.GetUserDTO(_user);
    
        return NextResponse.json({ user: res, token: jwtToken.createToken(String(res._id)) });
        
    } catch (error) {
        return NextResponse.json({ message: "Internal server error" });
    }
}