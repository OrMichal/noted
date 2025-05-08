"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaSpinner, FaUser, FaLock } from "react-icons/fa";

interface LoginBoxData {
    username: string;
    password: string;
}

export default function LoginBox() {
    const [loginData, setLoginData] = useState<LoginBoxData>({ username: "", password: "" });
    const router = useRouter();
    const queryClient = useQueryClient();

    const loginMutation = useMutation({
        mutationKey: ["user-login"],
        mutationFn: () =>
            fetch(process.env.NEXT_PUBLIC_BASE_API_URL + "/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(loginData),
            }).then(async (resp) => {
                const json = await resp.json();
                if (resp.status === 200) {
                    toast.success("Přihlášení bylo úspěšné");
                    queryClient.invalidateQueries({ queryKey: ["userdata"] });
                    router.push("/");
                } else {
                    toast.error(json.message || "Přihlášení se nezdařilo");
                }
                return json;
            }),
    });

    const handleLogin = () => loginMutation.mutate();

    return (
        <div className="max-w-md mx-auto mt-20 bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-zinc-700 transition-all">
            <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">Přihlášení</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin();
                }}
                className="space-y-5"
            >
                <div className="relative">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Uživatelské jméno
                    </label>
                    <div className="flex items-center border border-gray-300 dark:border-zinc-600 rounded-lg p-2 bg-white dark:bg-zinc-800">
                        <FaUser className="text-gray-400 mr-2" />
                        <input
                            id="username"
                            type="text"
                            placeholder="Zadejte uživatelské jméno"
                            className="bg-transparent focus:outline-none w-full text-gray-900 dark:text-white"
                            onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <div className="relative">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Heslo
                    </label>
                    <div className="flex items-center border border-gray-300 dark:border-zinc-600 rounded-lg p-2 bg-white dark:bg-zinc-800">
                        <FaLock className="text-gray-400 mr-2" />
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className="bg-transparent focus:outline-none w-full text-gray-900 dark:text-white"
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loginMutation.isPending}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition ${loginMutation.isPending ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                >
                    {loginMutation.isPending ? (
                        <>
                            <FaSpinner className="animate-spin" /> Přihlašuji…
                        </>
                    ) : (
                        "Přihlásit se"
                    )}
                </button>

                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    Nemáte účet?{" "}
                    <Link href="/register" className="text-blue-600 hover:underline dark:text-blue-400">
                        Zaregistrujte se
                    </Link>
                </p>
            </form>
        </div>
    );
}
