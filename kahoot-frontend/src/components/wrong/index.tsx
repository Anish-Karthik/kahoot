import React from "react";
import "./wrong.css";
import { FaTimes } from "react-icons/fa";
const Wrong = ({ isAnswered }: { isAnswered: boolean }) => {
  return (
    <section className="section fixed z-50 inset-0 !bg-[#ff3355]">
      <div className="correct !mb-6 ">
        <h2 className="!text-4xl">{isAnswered ? "Wrong!" : "Time's Up!"}</h2>
      </div>
      <br />
      <div className="wrong">
        <FaTimes />
      </div>
      <br />
      {/* <div className="streak items-center !mb-3">
        <p className="!text-xl">Answer streak</p>
        <img src="/score/coin.png" alt="" />
      </div> */}
      <div className="points max-w-28 rounded-md !py-6">
        <p>+0</p>
      </div>
    </section>
  );
};

export default Wrong;
