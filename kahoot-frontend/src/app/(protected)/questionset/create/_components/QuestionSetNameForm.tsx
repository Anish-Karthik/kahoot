"use client";

import React from "react";
import { useSlides, validateName } from "./slides.hook";
import { Input } from "@/components/ui/input";

const QuestionSetNameForm = () => {
  const name = useSlides((state) => state.name);
  const setName = useSlides((state) => state.setName);
  const isValid = validateName(name);
  return (
    <div className="relative z-50">
      {!isValid && <div className="absolute inset-y-0 -right-4 flex-col flex justify-center">
        <div className="w-6 h-6 bg-purple-800 text-white rounded-full flex items-center justify-center my-auto">
          <p>!</p>
        </div>
      </div>}
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Set Name"
        className="w-80"
      />
    </div>
  );
};

export default QuestionSetNameForm;
