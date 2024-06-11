import { Slide } from "@/app/(protected)/questionset/create/_components/slides.hook";
import { cn, COLORS, SHAPES, TEXT_COLORS } from "@/lib/utils";
import { Check } from "lucide-react";
import React from "react";
import { FaCheck } from "react-icons/fa";

const AnswerFrequencyChart = ({
  questionType = "QUIZ",
  answers = [2, 1, 0, 0],
  total = 10,
  correctIndices = [0],
}: {
  questionType?: Slide["questionType"];
  answers?: number[];
  total?: number;
  correctIndices?: number[];
}) => {
  return (
    <div className={cn("max-w-3xl mx-auto h-64 flex w-full", questionType === "QUIZ" ? "gap-2": "gap-2 sm:gap-6")}>
      {answers.map((answer, ind) => {
        const currInd = questionType === "QUIZ" ? ind : ind;
        const Shape = SHAPES[currInd];
        return (
          <section
            key={`ANSWERS-${ind}`}
            className="w-full h-full flex-col-reverse flex "
          >
            <div
              className={cn(
                `flex gap-2 bg-white p-2 h-10 w-full items-center rounded-sm justify-center hover:opacity-85 mt-1`,
                `${COLORS[currInd]}`
              )}
            >
              <Shape size={30} className="text-white" fill="white" />{questionType}
            </div>
            <div
              className={cn(
                `flex gap-2 bg-white p-2 w-full items-center rounded-sm justify-center hover:opacity-85`,
                `${COLORS[currInd]}`
              )}
              style={{
                height: `${(answer / total) * 100}%`,
              }}
            />
            <div
              className={cn(
                `flex gap-2 bg-transparent p-2 h-10 w-full items-center justify-center hover:opacity-85`,
                `${
                  TEXT_COLORS[currInd]
                } font-extrabold text-2xl`
              )}
            >
              {(correctIndices.includes(ind)) && <FaCheck size={25} />} {answer}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default AnswerFrequencyChart;
