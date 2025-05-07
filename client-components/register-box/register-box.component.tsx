"use client";
import Link from "next/link";

export default function RegisterBox() {
    return(
        <div className="flex flex-col gap-2 h-auto p-4 w-100 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold">Registrace</h1>
            <form className="flex flex-col gap-2" >
                <label htmlFor="firstname">Jméno</label>
                <input
                    id="firstname"
                    type="text"
                    placeholder="Firstname"
                    className="border border-gray-300 rounded p-2"
                />

                <label htmlFor="surname">Příjmení</label>
                <input
                    id="surname"
                    type="text"
                    placeholder="Surname"
                    className="border border-gray-300 rounded p-2"
                />

                <label htmlFor="username">Uživatelské jméno</label>
                <input
                    id="username"
                    type="text"
                    placeholder="Username"
                    className="border border-gray-300 rounded p-2"
                />

                <label htmlFor="email">E-mail</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    className="border border-gray-300 rounded p-2"
                />

                <label htmlFor="password">Heslo</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    className="border border-gray-300 rounded p-2"
                />

                <label htmlFor="password-confirm">Potvrzení hesla</label>
                <input
                    id="password-confirm"
                    type="password"
                    placeholder="Password confirmation"
                    className="border border-gray-300 rounded p-2"
                />

                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
                >
                    Registrovat se
                </button>
                <div className="flex flex-col gap-2">
                    <p className="text-sm text-gray-500">Máte účet? <Link href="/login" className="text-blue-500 hover:underline">Přihlaste se</Link></p>
                </div>
            </form>
        </div>
    );
}