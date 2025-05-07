import * as JWT from "jsonwebtoken";


export function JWTcreateToken(userId: string): string {
    return JWT.sign({ userId }, process.env.JWT_SECRET!, {
        algorithm: "HS256",
        expiresIn: "1h",
    });
}

export function JWTcheckToken(token: string): boolean {
    try {
        JWT.verify(token, process.env.JWT_SECRET!);
        return true;
    } catch {
        return false;
    }
}

export function JWTgetUserId(token: string | undefined | null): string | null {
    try {
        const decoded = JWT.verify(String(token), process.env.JWT_SECRET!) as JWT.JwtPayload;
        return decoded?.userId ?? null;
    } catch {
        return null;
    }
}

