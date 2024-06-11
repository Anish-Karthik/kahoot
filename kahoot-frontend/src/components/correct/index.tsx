import "./index.css";
import { FaCheck } from "react-icons/fa";

import React from "react";

const Correct = ({
  score,
  answerStreak = false,
}: {
  score: number;
  answerStreak: boolean;
}) => {
  return (
    <section className="section fixed z-50 inset-0 !bg-[#66bf39]">
      <div className="correct !mb-6 ">
        <h2 className="!text-4xl">Correct!</h2>
      </div>
      <br />
      <div className="tick">
        <FaCheck />
      </div>
      <br />
      {answerStreak && (
        <div className="streak items-center !mb-3">
          <p className="!text-xl">Answer streak</p>
          <img src="/score/coin.png" alt="" />
        </div>
      )}
      <div className="points max-w-28 rounded-md !py-6">
        <p>+{score}</p>
      </div>
    </section>
  );
};

export default Correct;
