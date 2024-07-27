"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { chatSession } from "@/utils/AIPrompts/AIGeminiModal";
import React, { useState } from "react";

const StartInterview = () => {
  const populateQuestions = async (e) => {
    e.preventDefault();
    const prompt = `
    Using JSON in an array, generate 3 brief, thought-provoking questions about a person's current relationship. Questions should:
    1. Explore the relationship's current status and dynamics;
    2. Uncover potential red flags or uncomfortable situations;
    3. Reveal concerns about progressing the relationship.
    Ensure questions are relatable, easy to understand, and encourage honest reflection. Combined answers should paint a clear picture of their current relationship scenario.
    JSON Format:
    {[quesion1, question2, question3]}
        `;

    try {
      const res = await chatSession.sendMessage(prompt);
      if (res) {
        console.log(res.response.text());
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-10 flex items-center justify-center">
      <Dialog>
        <DialogTrigger>
          <div className="p-16 py-12 rounded-md bg-secondary hover:shadow-lg cursor-pointer text-2xl font-bold">
            <h1>Start Quiz</h1>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-end gap-4">
            <DialogClose>
              <Button variant="secondary">Close</Button>
            </DialogClose>
            <Button variant="default" onClick={populateQuestions}>
              Start
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StartInterview;
