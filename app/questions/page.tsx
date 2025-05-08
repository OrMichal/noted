import QuestionList from "@/server-components/Question-list/question-list";

export default function QuestionsPage(){
    return(
        <div>
            <h2 className="text-black" >Otázky</h2>
            <QuestionList />
        </div>
    );
}