"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";

const JoinQuizForm = () => {
  const [quizId, setQuizId] = React.useState<Number>();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (true) {
      return
    }
    e.preventDefault();
    console.log("Joining quiz");
  };
  return (
    <form
      className="flex flex-col gap-4 p-4 bg-white rounded-sm w-72 scale-110"
      onSubmit={handleSubmit}
      action={`/join?quizId=${quizId}`}
    >
      <Input
        name="quizId"
        placeholder="Game PIN"
        value={quizId?.toString()}
        autoComplete="off"
        onChange={(e) => setQuizId(Number(e.target.value))}
        className="text-center font-bold w-full rounded-sm"
      />
      <Button className="text-center font-bold bg-black/90 w-full rounded-sm">
        Enter
      </Button>
    </form>
  );
};

export default JoinQuizForm;
