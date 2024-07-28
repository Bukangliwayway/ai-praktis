"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";

const OptionsForm = ({ questions }) => {
  const [answers, setAnswers] = useState([]);
  const [manipulations, setManipulations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchManipulations = async () => {
      try {
        const res = await fetch("/api/manipulations");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setManipulations(data);
      } catch (error) {
        console.error("Error fetching manipulations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchManipulations();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(answers);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col justify-center items-center gap-1.5 w-[70vw] ">
        <div className="flex gap-5 items-center justify-center flex-wrap">
          {manipulations.map((manipulation, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-2 cursor-pointer p-4 hover:shadow relative  overflow-hidden group bg-cover bg-center h-[45vh] w-[20vw] rounded-sm"
              style={{
                backgroundImage: `url(${manipulation.image_link})`,
              }}
            >
              <div className="absolute inset-0 bg-black opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
              <div className="relative z-10 text-center h-[30vh]">
                <h1 className="text-white font-bold text-lg mb-2">
                  {manipulation.name}
                </h1>
                <p className="text-white font-ligh w-[25ch] text-xs">
                  {manipulation.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
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
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default OptionsForm;
