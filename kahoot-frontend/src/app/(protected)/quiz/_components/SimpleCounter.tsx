"use client";

import React from "react";

const SimpleCounter = ({
  onSuccess,
  timer = 60,
}: {
  timer?: number;
  onSuccess?: () => void;
}) => {
  const [counter, setCounter] = React.useState(timer);

  // Third Attempts
  React.useEffect(() => {
    const timer =
      counter > 0 ? setInterval(() => setCounter(counter - 1), 1000) : -1;
    if (counter === 0) {
      onSuccess && onSuccess();
    }
    return () => clearInterval(timer);
  }, [counter]);

  return <>{counter}</>;
};

export default SimpleCounter;
