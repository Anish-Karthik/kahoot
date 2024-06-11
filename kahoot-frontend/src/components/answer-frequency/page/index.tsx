import {
  AnswerOptionsType,
  BaseSlide,
  Slide,
} from "@/app/(protected)/questionset/create/_components/slides.hook";
import React from "react";
import AnswerFrequencyChart from "../chart";
import { QuestionOptionsFrequency } from "@/components/QuestionOptions";

const AnswerFrequencyPage = ({
  slide = {
    question: "What is the capital of France?",
    answers: [
      { answer: "Paris", isCorrect: true },
      { answer: "London", isCorrect: false },
      { answer: "Berlin", isCorrect: false },
      { answer: "Madrid", isCorrect: false },
    ],
  },
  questionType = "QUIZ",
  answers = [2, 1, 0, 0],
  total = 10,
  correctIndices = [0],
}: {
  questionType?: Slide["questionType"];
  slide?: BaseSlide;
  answers?: number[];
  total?: number;
  correctIndices?: number[];
}) => {
  return (
    <section className="w-full h-screen flex flex-col px-2 gap-1 justify-between pb-5 pt-1">
      <div className="w-full bg-white !text-black py-2 px-1 rounded-md">
        <h1 className="text-2xl font-bold text-center !text-black">
          {slide.question}
        </h1>
      </div>
      <div>
        <h1 className="text-xl font-bold text-right !text-black">
          Not Attempted : {total - answers.reduce((a, b) => a + b, 0)}
        </h1>
        <AnswerFrequencyChart
          questionType={questionType}
          answers={answers}
          total={total}
          correctIndices={correctIndices}
        />
      </div>
      <div>
        <QuestionOptionsFrequency
          questionType="QUIZ"
          slide={slide}
          displayCorrect={true}
        />
      </div>
    </section>
  );
};

export default AnswerFrequencyPage;
