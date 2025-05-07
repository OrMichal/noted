import * as JWT from "jsonwebtoken";
import { Types } from "mongoose";

export default class JWTService {
    private readonly secret: string;

    constructor() {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables.");
        }
        this.secret = process.env.JWT_SECRET;
    }

    public createToken(userId: string): string {
        return JWT.sign({ userId }, this.secret, {
            algorithm: "HS256",
            expiresIn: "1h",
        });
    }

    public checkToken(token: string): boolean {
        try {
            JWT.verify(token, this.secret);
            return true;
        } catch {
            return false;
        }
    }

    public getUserId(token: string): string | null {
        try {
            const decoded = JWT.verify(token, this.secret) as JWT.JwtPayload;
            return decoded?.userId ?? null;
        } catch {
            return null;
        }
    }
}
