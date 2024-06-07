"use client";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <Link href={"/questionset/create"}>create QS</Link>
    </div>
  );
};

export default page;
