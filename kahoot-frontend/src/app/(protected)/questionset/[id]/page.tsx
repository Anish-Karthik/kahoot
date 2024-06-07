import { api } from "@/lib/axiosConfig";
import React from "react";
import EditSlidesPage from "./EditSlidesPage";
import { QuestionSet } from "@/types";
import { convertQuestionToSlide } from "@/lib/utils";
import { Slide } from "../create/_components/slides.hook";

const page = async ({ params }: { params: { id: number } }) => {
  try {
    const data: QuestionSet = (await api.get(`/questionset/${params.id}`)).data;
    console.log(data);
    const slides: Slide[] = data.questions.map((question) =>
      convertQuestionToSlide(question)
    );

    return <EditSlidesPage slides={slides} id={data.id} name={data.name} />;
  } catch (error) {
    console.log(error);
    return <div>Error</div>;
  }
};

export default page;
