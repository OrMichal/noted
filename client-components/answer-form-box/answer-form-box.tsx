"use client"
import { API_URL } from "@/services/http-service/http-service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

interface props{
    question_id: string
}

export default function AnswerForm({ question_id } : props){
    const [content, setContent] = useState<string>();
    const { data: userData, isLoading } = useQuery({
        queryKey: ["userdata"],
        queryFn: () => fetch(API_URL + "/api/auth/userdata")
        .then(data => data.json())
        .catch(err => console.log("error with fetch user: " + err))
    });

    const answerMutation = useMutation({
        mutationKey: ["answer" + question_id],
        mutationFn: () => fetch(API_URL + "/api/answers/" + question_id, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                author_id: userData._id,
                question_id: question_id,
                content: content
            }),
            credentials: "include"
        }).then(data => data.json()).then(data => {
            if(data.emessage){
                toast.error(data.emessage);
            } else {
                toast.success(data.message);
            }
        })
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        answerMutation.mutate();
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-lg max-w-lg mx-auto mt-10 ">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Napište vaši odpověď..."
                rows={4}
                className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Odeslat odpověď
            </button>
          </form>
        </div>
      );
}