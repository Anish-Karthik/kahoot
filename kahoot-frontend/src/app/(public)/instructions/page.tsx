"use client";
import ReactCountDown from "@/app/(protected)/quiz/_components/ReactCountDown";
import Correct from "@/components/correct";
import { QuestionOptions } from "@/components/QuestionOptions";
import Wrong from "@/components/wrong";
import { images } from "@/lib/images";
import { convertQuestionToSlide } from "@/lib/utils";
import {
  AdvancedChatMessage,
  MessageType,
  QuestionType,
  Receiver,
} from "@/types";
import { Edit } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { ImageForm } from "../_components/image-form";
import "./index.css";

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
  const router = useRouter();

  console.log(gameCode);
  console.log(username);
  console.log(stompClient);
  useEffect(() => {
    const connect = () => {
      console.log("Connecting to chat room...");
      if (username.trim() && gameCode) {
        toast.loading("Connecting to room...");
        const socket = new SockJS(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/ws`
        );
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
                      msg.verdict!.correct ? (
                        <Correct
                          answerStreak={true}
                          score={msg.verdict!.score}
                        />
                      ) : (
                        <Wrong isAnswered={msg.answerIndex !== -1} />
                      )
                    );
                    break;
                  case MessageType.QUESTION:
                    console.log(client);
                    console.log(msg);
                    console.log();
                    setContentType(ContentType.QUESTION);
                    const timeoutObj = setTimeout(() => {
                      console.log("Submit answer", -1, contentType); // DEBUG
                      // if (contentType === "QUESTION") {
                      console.log("Submit answer", -1);
                      const answer: Partial<AdvancedChatMessage> = {
                        type: MessageType.ANSWER,
                        sender: {
                          username: username,
                          imageUrl: imageUrl,
                        },
                        answerIndex: -1,
                        receiver: Receiver.PLAYER,
                        questionIndex: msg.questionIndex,
                      };
                      client?.send(
                        `/app/chat/${gameCode}/answer`,
                        {},
                        JSON.stringify(answer)
                      );
                      // }
                    }, (msg.question!.timeLimit) * 1000);
                    setContent(
                      <div className="w-screen h-screen">
                        {/* <div className="w-full text-center py-4 mb-4 text-2xl text-white">
                          Question No: {msg.questionIndex! + 1}
                        </div> */}
                        <QuestionOptions
                          slide={convertQuestionToSlide(msg.question!)}
                          innerClassName={
                            msg.question!.questionType === QuestionType.QUIZ
                              ? "!h-[40vh]"
                              : "!h-[90vh]"
                          }
                          submitAnswer={(ind: number) => {
                            clearTimeout(timeoutObj);
                            console.log("Submit answer", ind);
                            const answer: Partial<AdvancedChatMessage> = {
                              type: MessageType.ANSWER,
                              sender: {
                                username: username,
                                imageUrl: imageUrl,
                              },
                              answerIndex: ind,
                              receiver: Receiver.PLAYER,
                              questionIndex: msg.questionIndex,
                            };
                            console.log(client);
                            client?.send(
                              `/app/chat/${gameCode}/answer`,
                              {},
                              JSON.stringify(answer)
                            );
                          }}
                        />
                      </div>
                    );
                    break;
                  case MessageType.START:
                    setContentType(ContentType.CONTENT);
                    setContent(
                      <ReactCountDown
                        className="fixed inset-0 z-50"
                        setLoading={(val: boolean) => {
                          setContent(
                            <h1 className="text-white text-4xl sm:text-5xl md:text-7xl font-extrabold">
                              Get ready!
                            </h1>
                          );
                        }}
                      />
                    ); // DEBUG
                    break;
                  case MessageType.GET_READY:
                    setContentType(ContentType.CONTENT);
                    setContent(
                      <h1 className="text-white text-4xl sm:text-5xl md:text-7xl font-extrabold">
                        Get ready!
                      </h1>
                    );
                    break;
                  case MessageType.NEXT:
                    break;
                  case MessageType.LEADERBOARD:
                    break;
                  case MessageType.END:
                    toast.success("Quiz Ended");
                    router.push("/");
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
