import AnswerFrequency from "@/components/answer-frequency/page";
import { Button } from "@/components/ui/button";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-full relative">
      <div className="fixed top-2 right-2 flex w-full justify-end gap-3">
        <Button
        // onClick={() => {
        //   setShowScoreBoard(false);
        //   renderQuestionClientOnly(currQuestion + 1);
        // }}
        >
          Next
        </Button>
      </div>
      <AnswerFrequency />
    </div>
  );
};

export default page;
