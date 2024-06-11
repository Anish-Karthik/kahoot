import { Slide } from "@/app/(protected)/questionset/create/_components/slides.hook";
import { cn, COLORS, SHAPES, TEXT_COLORS } from "@/lib/utils";
import { Check } from "lucide-react";
import React from "react";
import { FaCheck } from "react-icons/fa";

const AnswerFrequency = ({
  questionType = "QUIZ",
  answers = [2, 1, 0, 0],
  total = 10,
  correctIndex = 0,
}: {
  questionType?: Slide["questionType"];
  answers?: number[];
  total?: number;
  correctIndex?: number;
}) => {
  return (
    <div className="max-w-3xl mx-auto h-56 flex gap-2 w-full">
      {answers.map((answer, ind) => {
        const Shape = SHAPES[questionType === "QUIZ" ? ind : (ind + 1) % 2];
        const color = COLORS[questionType === "QUIZ" ? ind : (ind + 1) % 2];
        return (
          <section
            key={`ANSWERS-${ind}`}
            className="w-full h-full flex-col-reverse flex "
          >
            <div
              className={cn(
                `flex gap-2 bg-white p-2 h-10 w-full items-center justify-center hover:opacity-85 mt-1`,
                `${COLORS[questionType === "QUIZ" ? ind : (ind + 1) % 2]}`
              )}
            >
              <Shape size={30} className="text-white" fill="white" />
            </div>
            <div
              className={cn(
                `flex gap-2 bg-white p-2 w-full items-center justify-center hover:opacity-85`,
                `${COLORS[questionType === "QUIZ" ? ind : (ind + 1) % 2]}`
              )}
              style={{
                height: `${(answer / total) * 100}%`,
              }}
            />
            <div
              className={cn(
                `flex gap-2 bg-white p-2 h-10 w-full items-center justify-center hover:opacity-85`,
                `${
                  TEXT_COLORS[questionType === "QUIZ" ? ind : (ind + 1) % 2]
                } font-extrabold text-2xl`
              )}
            >
              {correctIndex === ind && <FaCheck size={25} />} {answer}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default AnswerFrequency;
