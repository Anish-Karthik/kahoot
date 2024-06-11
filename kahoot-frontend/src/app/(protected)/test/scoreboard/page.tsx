import Scoreboard from "@/components/scoreboard";
import React from "react";
import ReactCountDown from "../../quiz/_components/ReactCountDown";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <div className="w-full h-full relative">
      <div className="fixed top-2 right-2 flex w-full justify-end gap-3">
        <Button>Next</Button>
      </div>
      <Scoreboard />
    </div>
  );
};

export default page;
