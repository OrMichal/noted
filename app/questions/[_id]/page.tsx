import AnswerForm from "@/client-components/answer-form-box/answer-form-box";
import QuestionEntity from "@/interfaces/entity/question";
import AnswerList from "@/server-components/Answer-list/answer-list";
import { API_URL } from "@/services/http-service/http-service"

interface Params{
    params: { _id: string }
}

export default async function QuestionDetailPage({ params } : Params){
  const { _id } = await params;
    const resp = await fetch(API_URL + "/api/questions/" + _id);
    const question: QuestionEntity = await resp.json();


    if(!question){
        return <div>Otázka nebyla nalezena.</div>
    }


    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6 w-200">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{question.title}</h1>
          <p className="text-gray-700 mb-4">{question.content}</p>
          <div className="flex gap-2">
            {question.tags.map((tag, idx) => (
              <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
                #{tag}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-400 mt-6">Vytvořeno: {new Date(question.created_at).toLocaleDateString()}</p>
          <AnswerList question_id={_id} />
          <AnswerForm question_id={_id} />
        </div>
    );
}