"use client";
import React from "react";
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
import {
  Answer,
  QuestionType,
  Slide,
} from "@/app/(protected)/questionset/create/_components/slides.hook";
const SHAPES = [Triangle, Diamond, Circle, Square];
const COLORS = ["bg-red-600", "bg-blue-600", "bg-yellow-600", "bg-green-600"];

const DisplaySlide = ({ slide }: { slide: Slide }) => {
  return (
    <div className={"flex h-full w-full gap-1 !text-xl !font-bold"}>
      <article className={"flex flex-col gap-6 px-2 w-full h-full pt-6"}>
        <div className={"w-full"}>
          <h1 className={"text-center text-2xl !py-6"}>{slide.question}</h1>
        </div>
        <div className="w-full flex justify-center">
          <Image
            src={slide.image || "/placeholder.jpg"}
            alt={slide.question}
            width={slide.questionType === "QUIZ" ? 250 : 350}
            height={slide.questionType === "QUIZ" ? 250 : 350}
          />
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

export default DisplaySlide;

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
          <p className="text-center">{answer.answer}</p>
        )}
        {questionType === "TRUE_OR_FALSE" && <p>{answer.answer}</p>}
      </div>
    </div>
  );
};
