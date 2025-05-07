import User from "@/interfaces/entity/user";
import AuthorizationService from "@/services/authorization-service/authorization-service";
import DataService from "@/services/data-service/data-service";
import Link from "next/link";

export default async function UserBox() {
    const dataService: DataService = new DataService();
    const User: User = dataService.GetItems(["id", "firstname", "surname"]) as User;
    const Auth: AuthorizationService = new AuthorizationService();

    if (!Auth.Authorized()) {
        return (
            
            <Link href="/login" className="">Přihlásit se</Link>
        );
    }

    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="flex flex-col items-center justify-center w-full h-full p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-bold">Uživatel</h2>
                <p className="mt-2 text-gray-600">{User.firstname} {User.surname}</p>
            </div>
        </div>
    );
}