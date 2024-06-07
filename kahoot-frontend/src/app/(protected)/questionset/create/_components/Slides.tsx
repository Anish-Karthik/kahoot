"use client";
import React from "react";
import { Slide, useSlides } from "./slides.hook";
import { Copy, Trash } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Slides = () => {
  const slides = useSlides((state) => state.slides);
  const addDefaultSlide = useSlides((state) => state.addDefaultSlide);
  return (
    <div className="flex flex-col items-center gap-2 max-h-screen overflow-y-auto">
      <div className="flex flex-col max-h-[85vh] overflow-y-auto w-full">
        {slides.map((slide, ind) => (
          <SlideMiniCard key={slide.id} slide={slide} ind={ind} />
        ))}
      </div>
      <div className="">
        <Button
          className="bg-blue-800 font-bold rounded-sm"
          onClick={() => addDefaultSlide()}
        >
          Add Question
        </Button>
      </div>
    </div>
  );
};

export default Slides;

const SlideMiniCard = ({ slide, ind }: { slide: Slide; ind: number }) => {
  const duplicateSlide = useSlides((state) => state.duplicateSlide);
  const removeSlide = useSlides((state) => state.removeSlide);
  const setCurrentSlide = useSlides((state) => state.setCurrentSlide);
  const currentSlide = useSlides((state) => state.currentSlideIndex);
  const isValidSlide = useSlides(
    (state) => state.currentSlideActions.isValidSlide
  );

  return (
    <div
      className={cn(
        "flex w-full p-4 gap-1",
        currentSlide == ind && "bg-blue-100"
      )}
      onClick={() => setCurrentSlide(ind)}
    >
      <div className="flex flex-col justify-end items-center gap-2">
        <div
          className="rounded-full hover:bg-gray-200/80 cursor-pointer text-black/50 scale-75"
          onClick={() => duplicateSlide(ind)}
        >
          <Copy />
        </div>
        <div
          className="rounded-full hover:bg-gray-200/80 cursor-pointer text-black/50 scale-75"
          onClick={() => removeSlide(ind)}
        >
          <Trash />
        </div>
      </div>

      <section className="w-full">
        <h6 className="font-semibold text-black/90">
          {ind + 1}
          {". "}
          {slide.questionType.toLowerCase()}
        </h6>
        <article
          className={cn(
            "rounded-md flex flex-col gap-2 bg-gray-100 px-2 py-2 relative",
            currentSlide == ind
              ? "border-4 border-blue-700 !p-1"
              : "hover:border-4 hover:!p-1"
          )}
        >
          {!isValidSlide(ind) && (
            <div className="absolute inset-y-0 -right-4 flex-col flex justify-center">
              <div className="w-6 h-6 bg-purple-800 text-white rounded-full flex items-center justify-center my-auto">
                <p>!</p>
              </div>
            </div>
          )}
          <p className="text-center w-full text-sm font-semibold text-black/50">
            {slide.question || "Question"}
          </p>
          <div className="w-full flex justify-between">
            <div className="rounded-full bg-white border w-7 h-7 text-xs flex items-center justify-center mt-1">
              <div>{slide.timeLimit}</div>
            </div>
            <div className=" border-dashed px-2 py-1 border-2">
              <Image
                src={slide.image || "/placeholder.jpg"}
                alt={slide.question}
                width={30}
                height={30}
              />
            </div>
            <div className="w-7 h-7"></div>
          </div>
          <div
            className={cn(
              "grid grid-cols-2 gap-2 scale-y-50",
              slide.questionType === "QUIZ" ? "-mb-2" : ""
            )}
          >
            {slide.answers.map((answer, ind) => (
              <div
                key={ind}
                className="rounded-sm !w-full bg-white flex justify-end items-center text-transparent p-1 border"
              >
                <div
                  className={cn(
                    "w-1 h-2 rounded-full",
                    answer.isCorrect ? "bg-green-500" : "text-transparent"
                  )}
                >
                  {"_ "}
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
};
