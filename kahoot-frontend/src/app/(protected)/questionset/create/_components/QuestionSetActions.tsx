"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { Slide, useSlides } from "./slides.hook";
import { api } from "@/lib/axiosConfig";
import { Question, QuestionSet } from "@/types";
import toast from "react-hot-toast";
import axios from "axios";
import { convertQuestionToSlide, convertSlideToQuestion } from "@/lib/utils";
import { useRouter } from "next/navigation";

const QuestionSetActions = ({ id }: { id?: number }) => {
  const validateAll = useSlides((state) => state.validateAllSlides);
  const slides = useSlides((state) => state.slides);
  const name = useSlides((state) => state.name);
  const router = useRouter();
  console.log(slides)
  console.log(id);
  const questionSet: QuestionSet = {
    id: id || -1,
    name: name,
    questions: slides.map<Question>((slide) => convertSlideToQuestion(slide)),
  };
  return (
    <div className="flex py-2 gap-2">
      <Button
        className="text-center font-bold bg-gray-100 hover:bg-gray-200 text-black/90 w-20 rounded-sm shadow-sm"
        onClick={() => {
          router.push("/questionset");
        }}
      >
        Exit
      </Button>
      <Button
        className="text-center font-bold bg-gray-200 hover:bg-gray-300 text-black/90 w-20 rounded-sm shadow-sm"
        onClick={async () => {
          const isValid = validateAll();
          if (isValid) {
            try {
              const res = !id
                ? await api.post("/questionset", questionSet)
                : await api.put(`/questionset/${id}`, questionSet);
              console.log(questionSet)
              const newQuestionSet: QuestionSet = res.data;
              console.log(newQuestionSet);
              toast.success("Question set saved successfully");
              router.push(`/questionset/${newQuestionSet.id}`);
            } catch (error) {
              console.error(error);
              console.log(error);
              toast.error("Failed to save question set");
            }
          } else {
            toast.error("Some questions are invalid");
          }
        }}
      >
        Save
      </Button>
    </div>
  );
};

export default QuestionSetActions;
