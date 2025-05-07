"use client";
import Link from "next/link";
import { useState } from "react";

interface LoginBoxData {
    username: string | undefined;
    password: string | undefined;
}

export default function LoginBox() {
    const [loginData, setLoginData] = useState<LoginBoxData>({ username: undefined, password: undefined });

    const HandleLogin = () =>{
        console.log("Login data:", loginData);
    };

    return (
        <div className="flex flex-col gap-2 h-96 p-4 w-100 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold">Přihlášení</h1>
            <form className="flex flex-col gap-2" >
                <label htmlFor="username">Uživatelské jméno</label>
                <input
                    id="username"
                    type="text"
                    placeholder="Username"
                    className="border border-gray-300 rounded p-2"
                    onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                />

                <label htmlFor="password">Heslo</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    className="border border-gray-300 rounded p-2"
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                />

                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
                >
                    Přihlásit se
                </button>
                <div className="flex flex-col gap-2">
                    <p className="text-sm text-gray-500">Nemáte účet? <Link href="/register" className="text-blue-500 hover:underline">Zaregistrujte se</Link></p>
                </div>
            </form>
        </div>
    );
}