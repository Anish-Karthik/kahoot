import {
  BaseSlide,
  Slide,
} from "@/app/(protected)/questionset/create/_components/slides.hook";
import { cn, COLORS, SHAPES } from "@/lib/utils";
import { FaCheck } from "react-icons/fa";
export function QuestionOptions({
  submitAnswer,
  slide,
  innerClassName,
  size,
}: {
  submitAnswer?: (ind: number) => void;
  slide: Slide;
  innerClassName?: string;
  size?: number;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {slide.answers.map((answer, ind) => {
        const Shape =
          SHAPES[slide.questionType === "QUIZ" ? ind : (ind + 1) % 2];
        const color =
          COLORS[slide.questionType === "QUIZ" ? ind : (ind + 1) % 2];
        return (
          <button
            key={ind}
            onClick={() => {
              console.log(answer);
              submitAnswer && submitAnswer(ind);
            }}
            className={cn(
              `flex gap-2 bg-white p-2 rounded-md h-48 w-full items-center justify-center cursor-pointer hover:opacity-85`,
              innerClassName,
              `${COLORS[slide.questionType === "QUIZ" ? ind : (ind + 1) % 2]}`
            )}
          >
            <Shape size={size || 100} className="text-white" fill="white" />
          </button>
        );
      })}
    </div>
  );
}

export function QuestionOptionsFrequency({
  slide,
  questionType,
  displayCorrect = false,
  innerClassName,
  size,
}: {
  slide: BaseSlide;
  questionType: Slide["questionType"];
  displayCorrect?: boolean;
  innerClassName?: string;
  size?: number;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {slide.answers.map((answer, ind) => {
        const Shape = SHAPES[questionType === "QUIZ" ? ind : (ind + 1) % 2];
        const color = COLORS[questionType === "QUIZ" ? ind : (ind + 1) % 2];
        return (
          <div
            key={ind}
            className={cn(
              `flex gap-2 bg-white p-2 rounded-md h-24 md:h-32 w-full justify-between items-center cursor-pointer hover:opacity-85`,
              innerClassName,
              `${COLORS[questionType === "QUIZ" ? ind : (ind + 1) % 2]}`
            )}
          >
            <div className="flex w-full items-center gap-2">
              <Shape size={size || 40} className="text-white" fill="white" />
              <p className="text-white">{answer.answer}</p>
            </div>
            {displayCorrect && answer.isCorrect && (
              <FaCheck
                size={20}
                className={`text-white font-extrabold opacity-75 sm:mr-4 sm:scale-125 md:mr-10 md:scale-150`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
