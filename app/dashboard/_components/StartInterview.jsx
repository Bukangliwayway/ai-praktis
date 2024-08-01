"use client";
import { chatSession } from "@/server/AIGeminiModal";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const StartInterview = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const populateQuestions = async () => {
    const prompt = `
    Using JSON in an array, generate 3 brief, thought-provoking questions about a person's current relationship. Questions should:
    1. Explore the relationship's current status and dynamics;
    2. Uncover potential red flags or uncomfortable situations;
    3. Reveal concerns about progressing the relationship.
    Ensure questions are relatable, easy to understand, and encourage honest reflection. Combined answers should paint a clear picture of their current relationship scenario.
    JSON Format:
    {[question1, question2, question3]}
    `;

    try {
      setLoading(true);
      const res = await chatSession.sendMessage(prompt);
      if (res) {
        localStorage.setItem("quizQuestions", res.response.text());
        router.push("/start-quiz");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 flex items-center justify-center">
      {loading ? (
        <div className="p-16 py-12 rounded-md bg-secondary shadow-lg cursor-not-allowed text-2xl font-bold">
          <h1 className="text-gray-600">Loading please wait</h1>
        </div>
      ) : (
        <div
          className="p-16 py-12 rounded-md bg-secondary hover:shadow-lg cursor-pointer text-2xl font-bold"
          onClick={populateQuestions}
        >
          <h1>Start Quiz!</h1>
        </div>
      )}
    </div>
  );
};

export default StartInterview;
