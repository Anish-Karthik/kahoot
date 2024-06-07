import React from "react";
import Slide from "./_components/Slide";
import Navbar from "./_components/Navbar";
import Slides from "./_components/Slides";
import SlideEditor from "./_components/SlideEditor";

const page = () => {
  return (
    <section className="w-full h-full min-h-screen">
      <div className="h-12 w-full border-b shadow-black shadow-sm bg-white fixed inset-x-0">
        <Navbar />
      </div>
      <section className="w-full h-full grid grid-cols-12  min-h-screen pt-12">
        <div className="col-span-2 h-full">
          <Slides />
        </div>
        <div className="col-span-8 h-full">
          <Slide />
        </div>
        <div className="col-span-2 h-full">
          <SlideEditor />
        </div>
      </section>
    </section>
  );
};

export default page;
