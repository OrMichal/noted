"use client"
import QuestionEntity from "@/interfaces/entity/question";
import { API_URL } from "@/services/http-service/http-service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaPlusCircle } from "react-icons/fa";

export default function AddQuestionPage() {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [tags, setTags] = useState<string>("");

    const { data: userData } = useQuery({
        queryKey: ["userdata"],
        queryFn: () => fetch(API_URL + "/api/auth/userdata")
        .then(data => data.json())
        .catch(err => console.log("error with fetch user: " + err))
    });

    const addQuestionMutation = useMutation({
        mutationKey: ["addQuestion"],
        mutationFn: (data: QuestionEntity) => fetch(API_URL + "/api/questions/add", { 
            method: "POST",  
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: "include" 
        }).then(data => data.json()).then(data => {
            if(data.emessage){
                toast.error(data.emessage);
            } else if(data.message) {
                toast.success(data.message);
            }
        })
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== "");

        if(!userData){
            toast.error("Vaše data se ještě nenačetly, počkejte prosím");
            return;
        }

        const questionData: QuestionEntity = {
            title: title,
            content: content,
            tags: tagArray,
            author_id: userData._id,
            created_at: new Date(Date.now())
        };

        addQuestionMutation.mutate(questionData);

        setTitle("");
        setContent("");
        setTags("");
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-lg max-w-lg mx-auto mt-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Add a New Question</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-600">Title</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter the question title"
                        className="w-full p-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-600">Description</label>
                    <textarea
                        id="description"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Enter a detailed description of the question"
                        rows={4}
                        className=" text-black w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="tags" className="block text-gray-600">Tags</label>
                    <input
                        id="tags"
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="Enter tags separated by commas"
                        className="w-full p-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <small className="text-gray-500">Use commas to separate tags (e.g., "JavaScript, React, Frontend")</small>
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center justify-center gap-2"
                >
                    <FaPlusCircle /> Add Question
                </button>
            </form>
        </div>
    );
}
