import QuestionEntity from "@/interfaces/entity/question";
import { API_URL } from "@/services/http-service/http-service";
import { format } from "date-fns";
import { cs } from "date-fns/locale";
import Link from "next/link";

export default async function QuestionList() {
    const resp = await fetch(API_URL + "/api/questions");
    const questions: QuestionEntity[] = await resp.json();

    return (
        <div className="grid grid-cols-1 gap-4">
            {questions.map((q) => (
                <Link href={"/questions/" + q._id} key={String(q._id)} className="bg-white rounded-lg shadow-md p-5 border hover:shadow-lg transition-shadow">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">{q.title}</h2>

                    <p className="text-sm text-gray-600 mb-2">
                        {q.content.length > 100 ? q.content.slice(0, 100) + "..." : q.content}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-2">
                        {q.tags.map((tag) => (
                            <span key={tag.toString()} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <p className="text-xs text-gray-400">
                        Vytvořeno: {format(new Date(q.created_at), "d. MMMM yyyy, HH:mm", { locale: cs })}
                    </p>
                </Link>
            ))}
        </div>
    );
}
