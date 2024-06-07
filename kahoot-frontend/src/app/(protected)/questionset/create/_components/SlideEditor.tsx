"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  AnswerOptionsTypeOptions,
  CurrentSlideActions,
  CurrentSlideSettingActions,
  PointTypeOptions,
  QuestionTypeOptions,
  Slide,
  SlideSettings,
  useSlides,
} from "./slides.hook";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

type FieldType = {
  field: keyof SlideSettings;
  setField: keyof CurrentSlideSettingActions;
  options: SlideSettings[keyof SlideSettings][];
};

const slideSetting: FieldType[] = [
  {
    field: "questionType",
    setField: "setQuestionType",
    options: QuestionTypeOptions,
  },
  {
    field: "timeLimit",
    setField: "setTimeLimit",
    options: [5, 10, 20, 30, 50, 60, 90, 120, 150, 180],
  },
  {
    field: "points",
    setField: "setPoints",
    options: PointTypeOptions,
  },
  {
    field: "answerOptions",
    setField: "setAnswerOptions",
    options: AnswerOptionsTypeOptions,
  },
];

const SlideEditor = () => {
  return (
    <div className="w-full h-full min-h-full flex flex-col justify-between gap-2 py-4">
      <section className="flex flex-col w-full">
        <div className="w-full flex flex-col p-4 gap-5">
          <SettingElement {...slideSetting[0]} />
        </div>
        <Separator className="w-[90%] mx-auto" />
        <div className="w-full flex flex-col p-4 gap-5">
          {slideSetting.slice(1).map((setting, i) => (
            <SettingElement key={i} {...setting} />
          ))}
        </div>
      </section>
      <SlideActions />
    </div>
  );
};

const SlideActions = () => {
  const removeCurrentSlide = useSlides((state) => state.removeCurrentSlide);
  const duplicateCurrentSlide = useSlides(
    (state) => state.duplicateCurrentSlide
  );
  return (
    <div className="flex w-full justify-evenly">
      <Button
        variant={"ghost"}
        className=" font-bold rounded-sm"
        onClick={removeCurrentSlide}
      >
        Delete
      </Button>
      <Button
        variant={"outline"}
        className=" font-bold rounded-sm"
        onClick={duplicateCurrentSlide}
      >
        Duplicate
      </Button>
    </div>
  );
};

const SettingElement = ({ field, setField, options }: FieldType) => {
  const ind = useSlides((state) => state.currentSlideIndex);
  const state = useSlides((s) => s.slides[ind][field]);
  const setState = useSlides((s) => s.currentSlideActions[setField]);
  console.log(state);
  return (
    <div className="flex flex-col gap-2">
      <Label className="font-bold">{field}</Label>
      <Select
        value={state as string}
        onValueChange={(v) => {
          console.log(v);
          // @ts-ignore
          setState(v);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder={state}></SelectValue>
        </SelectTrigger>
        <SelectContent>
          {options.map((option, i) => (
            <SelectItem
              // @ts-ignore
              value={option}
              key={i}
              onChange={() => {
                console.log("sdfsd");
                // @ts-ignore
                setState(option);
              }}
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SlideEditor;
