"use client";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";

const UserExplanation = ({ onChange, textValue }) => {
  const [voice, setVoice] = useState(true);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    if (interimResult) {
      onChange(interimResult);
    }
  }, [interimResult]);

  return (
    <div>
      {!error && (
        <div className="flex items-center space-x-2">
          <Switch
            id="voice-mode"
            checked={!voice}
            onCheckedChange={() => {
              setVoice(!voice);
              stopSpeechToText();
            }}
          />
          <Label htmlFor="voice-mode">Switch to Audio Record</Label>
        </div>
      )}
      {voice ? (
        <div>
          <Label htmlFor={`explanation`} className="w-[70ch]">
            Input your Explanation to Justify your Choice
          </Label>
          <Textarea
            required
            id={`explanation`}
            onChange={(e) => {
              e.preventDefault();
              onChange(e.target.value);
            }}
            value={textValue}
          />
        </div>
      ) : (
        !error && (
          <div className="">
            <h1>Recording: {isRecording.toString()}</h1>
            <button
              onClick={isRecording ? stopSpeechToText : startSpeechToText}
            >
              {isRecording ? "Stop Recording" : "Start Recording"}
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default UserExplanation;
