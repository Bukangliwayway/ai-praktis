import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const InputAnswer = ({ onChange }) => {
  return (
    <div>
      <Label htmlFor={`nani`} className="w-[70ch]">
        nani{" "}
      </Label>
      <Textarea
        required
        id={`nani`}
        onChange={(e) => {
          e.preventDefault();
          onChange(e.target.value);
        }}
      />
    </div>
  );
};

export default InputAnswer;
