"use client";
import React from "react";
import Navbar from '../create/_components/Navbar'
import Slides from '../create/_components/Slides'
import SlideCard from '../create/_components/Slide'
import SlideEditor from '../create/_components/SlideEditor'
import { Slide, useSlides } from "../create/_components/slides.hook";

const EditSlidesPage = ({
  id,
  slides,
  name
}: {
  id: number,
  slides: Slide[],
  name?: string
}) => {
  const setSlides = useSlides((state) => state.setSlides);
  const setName = useSlides((state) => state.setName);
  React.useEffect(() => {
    setSlides(slides);
    setName(name || "");
  }, [name, setName, setSlides, slides]);
  return (
    <section className="w-full h-full min-h-screen">
      <div className="h-12 w-full border-b shadow-black shadow-sm bg-white fixed inset-x-0">
        <Navbar id={id}/>
      </div>
      <section className="w-full h-full grid grid-cols-12  min-h-screen pt-12">
        <div className="col-span-2 h-full">
          <Slides />
        </div>
        <div className="col-span-8 h-full">
          <SlideCard />
        </div>
        <div className="col-span-2 h-full">
          <SlideEditor />
        </div>
      </section>
    </section>
  );
};

export default EditSlidesPage;
