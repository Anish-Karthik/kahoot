"use client";
import React, { useState } from "react";
import dots from "/public/kebab-menu.jpg";
import Image from "next/image";
import edit from "/public/pen.jpg";
import trash from "/public/trash.jpg";
import useSWR, { useSWRConfig } from "swr";
import { QuestionSet, Quiz } from "@/types";
import { api } from "@/lib/axiosConfig";
import Link from "next/link";
import toast from "react-hot-toast";
import { generateRandomCode } from "@/lib/utils";
import { useRouter } from "next/navigation";

const Page = () => {
  const { data, error, isLoading } = useSWR<{
    data: QuestionSet[];
  }>("/questionset", api);
  if (isLoading) return <div>loading...</div>;
  if (error || !data) return <div>{JSON.stringify(error)}</div>;
  console.log(data);
  return (
    <section className="w-full h-full flex flex-col">
      <div className="bg-image fixed inset-0">
        <Image
          src="/background.png"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="mx-auto my-8 z-50 relative w-full flex items-center justify-center max-w-5xl">
        <h1 className="text-white font-extrabold text-4xl">Question Sets</h1>
        <Link href="/questionset/create" className="absolute right-0 top-0">
          <button className="bg-blue-600 hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded-md">
            Create Question Set
          </button>
        </Link>
      </div>
      <section className="w-full h-full flex flex-col max-w-5xl mx-auto gap-6">
        {data.data.map((q) => (
          <QuestionSetCard key={q.id} questionSet={q} />
        ))}
      </section>
    </section>
  );
};

export default Page;

const Popup = ({
  top,
  left,
  id,
}: {
  top: number;
  left: number;
  id: number;
}) => {
  const { mutate } = useSWRConfig();
  return (
    <div
      className="fixed flex-col bg-white p-4 rounded-lg z-50 w-48 h-28 shadow-color-500 shadow-md"
      style={{ top: top + 35, left: left - 90 }}
    >
      <div className="flex w-full hover:bg-gray-100" style={{ height: "40px" }}>
        <div
          className="relative top-1.5 left-1.5"
          style={{ width: "25px", height: "25px" }}
        >
          <Image alt="desc" src={edit} className="h-full w-full object-cover" />
        </div>
        <Link
          href={`/questionset/${id}`}
          className="text-gray-500 text-sm flex-grow align-item-center pl-7 pt-2"
        >
          Edit
        </Link>
      </div>

      <div
        className="flex w-full hover:bg-gray-100"
        style={{ height: "40px" }}
        onClick={async () => {
          try {
            const res = await api.delete(`/questionset/${id}`);
            console.log(res);
            mutate("/questionset");
            toast.success("Question Set Deleted");
          } catch (error) {
            console.log(error);
            toast.error("Error deleting question set");
          }
        }}
      >
        <div
          className="relative top-1.5 left-1.5"
          style={{ width: "25px", height: "25px" }}
        >
          <Image
            alt="desc"
            src={trash}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="text-gray-500 text-sm flex-grow align-item-center pl-7 pt-2">
          Delete
        </div>
      </div>
    </div>
  );
};

const QuestionSetCard = ({ questionSet }: { questionSet: QuestionSet }) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const router = useRouter();
  const handleDivClick = (event: any) => {
    if (popupVisible) {
      setPopupVisible(false);
    } else {
      const rect = event.target.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const popupHeight = 70;
      const popupTop = rect.bottom - 200;
      const popupLeft = Math.min(rect.left, window.innerWidth - 550);
      setPopupPosition({
        top: Math.min(popupTop, viewportHeight - popupHeight),
        left: popupLeft,
      });
      setPopupVisible(true);
    }
  };

  return (
    <div className="flex rounded-md  bg-white text-white p-2 h-36 shadow-color-500 shadow-md cursor-pointer transform hover:scale-105 transition-transform duration-300 w-full">
      <div className="w-44 h-32 bg-black relative  rounded-md">
        <Image
          className="rounded-md bg-slate-500"
          src={"/placeholder-questionset.png"}
          alt="Background"
          layout="fill"
        />
        <div
          className="relative top-1.5 left-1.5 text-xs bg-green-600 rounded-sm font-semibold text-white flex justify-center pt-1"
          style={{ width: "40px", height: "25px", letterSpacing: "0.025em" }}
        >
          Saved
        </div>
        <div
          className="absolute bottom-2.5 right-2.5 bg-gray-600 rounded-sm text-white text-xs pt-1.5 font-semibold px-1"
          style={{ height: "25px", letterSpacing: "0.025em" }}
        >
          {questionSet.questions.length} questions
        </div>
      </div>
      <div className="relative flex-grow bg-white">
        <div className="flex justify-around">
          <div
            className="absolute left-0 h-12 bg-white text-black pt-4 pl-4 font-semibold"
            style={{ letterSpacing: "0.025em" }}
          >
            {/* Enter Kahoot title... */}
            {questionSet.name || "Enter QuestionSet title..."}
          </div>
          <div
            className="absolute right-[-0.3em] top-0 hover:bg-gray-300 w-8 h-8 rounded"
            onClick={handleDivClick}
          >
            <div
              className="relative top-1.5 left-1.5 hover:bg-gray-300"
              style={{ width: "20px", height: "20px" }}
            >
              <Image
                src={dots}
                alt="Description"
                className="h-full w-full object-cover hover:bg-gray-300"
              />
            </div>
          </div>
          {popupVisible && (
            <Popup
              top={popupPosition.top}
              left={popupPosition.left}
              id={questionSet.id}
            />
          )}
        </div>
        <div className="flex justify-around">
          <div className="absolute left-0 bottom-0 w-40 h-8 text-black pl-4 text-gray-600 text-sm">
            {/* dineshbabud21cs */}
            public
          </div>
          <div className="absolute right-2 bottom-0 flex gap-2 h-8">
            <div className="w-24 h-16 text-gray-600 text-sm ">
              Apr 24,2024
              {/* created At */}
            </div>
            {/* <CreateQuiz questionSet={questionSet} /> */}
            <div
              // href={`/questionset/${questionSet.id}`}
              className=" h-8 bg-purple-600 hover:bg-purple-800 rounded-sm font-semibold text-sm flex w-full justify-center items-center"
              style={{ letterSpacing: "0.025px" }}
              onClick={async () => {
                try {
                  const quiz: Quiz = {
                    id: -1,
                    code: generateRandomCode(6),
                    questionSets: [
                      questionSet,
                    ],
                  }
                  const res: Quiz = (await api.post(`/quiz`, quiz)).data;
                  console.log(res);
                  toast.success("Quiz created successfully");
                  router.push(`/lobby?quizId=${res.id}&gameCode=${res.code}`);
                } catch (error) {
                  console.log(error);
                  toast.error("Error creating quiz");
                }
              }}
            >
              Host
            </div>
            <Link
              href={`/questionset/${questionSet.id}`}
              className=" h-8 bg-blue-600 hover:bg-blue-800 rounded-sm font-semibold text-sm flex w-full justify-center items-center"
              style={{ letterSpacing: "0.025px" }}
            >
              Edit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

// const CreateQuiz = ({ questionSet }: { questionSet: QuestionSet }) => {
//   return (
//     <Dialog>
//       <DialogTrigger>
//         <div className="h-8 bg-blue-600 hover:bg-blue-800 rounded-sm font-semibold text-sm flex w-full justify-center items-center">
//           Create Quiz
//         </div>
//       </DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Are you absolutely sure?</DialogTitle>
//           <DialogDescription>
//             This action cannot be undone. This will permanently delete your
//             account and remove your data from our servers.
//           </DialogDescription>
//         </DialogHeader>
//       </DialogContent>
//     </Dialog>
//   );
// };
