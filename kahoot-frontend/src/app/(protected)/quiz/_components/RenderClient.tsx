"use client";
import { Button } from "@/components/ui/button";
import {
  AdvancedChatMessage,
  ChatMessage,
  Leaderboard,
  MessageType,
  Question,
  QuestionType,
  Receiver,
} from "@/types";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import ReactCountDown from "./ReactCountDown";
import {
  Slide,
  useSlides,
} from "../../questionset/create/_components/slides.hook";
import { cn, convertSlideToQuestion } from "@/lib/utils";
import SimpleCounter from "./SimpleCounter";
import Scoreboard from "@/components/scoreboard";
import AnswerFrequencyPage from "@/components/answer-frequency/page";
import { QuestionOptionsFrequency } from "@/components/QuestionOptions";
import DisplaySlide from "@/components/DisplaySlide";
import QuestionLoader from "@/components/QuestionLoader";

// RenderClient
// 1. timer -> 3 seconds delay and auto to next question to all clients in quiz
// 2. question show for 5 seconds and auto to answer options for all clients in quiz
// 3. answer options
// 4. frequency of answers for each options -> Next to leaderboard Button
// 5. Leaderboard -> next Question button

type MessageContent = {};

const RenderClient = ({ questions }: { questions: Slide[] }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);
  const [connected, setConnected] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currQuestion, setCurrQuestion] = useState(-1);
  const [showOptions, setShowOptions] = useState(false);
  const [questionLoader, setQuestionLoader] = useState(false);
  const [showAnswerFrequency, setShowAnswerFrequency] = useState(false);
  const [answerFrequency, setAnswerFrequency] = useState<number[]>([]);
  const [showScoreBoard, setShowScoreBoard] = useState(false);
  const [scoreboard, setScoreboard] = useState<Leaderboard[]>([]);
  const [totalActiveUsers, setTotalActiveUsers] = useState(0);
  const slidesState = useSlides();
  useEffect(() => {
    slidesState.setSlides(questions);
  }, [questions]);

  const gameCode = searchParams.get("gameCode");

  useEffect(() => {
    // Establish the WebSocket connection
    if (isStarted && stompClient && connected) {
      return;
    }
    const socket = new SockJS(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/ws`
    );
    const client = Stomp.over(socket);
    setStompClient(client);
    client.connect(
      {},
      () => {
        console.log("Connected");
        setConnected(true); // Update connected status
        client.subscribe(`/room/${gameCode}/activeUsers`, activeUserEvents);
        client.subscribe(`/room/${gameCode}/quiz`, quizEvents);
        client.subscribe(`/room/${gameCode}`, onConnect);
        client.send(
          `/app/chat/${gameCode}/getUsers`,
          {},
          JSON.stringify({ type: "GET" })
        );
        setStompClient(client);
        if (!isStarted) {
          client?.send(
            `/app/chat/${gameCode}/start`,
            {},
            JSON.stringify({ type: MessageType.START })
          );
          setIsStarted(true);
        }
      },
      (error) => {
        console.error("Error connecting:", error);
      }
    );

    return () => {
      if (stompClient && connected) {
        stompClient.disconnect(() => {
          // toast.success("Disconnected successfully");
          console.log("Disconnected");
          // setConnected(false);
        });
      }
    };
  }, [gameCode, isStarted]); // Reconnect if gameCode changes

  const disconnect = () => {
    if (stompClient && connected) {
      stompClient.disconnect(() => {
        // toast.success("Disconnected successfully");
        console.log("Disconnected");
        // setConnected(false);
      });
    }
  };

  const onConnect = () => {};

  const renderPage = () => {};

  const activeUserEvents = (message: Stomp.Message) => {};
  const quizEvents = (message: Stomp.Message) => {
    const msg: AdvancedChatMessage = JSON.parse(message.body);
    // toast.success("Message received");
    console.log(msg);
    const reciever = msg.receiver;
    if (reciever === Receiver.PLAYER) {
      return;
    }
    switch (msg.type) {
      case MessageType.QUESTION:
        setQuestionLoader(false);
        setShowOptions(true);
        break;

      case MessageType.START:
        setLoading(true);
        break;
      case MessageType.ALL_ANSWERED:
      case MessageType.ANSWER_FREQUENCY:
        console.log(msg);
        console.log("All Answered");
        console.log(slidesState.currentSlideIndex);
        console.log(msg.questionIndex);

        console.log(showAnswerFrequency);
        console.log(showScoreBoard);
        if (
          slidesState.currentSlideIndex > msg!.questionIndex! ||
          showAnswerFrequency ||
          showScoreBoard
        ) {
          return;
        }
        setShowAnswerFrequency(true);
        setAnswerFrequency(msg?.answerFrequency || []);
        setTotalActiveUsers(msg?.totalUsers || 0);
        console.log("All Answered");
        break;
      case MessageType.LEADERBOARD:
        console.log(msg);
        setShowAnswerFrequency(false);
        setShowOptions(false);
        setShowScoreBoard(true);
        setScoreboard(msg.leaderboard || []);
        break;
      default:
        console.log("Unknown message type", msg);
    }
  };

  const sendCurrentQuestionToServer = (qno: number) => {
    // QUESTION after 5 seconds
    // receives response from server after 5 seconds
    console.log(slidesState.slides[qno]);
    const currentQuestion: Partial<AdvancedChatMessage> = {
      type: MessageType.QUESTION,
      question: convertSlideToQuestion(slidesState.slides[qno]),
      receiver: Receiver.PLAYER,
      questionIndex: qno,
      delayInSeconds: 5,
    };
    stompClient?.send(
      `/app/chat/${gameCode}/getReady`,
      {},
      JSON.stringify({ type: MessageType.GET_READY, receiver: Receiver.PLAYER })
    );
    stompClient?.send(
      `/app/chat/${gameCode}/question`,
      {},
      JSON.stringify(currentQuestion)
    );
    stompClient?.send(
      `/app/chat/${gameCode}/allAnswered`,
      {},
      JSON.stringify({
        ...currentQuestion,
        type: MessageType.ALL_ANSWERED,
        receiver: Receiver.HOST,
      })
    );
  };

  const renderQuestionClientOnly = (qno: number) => {
    if (qno >= slidesState.slides.length) {
      stompClient?.send(
        `/app/chat/${gameCode}/end`,
        {},
        JSON.stringify({ type: MessageType.END })
      );
      return;
    }
    console.log(qno);
    slidesState.setCurrentSlide(qno);
    setCurrQuestion(qno);
    sendCurrentQuestionToServer(qno);
    setQuestionLoader(true);
  };

  const renderLeaderboard = () => {
    const msg: Partial<AdvancedChatMessage> = {
      type: MessageType.LEADERBOARD,
      receiver: Receiver.HOST,
    };
    // LEADERBOARD
    stompClient?.send(
      `/app/chat/${gameCode}/leaderboard`,
      {},
      JSON.stringify(msg)
    );
  };

  const renderAnswerFrequency = () => {
    console.log("Answer Frequency");
    const msg: Partial<AdvancedChatMessage> = {
      type: MessageType.ANSWER_FREQUENCY,
      receiver: Receiver.HOST,
      questionIndex: currQuestion,
    };
    // Answer Frequency
    stompClient?.send(
      `/app/chat/${gameCode}/answerFrequency`,
      {},
      JSON.stringify(msg)
    );
  };

  if (loading) {
    return (
      <ReactCountDown
        className="fixed inset-0 z-50"
        setLoading={(val: boolean) => {
          setLoading(false);
          renderQuestionClientOnly(currQuestion + 1);
        }}
      />
    );
  }

  if (showAnswerFrequency) {
    console.log(currQuestion);
    console.log(answerFrequency);
    console.log(slidesState.currentSlide);
    const currentQuestionSlide = slidesState.currentSlide;

    if (currentQuestionSlide === undefined) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          Loading...
        </div>
      );
    }

    const question = convertSlideToQuestion(currentQuestionSlide);
    console.log(question);
    if (question.questionType === QuestionType.TRUE_OR_FALSE) {
      answerFrequency.length = 2;
    }
    return (
      <div className="w-full h-full relative">
        <div className="fixed top-2 right-2 flex w-full justify-end gap-3">
          <Button
            onClick={() => {
              renderLeaderboard();
            }}
          >
            Next
          </Button>
        </div>
        <AnswerFrequencyPage
          slide={currentQuestionSlide}
          answers={answerFrequency}
          total={totalActiveUsers}
          correctIndices={question.correctAnswerIndices}
          questionType={question.questionType}
          key={question.id}
        />
      </div>
    );
  }
  // LEADERBOARD
  if (showScoreBoard) {
    return (
      <div className="w-full h-full relative">
        <div className="fixed top-2 right-2 flex w-full justify-end gap-3">
          {currQuestion + 1 === questions.length ? (
            <Button
              variant={"destructive"}
              onClick={() => {
                stompClient?.send(
                  `/app/chat/${gameCode}/end`,
                  {},
                  JSON.stringify({ type: MessageType.END })
                );
                stompClient?.disconnect(() => {
                  console.log("Disconnected");
                });
                router.push("/");
              }}
            >
              End Quiz
            </Button>
          ) : (
            <Button
              onClick={() => {
                setShowScoreBoard(false);
                renderQuestionClientOnly(currQuestion + 1);
              }}
            >
              Next
            </Button>
          )}
        </div>
        <Scoreboard leaderboardData={scoreboard} />
      </div>
    );
  }

  // QUESTION with options
  if (showOptions) {
    if (slidesState.currentSlide.image) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="fixed flex justify-between inset-x-0 top-0 text-xl p-3">
            <h1 className="">Question {currQuestion + 1}</h1>
            <div className="flex items-center gap-3">
              <h1>
                Time:{" "}
                <SimpleCounter
                  onSuccess={() => {
                    renderAnswerFrequency();
                  }}
                  timer={questions[currQuestion].timeLimit / 4}
                />
                s
              </h1>
              <h1>
                {currQuestion + 1}/{questions.length}
              </h1>
            </div>
          </div>
          <DisplaySlide slide={slidesState.currentSlide} />
        </div>
      );
    }
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="fixed flex justify-between inset-x-0 top-0 text-xl p-3">
          <h1 className="">Question {currQuestion + 1}</h1>
          <div className="flex items-center gap-3">
            <h1>
              Time:{" "}
              <SimpleCounter
                onSuccess={() => {
                  renderAnswerFrequency();
                }}
                timer={questions[currQuestion].timeLimit / 4}
              />
              s
            </h1>
            <h1>
              {currQuestion + 1}/{questions.length}
            </h1>
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full h-full justify-evenly p-2">
          {/* <ProgressBar time={slidesState.currentSlide.timeLimit} /> */}
          <h1 className="text-white text-4xl sm:text-5xl md:text-7xl font-extrabold">
            {slidesState.currentSlide.question}
          </h1>
          {slidesState.currentSlide.image && (
            <div className="cursor-default md:h-72">
              <img src={slidesState.currentSlide.image} alt="Question" />
            </div>
          )}
          <QuestionOptionsFrequency
            slide={slidesState.currentSlide}
            questionType={slidesState.currentSlide.questionType}
            innerClassName={cn(
              "cursor-default !hover:opacity-100",
              slidesState.currentSlide.questionType === "QUIZ"
                ? "md:!h-48"
                : "md:!h-64 text-2xl font-bold"
            )}
            size={50}
          />
        </div>
      </div>
    );
  }

  if (questionLoader) {
    console.log(slidesState.slides);
    console.log(slidesState.currentSlide);
    return (
      <div className="w-full h-full flex items-center justify-center">
        <QuestionLoader timeLimit={5} className="fixed -inset-1 z-50" />
        <div className="fixed flex inset-x-0 top-5 text-2xl">
          <h1 className="">Question {currQuestion + 1}</h1>
        </div>
        <div className="flex flex-col gap-3 text-white text-4xl sm:text-5xl md:text-7xl font-extrabold">
          <h1>{slidesState.currentSlide.question}</h1>
          {/* <ProgressBar time={5} /> */}
        </div>
      </div>
    );
  }

  if (!isStarted) {
    return <>Starting...</>;
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col gap-3">
          <h1>Waiting for the host to start the quiz</h1>
          <Button
            onClick={() => {
              console.log("Start");
              stompClient?.send(
                `/app/chat/${gameCode}/start`,
                {},
                JSON.stringify({ type: MessageType.START })
              );
              setIsStarted(true);
            }}
          >
            Start
          </Button>
        </div>
      </div>
    );
  }

  return <div></div>;
};

export default RenderClient;
