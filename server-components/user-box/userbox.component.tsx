"use client"
import User from "@/interfaces/entity/user";
import AuthorizationService from "@/services/authorization-service/authorization-service";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { cookies } from "next/headers";

export default function UserBox() {
    const cookieStore = cookies();
    const { data: userQuerr, isLoading: loadingUser } = useQuery({
        queryKey: ["user" + (cookieStore.then(x => x.get("auth_token")?.value))],
        queryFn: () => fetch(process.env.BASE_API_URL + "/api/userdata")
            .then(data => data.json())
            .catch(err => console.log("error with fetch user: " + err))
    });

    const Auth: AuthorizationService = new AuthorizationService();
    const User: User = userQuerr;
    
    if (!Auth.Authorized()) {
        return (
            <Link href="/login" className="">Přihlásit se</Link>
        );
    }

    if(loadingUser){
        return <div>loading user data...</div>
    }

    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="flex flex-col items-center justify-center w-full h-full p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-bold">Uživatel</h2>
                <p className="mt-2 text-gray-600">{User.firstname} {User.lastname}</p>
            </div>
        </div>
    );
}