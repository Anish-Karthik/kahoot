import { api } from "@/lib/axiosConfig";
import { Question, QuestionSet, Quiz } from "@/types";
import React from "react";
import RenderClient from "./_components/RenderClient";
import { convertQuestionToSlide } from "@/lib/utils";
import { Slide } from "../questionset/create/_components/slides.hook";

const page = async ({
  searchParams,
}: {
  searchParams: { quizId: number; gameCode: string };
}) => {
  const data = await api.get(`/quiz/${searchParams.quizId}`);
  console.log(data);
  const quiz: Quiz = data.data;
  const questionSets: QuestionSet[] = quiz.questionSets;
  // merge questions from Questions into a single array
  const questions: Question[] = questionSets
    .map((question) => question.questions)
    .flat();
  const slides: Slide[] = questions.map(convertQuestionToSlide);
  console.log(questions);
  return (
    <div className="h-full w-full">
      <RenderClient questions={slides} />
    </div>
  );
};

export default page;
