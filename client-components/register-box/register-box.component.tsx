"use client";
import UserEntity from "@/interfaces/entity/user";
import { API_URL } from "@/services/http-service/http-service";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";
import { FiLock, FiCheck, FiUser, FiMail } from "react-icons/fi";

export default function RegisterBox() {
    const [userData, setUserData] = useState<UserEntity>({
        username: "",
        lastname: "",
        firstname: "",
        email: "",
        password: "",
    });
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();

    const registerMutation = useMutation({
        mutationKey: ["register"],
        mutationFn: (data: UserEntity) =>
            fetch(API_URL + "/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
                credentials: "include",
            })
                .then((resp) => resp.json())
                .then((data) => {
                    if (data.emessage) {
                        toast.error(data.emessage);
                    } else if (data.message) {
                        toast.success(data.message);
                        router.push("/login");
                    }
                }),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (userData.password !== confirmPassword) {
            toast.error("Hesla se neshodují.");
            return;
        }
        registerMutation.mutate(userData);
    };

    return (
        <div className="w-full max-w-xl bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-zinc-700">
            <h1 className="text-2xl font-semibold text-center mb-6 text-gray-900 dark:text-white">Registrace</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    
                {/* Jméno */}
                <div className="relative">
                    <FiUser className="absolute top-3.5 left-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Jméno"
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-black dark:text-white"
                        onChange={(e) => setUserData({ ...userData, firstname: e.target.value })}
                        required
                    />
                </div>
    
                {/* Příjmení */}
                <div className="relative">
                    <FiUser className="absolute top-3.5 left-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Příjmení"
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-black dark:text-white"
                        onChange={(e) => setUserData({ ...userData, lastname: e.target.value })}
                        required
                    />
                </div>
    
                {/* Uživatelské jméno */}
                <div className="relative sm:col-span-2">
                    <FiUser className="absolute top-3.5 left-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Uživatelské jméno"
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-black dark:text-white"
                        onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                        required
                    />
                </div>
    
                {/* Email */}
                <div className="relative sm:col-span-2">
                    <FiMail className="absolute top-3.5 left-3 text-gray-400" />
                    <input
                        type="email"
                        placeholder="Email"
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-black dark:text-white"
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        required
                    />
                </div>
    
                {/* Heslo */}
                <div className="relative">
                    <FiLock className="absolute top-3.5 left-3 text-gray-400" />
                    <input
                        type="password"
                        placeholder="Heslo"
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-black dark:text-white"
                        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                        required
                    />
                </div>
    
                {/* Potvrzení hesla */}
                <div className="relative">
                    <FiCheck className="absolute top-3.5 left-3 text-gray-400" />
                    <input
                        type="password"
                        placeholder="Potvrdit heslo"
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-black dark:text-white"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
    
                {/* Submit button */}
                <button
                    type="submit"
                    className={`sm:col-span-2 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition ${
                        registerMutation.isPending ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                    disabled={registerMutation.isPending}
                >
                    {registerMutation.isPending ? (
                        <>
                            <FaSpinner className="animate-spin" /> Registrace…
                        </>
                    ) : (
                        "Registrovat se"
                    )}
                </button>
            </form>
    
            <p className="mt-4 text-sm text-center text-gray-500 dark:text-gray-400">
                Máte účet?{" "}
                <Link href="/login" className="text-blue-600 hover:underline dark:text-blue-400">
                    Přihlaste se
                </Link>
            </p>
        </div>
    );
}