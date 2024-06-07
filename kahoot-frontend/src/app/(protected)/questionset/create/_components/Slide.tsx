"use client";
import React from "react";
import { Answer, QuestionType, useSlides } from "./slides.hook";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Circle,
  Triangle,
  Square,
  Diamond,
  LucideProps,
  Check,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
const SHAPES = [Triangle, Diamond, Circle, Square];
const COLORS = ["bg-red-600", "bg-blue-600", "bg-yellow-600", "bg-green-600"];
const Slide = () => {
  const ind = useSlides((state) => state.currentSlideIndex);
  const slide = useSlides((state) => state.slides[ind]);
  const actions = useSlides((state) => state.currentSlideActions);
  return (
    <div className={"flex h-full w-full gap-1 !text-xl"}>
      <article
        className={"flex flex-col gap-6 bg-gray-100 px-2 w-full h-full pt-6"}
      >
        <div className={"w-full"}>
          <Input
            className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent text-center text-2xl !py-6"
            type="text"
            placeholder="Question"
            value={slide.question}
            onChange={(e) => actions.setQuestion(e.target.value)}
          />
        </div>
        <div className="w-full flex justify-center">
          <div className=" border-dashed px-2 py-1 border-2">
            <Image
              src={slide.image || "/placeholder.jpg"}
              alt={slide.question}
              width={slide.questionType === "QUIZ" ? 250 : 350}
              height={slide.questionType === "QUIZ" ? 250 : 350}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {slide.answers.map((answer, ind) => (
            <OptionBar
              ind={ind}
              key={ind}
              questionType={slide.questionType}
              answer={answer}
              shape={
                SHAPES[slide.questionType === "QUIZ" ? ind : (ind + 1) % 2]
              }
              color={
                COLORS[slide.questionType === "QUIZ" ? ind : (ind + 1) % 2]
              }
            />
          ))}
        </div>
      </article>
    </div>
  );
};

export default Slide;

export const OptionBar = ({
  answer,
  shape: Shape,
  color,
  questionType,
  ind,
}: {
  answer: Answer;
  shape: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  color: string;
  questionType: QuestionType;
  ind: number;
}) => {
  const currentSlideIndex = useSlides((state) => state.currentSlideIndex);
  const currentSlide = useSlides((state) => state.slides[currentSlideIndex]);
  const currentQuestionActions = useSlides(
    (state) => state.currentSlideActions
  );
  const flag = answer.imageUrl || answer.answer.length > 0;
  console.log(answer.imageUrl || answer.answer.length > 0);
  return (
    <div
      className={cn(
        `flex gap-2 bg-white p-2 rounded-md h-28 `,
        flag && `${color}`
      )}
    >
      <div
        className={`w-10 ${color} rounded-sm flex items-center justify-center`}
      >
        <Shape size={30} className="text-white" fill="white" />
      </div>
      <div className="w-full flex flex-col justify-center">
        {questionType === "QUIZ" && (
          <Textarea
            //  focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
            className={cn(
              "focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent border-none",
              (answer.imageUrl || answer.answer.length > 0) &&
                `${color} text-white`
            )}
            value={answer.answer}
            rows={Math.ceil(answer.answer.length / 30)}
            onChange={(e) =>
              currentQuestionActions.setAnswerText(ind, e.target.value)
            }
            placeholder={"Answer"}
          />
        )}
        {questionType === "TRUE_OR_FALSE" && <p>{answer.answer}</p>}
      </div>
      {flag && (
        <div
          className={cn(
            "!w-12 !h-10 rounded-full border-3 border-white flex items-center justify-center my-auto hover:cursor-pointer",
            currentSlide.answers[ind].isCorrect && "bg-green-500"
          )}
          onClick={() => currentQuestionActions.toggleAnswerCorrect(ind)}
        >
          {currentSlide.answers[ind].isCorrect && (
            <Check size={20} className="font-extrabold text-white" />
          )}
        </div>
      )}
    </div>
  );
};
