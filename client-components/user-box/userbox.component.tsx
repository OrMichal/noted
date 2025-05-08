"use client";
import UserEntity from "@/interfaces/entity/user";
import { API_URL } from "@/services/http-service/http-service";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaSignInAlt, FaSignOutAlt, FaUserCircle } from "react-icons/fa";

export default function UserBox() {
    const [authorized, setAuthorized] = useState(false);

    const { data: userQuerr, isLoading: loadingUser } = useQuery({
        queryKey: ["userdata"],
        queryFn: async () => {
            const res = await fetch(process.env.NEXT_PUBLIC_BASE_API_URL + "/api/auth/userdata", {
                credentials: "include"
            });
            if (res.status === 200) setAuthorized(true);
            else setAuthorized(false);
            return res.json();
        },
    });

    const logoutMutation = useMutation({
        mutationKey: ["logout"],
        mutationFn: () =>
            fetch(API_URL + "/api/auth/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({})
            }).then(res => res.json())
              .then(data => {
                toast.success(data.message || "Odhlášení proběhlo úspěšně");
                setAuthorized(false);
            }),
    });

    const handleLogout = () => logoutMutation.mutate();

    const User: UserEntity = userQuerr;

    if (loadingUser) {
        return <div className="text-gray-400 text-sm animate-pulse">Načítání uživatele...</div>;
    }

    if (!authorized) {
        return (
            <Link href="/login" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition">
                <FaSignInAlt /> Přihlásit se
            </Link>
        );
    }

    const initials = User.firstname ? User.firstname[0].toUpperCase() : "U";

    return (
        <div className="relative">
            <details className="group relative w-48">
                <summary className="cursor-pointer list-none">
                    <div className="flex items-center gap-3 px-4 py-2 bg-white border border-gray-200  rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                        <div className="w-8 h-8 bg-indigo-500 text-white flex items-center justify-center rounded-full font-bold text-sm">
                            {initials}
                        </div>
                        <div className="flex flex-col text-sm text-gray-700 ">
                            <span className="font-medium">{User.firstname} {User.lastname}</span>
                            <span className="text-xs text-gray-800">Přihlášen</span>
                        </div>
                    </div>
                </summary>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg shadow-lg p-2 z-10">
                    <button
                        onClick={handleLogout}
                        className="w-full px-3 py-2 text-sm flex items-center gap-2 text-red-600 hover:bg-red-100 dark:hover:bg-zinc-700 rounded-md transition-colors duration-150"
                    >
                        <FaSignOutAlt /> Odhlásit se
                    </button>
                </div>
            </details>
        </div>
    );
}
