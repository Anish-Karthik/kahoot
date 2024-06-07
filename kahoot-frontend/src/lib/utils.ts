import { Slide } from "@/app/(protected)/questionset/create/_components/slides.hook";
import { Question } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertSlideToQuestion = (slide: Slide): Question => {
  return {
    id: slide.id || -1,
    question: slide.question,
    // @ts-ignore
    questionType: slide.questionType,
    timeLimit: slide.timeLimit,
    // @ts-ignore
    points: slide.points,
    // @ts-ignore
    answerOptions: slide.answerOptions,
    options: slide.answers.map((answer) => answer.answer),
    correctAnswerIndices: slide.answers
      .map((ans, i) => (ans.isCorrect ? i : -1))
      .filter((index) => index !== -1),
    image: slide.image,
  };
};

export const convertQuestionToSlide = (question: Question): Slide => {
  return {
    id: question.id,
    question: question.question,
    questionType: question.questionType,
    timeLimit: question.timeLimit,
    points: question.points,
    answerOptions: question.answerOptions,
    answers: question.options.map((option, i) => {
      return {
        isCorrect: question.correctAnswerIndices?.includes(i),
        answer: option,
        imageUrl: undefined,
      };
    }),
    image: question.image || undefined,
  };
};

export const generateRandomCode = (size: number): string => {
  const chars = "0123456789";
  let code = "";
  for (let i = 0; i < size; i++) {
    const char =
      i == 0
        ? chars.charAt(Math.floor(Math.random() * chars.length))
        : chars.charAt(Math.ceil(Math.random() * chars.length - 1));
    code += char;
  }
  return code;
};
