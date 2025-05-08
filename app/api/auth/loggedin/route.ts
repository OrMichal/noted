import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(){
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    return token ? NextResponse.json({ logged: true }, { status: 200 }) : NextResponse.json({ logged: false }, { status: 401 });
}