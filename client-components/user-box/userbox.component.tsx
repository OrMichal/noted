"use client"
import UserEntity from "@/interfaces/entity/user";
import { API_URL } from "@/services/http-service/http-service";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function UserBox() {
    const qClient = new QueryClient();

    const [authorized, setAuthorized] = useState(false);
    const { data: userQuerr, isLoading: loadingUser } = useQuery({
        queryKey: ["userdata"],
        queryFn: () => fetch(process.env.NEXT_PUBLIC_BASE_API_URL + "/api/auth/userdata")
            .then(data => {
                if (data.status == 200) {
                    setAuthorized(true);
                }
                return data.json();
            })
            .catch(err => { console.log("error with fetch user: " + err); setAuthorized(false); return null }),
    });

    const logoutMutation = useMutation({
        mutationKey: ["logout"],
        mutationFn: () => fetch(API_URL + "/api/auth/logout", { 
            method: "POST", 
            headers: {"Content-Type": "application/json"}, 
            body: JSON.stringify({}) 
        }).then(data => data.json()).then(res =>{ toast.success(res.message); setAuthorized(false)}),
    });

    const handleLogout = () => {
        logoutMutation.mutate();
    }

    const User: UserEntity = userQuerr;

    if (!authorized) {
        return (
            <Link href="/login" className="">Přihlásit se</Link>
        );
    }

    if (loadingUser) {
        return <div>načítání...</div>
    }

    return (
        <div className="relative">
            <details className="group relative w-40">
                <summary className="cursor-pointer list-none">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                        <div className="flex flex-col text-sm text-gray-700">
                            <span className="font-medium">{User.firstname} {User.lastname}</span>
                            <span className="text-xs text-gray-500">Přihlášen</span>
                        </div>
                    </div>
                </summary>
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10">
                    <button
                        onClick={handleLogout}
                        className="w-full px-3 py-2 text-sm text-left text-red-600 hover:bg-red-50 rounded-md transition-colors duration-150"
                    >
                        Odhlásit se
                    </button>
                </div>
            </details>
        </div>
    );
    
}