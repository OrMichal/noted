"use client"
import RegisterBox from "@/client-components/register-box/register-box.component";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function RegisterPage() {
    const [logged, setLogged] = useState(true);
    const router = useRouter();

    const { data, isLoading } = useQuery({
        queryKey: ["logged"],
        queryFn: () => fetch(process.env.NEXT_PUBLIC_BASE_API_URL + "/api/auth/loggedin").then(data => data.json())
    });

    useEffect(() => {
        if (data && data.logged) {
            router.push("/");
            toast.success("Už jste přihlášen");
        }
    }, [isLoading]);

    return (
        <RegisterBox />
    );
}