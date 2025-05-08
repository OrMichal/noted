import QuestionList from "@/server-components/Question-list/question-list";
import Link from "next/link";
import { FaPlusCircle } from "react-icons/fa";

export default function Home() {
  return (
    <main className="min-h-screen min-w-screen bg-gradient-to-br from-gray-100 to-white  py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-600 ">Otázky komunity</h1>
          <Link
            href="/questions/add"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            <FaPlusCircle />
            Přidat otázku
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <QuestionList />
        </div>
      </div>
    </main>
  );
}
