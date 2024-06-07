"use client";
import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";

const ReactCountDown = ({
  defaultTimer = 3,
  setLoading,
  className,
}: {
  defaultTimer?: number;
  setLoading?: (val: boolean) => void;
  className?: string;
}) => {
  const [counter, setCounter] = useState<number | string>("Ready");
  const [animation, setAnimation] = useState("");
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (!started) {
      setCounter("Ready?");
      setStarted(true);
      setTimeout(() => {
        setCounter(defaultTimer);
      }, 1000);
    }
  }, [counter, defaultTimer, started]);

  useEffect(() => {
    if (typeof counter !== "string" && counter > 1) {
      const timer = setInterval(() => {
        setCounter((prevCounter) => (prevCounter as number) - 1);
        setAnimation("pop-in");
        setTimeout(() => setAnimation(""), 500);
      }, 1000);

      return () => clearInterval(timer);
    } else if (typeof counter !== "string" && counter === 1 && started) {
      setTimeout(() => {
        setCounter("Let's begin");
      }, 1000);
    } else if (typeof counter === "string" && counter === "Let's begin") {
      setTimeout(() => {
        setLoading && setLoading(false);
      }, 1000);
    }
  }, [counter, setLoading, started]);

  const handleButtonClick = () => {
    if (!started) {
      setCounter("Ready?");
      setStarted(true);
      setTimeout(() => {
        setCounter(defaultTimer);
      }, 1000);
    }
  };

  return (
    <div
      className={cn(
        `h-screen w-full flex justify-center items-center bg-purple-500 ${
          animation || (counter === 0 && started) ? animation : animation
        }`,
        className
      )}
    >
      <h1 className="text-white text-8xl font-extrabold">{counter}</h1>
    </div>
  );
};

export default ReactCountDown;
