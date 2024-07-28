"use client";
import { chatSession } from "@/utils/AIPrompts/AIGeminiModal";
import { HeartCrack } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import OptionsForm from "./_components/OptionsForm";
const page = () => {
  const searchParams = useSearchParams();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const questions = localStorage.getItem("quizQuestions");
    if (questions) {
      setQuestions(JSON.parse(questions));
      // wag na i guess
      // localStorage.removeItem("quizQuestions"); // Clean up after use
    }
  }, []);
  return (
    <div className="p-10 flex items-center justify-center flex-col gap-16">
      {questions.length > 0 ? (
        <OptionsForm questions={questions} />
      ) : (
        <div className="p-10 flex items-center justify-center">
          <div className="flex gap-5 flex-col justify-center items-center cursor-pointer text-2xl ">
            <HeartCrack size={120} strokeWidth={0.5} />
            <h1 className="w-[25ch] text-center">
              There's no loaded question please head back to dashboard and hit
              the
              <b> Start Quiz </b>
              there
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
