"use client";
import { QueryClient, useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface LoginBoxData {
    username: string;
    password: string;
}

export default function LoginBox() {
    const [loginData, setLoginData] = useState<LoginBoxData>({ username: "", password: "" });
    const router = useRouter();
    const loginMutation = useMutation({
        mutationKey: ["user-login"],
        mutationFn: () => fetch(process.env.NEXT_PUBLIC_BASE_API_URL + "/api/auth/login", { 
            method: "POST", 
            headers: { "Content-Type" : "application/json" }, 
            body: JSON.stringify(loginData) 
        }).then(resp =>{
            if(resp.status == 200){
                toast.success("Přihlášení bylo úspěšné");
                router.push("/");
            } else {
                toast.error("Přihlášení se nezdařilo");
            }
            return resp.json();
        })
    });

    const HandleLogin = () =>{
        loginMutation.mutate();

        new QueryClient().invalidateQueries({ queryKey: ["userdata"] });
    };

    return (
        <div className="flex flex-col gap-2 h-96 p-4 w-100 bg-white rounded-lg shadow-md text-black">
            <h1 className="text-2xl font-bold text-center">Přihlášení</h1>
            <form className="flex flex-col gap-2 p-6" onSubmit={(e) => {e.preventDefault(); HandleLogin();}}>
                <label htmlFor="username">Uživatelské jméno</label>
                <input
                    id="username"
                    type="text"
                    placeholder="Username"
                    className="border border-gray-300 rounded p-2"
                    onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                    required={true}
                />

                <label htmlFor="password">Heslo</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    className="border border-gray-300 rounded p-2"
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required={true}
                />

                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 w-50 self-center mt-10"
                >
                    Přihlásit se
                </button>
                <div className="flex flex-col gap-2">
                    <p className="text-sm text-gray-500 self-center">Nemáte účet? <Link href="/register" className="text-blue-500 hover:underline">Zaregistrujte se</Link></p>
                </div>
            </form>
        </div>
    );
}