"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import ManipulationCard from "./ManipulationCard";
import { useToast } from "@/components/ui/use-toast";
import { chatSession } from "@/server/AIGeminiModal";
import { getManipulations } from "@/server/Manipulations";
import { createQuiz } from "@/server/CreateQuiz";

const OptionsForm = ({ questions }) => {
  const [answers, setAnswers] = useState([]);
  const [manipulations, setManipulations] = useState([]);
  const [selectedManipulations, setSelectedManipulations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormLoading, setIsFormLoading] = useState(true);

  const { toast } = useToast();

  useEffect(() => {
    const fetchManipulations = async () => {
      try {
        const { error, success } = await getManipulations();
        if (error) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        if (success) {
          setManipulations(success);
        }
      } catch (error) {
        console.error("Error fetching manipulations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchManipulations();
  }, []);

  const handleManipulationClick = (name) => {
    setSelectedManipulations((prev) => {
      if (prev.includes(name)) {
        return prev.filter((item) => item !== name);
      } else {
        return [...prev, name];
      }
    });
  };

  const populateQuiz = async () => {
    const prompt = `

Create a relationship quiz based on the User's Current Relationship situation: To be determined from the following three answers:

${questions
  .map((question, index) => `${index + 1}. ${question} \n${answers[index]}`)
  .join("\n")}

Quiz Structure:
1. Create 5 questions in JSON format.
2. Each question should be a scenario related to the early stages of a relationship.

Question Requirements:
- Exactly 50 words long
- Written in first-person perspective (I/me)
- Describe a tricky, nuanced situation that's challenging to analyze, especially have a scenario that is not black and white and includes some ambiguity
- Ensure at least one question subtly tests whether a situation involves manipulation or not.
- Relate to the user's current situation when possible
- If choices are more than 3 only pick three choices and add "Not a manipulation" as the fourth choice
- Include as well the correct answer

Answer Choices: For each question, provide these options:
${selectedManipulations
  .map((choice, index) => `${choice}`)
  .join(", ")}, plus "Not a manipulation"

JSON Format:
{
  \"questions\": [
    {
    \"scenario\": \"50-word first-person scenario here. Avoid quotation marks, newlines, and special characters. Use single space between sentences. If dialogue is needed, use reported speech.\",
    \"choices\": [
      \"samplechoice1\",
      \"samplechoice2\",
      \"samplechoice3\",
      \"Not manipulation.\"
    ],
    \"correct_answer\": \"correctchoice.\"
  },
]
}`;

    try {
      setIsFormLoading(true);
      const res = await chatSession.sendMessage(prompt);
      return res.response.text();
    } catch (error) {
      console.error(error);
    } finally {
      setIsFormLoading(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (selectedManipulations.length < 3) {
      toast({
        description: "Select at least 3 manipulations as choices for the quiz",
        variant: "destructive",
      });
      return;
    }
    const quiz = await populateQuiz();
    const newTest = await createQuiz({ scenario_prompt: quiz });
    console.log(newTest);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col justify-center items-center gap-8 w-[70vw] ">
        <div className="flex flex-col gap-5">
          <Label htmlFor={"manipulations"} className="w-[70ch]">
            Choose the manipulations you want to be aware of:
          </Label>
          <div
            id="manipulations"
            className="flex gap-5 items-center justify-center flex-wrap w-[70ch]"
          >
            {manipulations.map((manipulation, index) => (
              <ManipulationCard
                key={index}
                manipulation={manipulation}
                isSelected={selectedManipulations.includes(manipulation.name)}
                onClick={handleManipulationClick}
              />
            ))}
          </div>
        </div>

        <div className="">
          {questions.map((question, index) => (
            <div key={index} className=" flex flex-col gap-2 mb-5">
              <Label htmlFor={`question-${index}`} className="w-[70ch]">
                {question}
              </Label>
              <Textarea
                required
                id={`question-${index}`}
                onChange={(e) => {
                  e.preventDefault();
                  setAnswers((prev) => {
                    const newAnswers = [...prev];
                    newAnswers[index] = e.target.value;
                    return newAnswers;
                  });
                }}
              />
            </div>
          ))}
        </div>

        <Button type="submit" className="w-[70ch]">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default OptionsForm;
