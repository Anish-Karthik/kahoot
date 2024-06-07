"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useParams, useSearchParams } from "next/navigation";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import "./index.css";
import { getRandomImage, images } from "@/lib/images";
import toast from "react-hot-toast";
import { Edit } from "lucide-react";
import { ImageForm } from "../_components/image-form";
import { AdvancedChatMessage, MessageType, Question, Receiver } from "@/types";
import {
  Circle,
  Triangle,
  Square,
  Diamond,
  LucideProps,
  Check,
} from "lucide-react";
import { Slide } from "@/app/(protected)/questionset/create/_components/slides.hook";
import { OptionBar } from "@/app/(protected)/questionset/create/_components/Slide";
import { cn, convertQuestionToSlide } from "@/lib/utils";
const SHAPES = [Triangle, Diamond, Circle, Square];
const COLORS = ["bg-red-600", "bg-blue-600", "bg-yellow-600", "bg-green-600"];
enum ContentType {
  NOT_STARTED = "NOT_STARTED",
  QUESTION = "QUESTION",
  ANSWER = "ANSWER",
  LEADERBOARD = "LEADERBOARD",
  VERDICT = "VERDICT",
  CONTENT = "CONTENT",
}

const ChatRoom: React.FC = () => {
  const searchParams = useSearchParams();
  const username = searchParams.get("username") || "";
  const [imageUrl, setImageUrl] = useState<string>(images[0]);
  const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [contentType, setContentType] = useState<ContentType>(
    ContentType.NOT_STARTED
  );
  const [content, setContent] = useState<React.JSX.Element>();
  const gameCode = searchParams.get("quizId") || "";

  console.log(gameCode);
  console.log(username);
  console.log(stompClient);
  useEffect(() => {
    const connect = () => {
      console.log("Connecting to chat room...");
      if (username.trim() && gameCode) {
        toast.loading("Connecting to room...");
        const socket = new SockJS("http://localhost:8080/ws");
        const client = Stomp.over(socket);
        client.connect(
          {},
          () => {
            setStompClient(client);
            toast.remove();
            toast.success("Connected to room");
            console.log("Connected");
            setConnected(true);
            // client.subscribe(`/room/${gameCode}`, onMessageReceived);
            console.count("Connected to room");
            client.subscribe(
              `/room/${gameCode}/quiz`,
              (message: Stomp.Message) => {
                const msg: AdvancedChatMessage = JSON.parse(message.body);
                const reciever = msg.receiver;
                console.log("Reciever", reciever);
                console.log("Reciever", Receiver.HOST);
                if (reciever == Receiver.HOST) {
                  return;
                }
                console.log(msg);
                switch (msg.type) {
                  case MessageType.ANSWER:
                    console.log(msg);
                    setContentType(ContentType.VERDICT);
                    setContent(
                      <div className="flex flex-col gap-2 w-screen h-screen">
                        <div className="player" key={username}>
                          <div className="relative">
                            <img src={imageUrl} alt={username} />
                          </div>
                          <p>{username}</p>
                        </div>
                        <h2>
                          your score {msg.verdict!.score} answer is{" "}
                          {msg.verdict!.correct ? "correct" : "incorrect"}
                        </h2>
                      </div>
                    );
                    break;
                  case MessageType.QUESTION:
                    console.log(client);
                    console.log(msg);
                    console.log();
                    setContentType(ContentType.QUESTION);
                    setTimeout(() => {
                      if (contentType === "QUESTION") {
                        console.log("Submit answer", -1);
                        const answer: Partial<AdvancedChatMessage> = {
                          type: MessageType.ANSWER,
                          sender: {
                            username: username,
                            imageUrl: imageUrl,
                          },
                          answerIndex: -1,
                          receiver: Receiver.PLAYER,
                        };
                        client?.send(
                          `/app/chat/${gameCode}/answer`,
                          {},
                          JSON.stringify(answer)
                        );
                      }
                    }, (msg.question!.timeLimit / 4) * 1000);
                    setContent(
                      <QuestionOptions
                        slide={convertQuestionToSlide(msg.question!)}
                        submitAnswer={(ind: number) => {
                          console.log("Submit answer", ind);
                          const answer: Partial<AdvancedChatMessage> = {
                            type: MessageType.ANSWER,
                            sender: {
                              username: username,
                              imageUrl: imageUrl,
                            },
                            answerIndex: ind,
                            receiver: Receiver.PLAYER,
                          };
                          console.log(client);
                          client?.send(
                            `/app/chat/${gameCode}/answer`,
                            {},
                            JSON.stringify(answer)
                          );
                        }}
                        questionInd={msg.questionIndex!}
                      />
                    );
                    break;
                  case MessageType.START:
                  case MessageType.GET_READY:
                    setContentType(ContentType.CONTENT);
                    setContent(<h1>Get ready!</h1>);
                    break;
                  case MessageType.NEXT:
                    break;
                  case MessageType.LEADERBOARD:
                    break;
                  default:
                    console.log("Unknown message type", msg);
                }
              }
            );
            client.send(
              `/app/chat/${gameCode}/addUser`,
              {},
              JSON.stringify({
                type: "JOIN",
                sender: {
                  username: username,
                  imageUrl: imageUrl,
                },
              })
            );
          },
          (error) => {
            toast.remove();
            toast.error("Error connecting to room");
            console.error("Error connecting:", error);
          }
        );
      }
    };
    const disconnect = () => {
      if (stompClient) {
        stompClient.disconnect(() => {
          // alert("Disconnected");
          console.log("Disconnected");
        });
        console.log("Disconnected");
      }
    };
    console.log(stompClient);
    connect();
    console.log(stompClient);
    return () => {
      disconnect();
    };
  }, [gameCode]);

  useEffect(() => {
    console.log("Connected", connected);
    console.log("StompClient", stompClient);
  }, [connected, stompClient]);
  console.log(stompClient);

  // const quizEvents = ;

  const RenderPage = () => {
    switch (contentType) {
      case ContentType.NOT_STARTED:
        return (
          <div className="player" key={username}>
            <div className="relative">
              <ImageForm
                imageUrl={imageUrl}
                onImageChange={(newImageUrl: string) => {
                  console.log(newImageUrl);
                  setImageUrl(newImageUrl);
                  stompClient?.send(
                    `/app/chat/${gameCode}/updateUser`,
                    {},
                    JSON.stringify({
                      type: "UPDATE",
                      sender: {
                        username: username,
                        imageUrl: newImageUrl,
                      },
                    })
                  );
                }}
              >
                <div className="absolute top-0 right-0 w-8 h-8 bg-white rounded-full cursor-pointer">
                  <Edit className="w-6 h-6 m-1" />
                </div>
              </ImageForm>
              <img src={imageUrl} alt={username} />
            </div>
            <p>{username}</p>
          </div>
        );
      default:
        return content;
    }
  };

  return (
    <div className="lobby-container flex w-full h-full items-center justify-center z-50">
      {RenderPage()}
    </div>
  );
};
export default ChatRoom;

function QuestionOptions({
  submitAnswer,
  slide,
  questionInd = 0,
}: {
  submitAnswer: (ind: number) => void;
  slide: Slide;
  questionInd?: number;
}) {
  return (
    <div className="w-full h-full">
      <div className="w-full text-center py-4 mb-4 text-2xl text-white">
        Question No: {questionInd + 1}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {slide.answers.map((answer, ind) => {
          const Shape =
            SHAPES[slide.questionType === "QUIZ" ? ind : (ind + 1) % 2];
          const color =
            COLORS[slide.questionType === "QUIZ" ? ind : (ind + 1) % 2];
          return (
            <button
              key={ind}
              onClick={() => {
                console.log(answer);
                submitAnswer(ind);
              }}
              className={cn(
                `flex gap-2 bg-white p-2 rounded-md h-48 w-full items-center justify-center cursor-pointer hover:opacity-85`,
                `${COLORS[slide.questionType === "QUIZ" ? ind : (ind + 1) % 2]}`
              )}
            >
              <Shape size={100} className="text-white" fill="white" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
