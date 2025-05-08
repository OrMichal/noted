import IAnswerDTO from "@/interfaces/DTO/IAnswerDTO";
import { API_URL } from "@/services/http-service/http-service"

interface Props{
    question_id: string
}

export default async function AnswerList({ question_id } : Props){
    const resp = await fetch(API_URL + "/api/answers/" + question_id);
    const data = await resp.json();

    if(data.message) {
        return <div className=" text-black ">{data.message}</div>
    }

    return (
        <div className="mt-8 space-y-4 overflow-scroll h-70">
            {data.map((answer: IAnswerDTO) => (
                <div key={answer._id} className="bg-white shadow-sm border border-gray-200 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-2">
                        <span className="font-medium text-black"> {answer.author} </span>
                    </div>
                    <div className="text-gray-900 text-base">{answer.content}</div>
                </div>
            ))}
        </div>
    );
}