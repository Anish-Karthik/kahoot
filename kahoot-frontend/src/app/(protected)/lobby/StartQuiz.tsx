"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";

const StartQuiz = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <button
      className="start"
      onClick={async () => {
        router.push("/quiz", {
          query: {
            quizId: searchParams.get("quizId"),
            gameCode: searchParams.get("gameCode"),
          },
        });
      }}
    >
      Start
    </button>
  );
};

export default StartQuiz;
