
import QuestionList from "@/server-components/Question-list/question-list";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function QuestionsPage() {
    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-8">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Otázky</h2>
                    <Link
                        href={"/questions/add"}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                    >
                        <Plus className="w-5 h-5" />
                        Přidat otázku
                    </Link>
                </div>
                <QuestionList />
            </div>
        </div>
    );
}