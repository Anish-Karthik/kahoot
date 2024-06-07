export type LiveUser = {
  username: string;
  imageUrl: string;
};

export enum MessageType {
  JOIN = "JOIN",
  LEAVE = "LEAVE",
  MESSAGE = "MESSAGE",
  GET = "GET",
  USERS = "USERS",
  ACTIVE_USERS = "ACTIVE_USERS",
  START = "START",
  NEXT = "NEXT",
  ANSWER = "ANSWER",
  UPDATE = "UPDATE",
  QUESTION = "QUESTION",
  LEADERBOARD = "LEADERBOARD",
  END = "END",
  GET_READY = "GET_READY",
  ANSWER_FREQUENCY = "ANSWER_FREQUENCY",
}

export enum Receiver {
  ALL = "ALL",
  HOST = "HOST",
  PLAYER = "PLAYER",
}

export type ChatMessage = {
  type: MessageType;
  content: string;
  sender: LiveUser;
  receiver: Receiver;
};

export type Leaderboard = {
  username: string;
  score: number;
};

export type Verdict = {
  correct: boolean;
  score: number;
};

export type AdvancedChatMessage = ChatMessage & {
  question?: Question;
  leaderboard?: Leaderboard[];
  answerFrequency?: number[];
  delayInSeconds?: number;
  answerIndex?: number;
  verdict?: Verdict;
  questionIndex?: number;
};

// Enums defined similarly to Java enums
export enum QuestionType {
  QUIZ = "QUIZ",
  TRUE_OR_FALSE = "TRUE_OR_FALSE",
}

export enum PointType {
  STANDARD = "STANDARD",
  NO_POINTS = "NO_POINTS",
}

export enum AnswerOptionsType {
  SINGLE_SELECT = "SINGLE_SELECT",
  MULTI_SELECT = "MULTI_SELECT",
}

export interface Quiz {
  id: number;
  code: string;
  questionSets: QuestionSet[]; // Array of QuestionSet
}
// Interface for QuestionSet, assuming it has an id and possibly other fields
export interface QuestionSet {
  id: number;
  name?: string; // nullable in Java, so it's optional in TypeScript
  quiz?: Quiz; // optional as per the @ManyToOne(optional = true) annotation
  questions: Question[]; // Array of Question, initialized to an empty array in Java
}

// TypeScript interface for the Question entity
export interface Question {
  id: number;
  questionSet?: QuestionSet; // optional due to the "optional: true" in @ManyToOne
  question: string;
  image?: string; // Assuming image can be optional
  questionType: QuestionType;
  timeLimit: number;
  points: PointType;
  answerOptions: AnswerOptionsType;
  options: string[];
  correctAnswerIndices: number[];
}
