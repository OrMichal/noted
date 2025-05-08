"use client"
import LoginBox from "@/client-components/login-box/login-box.component";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


export default function LoginPage() {
    const [logged, setLogged] = useState(true);
    const router = useRouter();

    const { data, isLoading } = useQuery({
        queryKey: ["logged"],
        queryFn: () => fetch(process.env.NEXT_PUBLIC_BASE_API_URL + "/api/auth/loggedin").then(data => data.json())
    });

    useEffect(() => {
        if(data && data.logged){
            router.push("/");
            toast.success("Už jste přihlášen");
        }
    }, [isLoading]);

    if(isLoading) {
        return <p>načítání...</p>
    } else {
        return (
            <div>
                <LoginBox />
            </div>
        );
    }

}