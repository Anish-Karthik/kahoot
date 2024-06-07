import { create } from "zustand";
import { z } from "zod";
export type QuestionType = "QUIZ" | "TRUE_OR_FALSE";
export type PointType = "STANDARD" | "NO_POINTS";
export type AnswerOptionsType = "SINGLE_SELECT" | "MULTI_SELECT";

export const QuestionTypeOptions: QuestionType[] = ["QUIZ", "TRUE_OR_FALSE"];
export const PointTypeOptions: PointType[] = ["STANDARD", "NO_POINTS"];
export const AnswerOptionsTypeOptions: AnswerOptionsType[] = [
  "SINGLE_SELECT",
  "MULTI_SELECT",
];

export type SlideSettings = {
  questionType: QuestionType;
  timeLimit: number;
  points: PointType;
  answerOptions: AnswerOptionsType;
};

export type Answer = {
  isCorrect: boolean;
  answer: string;
  imageUrl?: string;
};

export type Slide = SlideSettings & {
  id?: number;
  question: string;
  image?: string;
  answers: Answer[];
};
export type CurrentSlideSettingActions = {
  setQuestionType: (questionType: SlideSettings["questionType"]) => void;
  setPoints: (points: SlideSettings["points"]) => void;
  setAnswerOptions: (answerOptions: SlideSettings["answerOptions"]) => void;
  setTimeLimit: (timeLimit: number) => void;
};
export type CurrentSlideActions = CurrentSlideSettingActions & {
  setQuestion: (question: string) => void;
  setImage: (image: string) => void;
  addAnswer: (answer: Answer) => void;
  removeAnswer: (index: number) => void;
  setAnswer: (index: number, answer: Answer) => void;
  setAnswerText: (index: number, answer: string) => void;
  setAnswerImage: (index: number, answer: string) => void;
  toggleAnswerCorrect: (index: number) => void;
  isValidSlide: (index: number) => boolean;
};

export type SlidesState = {
  isDraft: boolean;
  slides: Slide[];
  name: string;
  currentSlideIndex: number;
  currentSlide: Slide;
  currentSlideActions: CurrentSlideActions;

  setName: (name: string) => void;
  setSlides(slides: Slide[]): void;
  setIsDraft: (isDraft: boolean) => void;
  addDefaultSlide: () => void;
  addSlide: (slide: Slide) => void;
  removeSlide: (index: number) => void;
  duplicateSlide: (index: number) => void;
  setCurrentSlide: (index: number) => void;
  removeCurrentSlide: () => void;
  duplicateCurrentSlide: () => void;
  validateAllSlides: () => boolean;
};

const defaultSlide: Slide = {
  id: 0,
  question: "",
  questionType: "QUIZ",
  timeLimit: 20,
  points: "STANDARD",
  answerOptions: "SINGLE_SELECT",
  answers: [
    { isCorrect: false, answer: "" },
    { isCorrect: false, answer: "" },
    { isCorrect: false, answer: "" },
    { isCorrect: false, answer: "" },
  ],
};

export const nameSchema = z.string().min(1, {
  message: "Name must be at least 1 character long",
});

export const validateName = (name: string): boolean =>
  nameSchema.safeParse(name).success;

export const slideSchema = z.object({
  id: z.number().optional(),
  question: z
    .string()
    .min(1, {
      message: "Question must be at least 1 character long",
    })
    .max(200, {
      message: "Question must be at most 200 characters long",
    }),
  questionType: z.union([z.literal("QUIZ"), z.literal("TRUE_OR_FALSE")]),
  timeLimit: z.number(),
  points: z.union([z.literal("STANDARD"), z.literal("NO_POINTS")]),
  answerOptions: z.union([
    z.literal("SINGLE_SELECT"),
    z.literal("MULTI_SELECT"),
  ]),
  image: z.string().optional(),
  answers: z
    .array(
      z.object({
        isCorrect: z.boolean(),
        answer: z.string(),
        imageUrl: z.string().optional(),
      })
    )
    .refine((answers) => answers.reduce((a, b) => a || b.isCorrect, false), {
      message: "At least one answer must be correct",
    }),
});

export const useSlides = create<SlidesState>((set, get) => ({
  slides: [defaultSlide],
  currentSlideIndex: 0,
  get currentSlide() {
    return this.slides[this.currentSlideIndex];
  },
  isDraft: true,
  name: "",
  setName: (name) => set({ name }),
  setSlides: (slides) => set({ slides }),
  setIsDraft: (isDraft) => set({ isDraft }),
  addDefaultSlide: () =>
    set((state) => ({ slides: [...state.slides, defaultSlide] })),
  addSlide: (slide) => set((state) => ({ slides: [...state.slides, slide] })),
  removeSlide: (index) =>
    set((state) => {
      if (state.slides.length === 1) return state;
      return {
        slides: state.slides.filter((_, i) => i !== index),
        currentSlideIndex: Math.min(
          state.currentSlideIndex,
          state.slides.length - 2
        ),
      };
    }),
  duplicateSlide: (index) =>
    set((state) => ({ slides: [...state.slides, state.slides[index]] })),
  setCurrentSlide: (index) =>
    set((state) => ({
      currentSlideIndex: index,
      currentSlide: state.slides[index],
    })),
  validateAllSlides: () =>
    get().slides.every((slide, i) =>
      get().currentSlideActions.isValidSlide(i)
    ) && validateName(get().name),

  currentSlideActions: {
    isValidSlide: (index) => {
      const slide = get().slides[index];
      const tmp = slideSchema.safeParse(slide);
      console.log(tmp);
      const isValid = slideSchema.safeParse(slide).success;
      console.log(slide, isValid);
      return isValid;
    },
    setQuestion: (question) =>
      set((state) => ({
        slides: state.slides.map((slide, i) =>
          i === state.currentSlideIndex ? { ...slide, question } : slide
        ),
      })),
    setImage: (image) =>
      set((state) => ({
        slides: state.slides.map((slide, i) =>
          i === state.currentSlideIndex ? { ...slide, image } : slide
        ),
      })),
    addAnswer: (answer) =>
      set((state) => ({
        slides: state.slides.map((slide, i) =>
          i === state.currentSlideIndex
            ? { ...slide, answers: [...slide.answers, answer] }
            : slide
        ),
      })),
    removeAnswer: (index) =>
      set((state) => ({
        slides: state.slides.map((slide, i) =>
          i === state.currentSlideIndex
            ? {
                ...slide,
                answers: slide.answers.filter((_, j) => j !== index),
              }
            : slide
        ),
      })),
    setAnswer: (index, answer) =>
      set((state) => ({
        slides: state.slides.map((slide, i) =>
          i === state.currentSlideIndex
            ? {
                ...slide,
                answers: slide.answers.map((ans, j) =>
                  j === index ? answer : ans
                ),
              }
            : slide
        ),
      })),

    setAnswerText: (index, answer) =>
      set((state) => ({
        slides: state.slides.map((slide, i) =>
          i === state.currentSlideIndex
            ? {
                ...slide,
                answers: slide.answers.map((ans, j) =>
                  j === index ? { ...ans, answer } : ans
                ),
              }
            : slide
        ),
      })),
    setAnswerImage: (index, imageUrl) =>
      set((state) => ({
        slides: state.slides.map((slide, i) =>
          i === state.currentSlideIndex
            ? {
                ...slide,
                answers: slide.answers.map((ans, j) =>
                  j === index ? { ...ans, imageUrl } : ans
                ),
              }
            : slide
        ),
      })),

    toggleAnswerCorrect: (index) =>
      set((state) => ({
        slides: state.slides.map((slide, i) =>
          i === state.currentSlideIndex
            ? {
                ...slide,
                answers: slide.answers.map((ans, j) =>
                  j === index
                    ? { ...ans, isCorrect: !ans.isCorrect }
                    : slide.questionType === "QUIZ"
                    ? ans
                    : { ...ans, isCorrect: !ans.isCorrect }
                ),
              }
            : slide
        ),
      })),
    setQuestionType: (questionType) => {
      console.log(questionType);
      set((state) => ({
        slides: state.slides.map((slide, i) =>
          i === state.currentSlideIndex
            ? {
                ...slide,
                questionType,
                answers:
                  questionType === "QUIZ"
                    ? defaultSlide.answers
                    : [
                        { isCorrect: true, answer: "True" },
                        { isCorrect: false, answer: "False" },
                      ],
              }
            : slide
        ),
      }));
    },
    setPoints: (points) =>
      set((state) => ({
        slides: state.slides.map((slide, i) =>
          i === state.currentSlideIndex ? { ...slide, points } : slide
        ),
      })),
    setAnswerOptions: (answerOptions) =>
      set((state) => ({
        slides: state.slides.map((slide, i) =>
          i === state.currentSlideIndex ? { ...slide, answerOptions } : slide
        ),
      })),
    setTimeLimit: (timeLimit) =>
      set((state) => ({
        slides: state.slides.map((slide, i) =>
          i === state.currentSlideIndex ? { ...slide, timeLimit } : slide
        ),
      })),
  },
  removeCurrentSlide: () =>
    set((state) => ({
      slides: state.slides.filter((_, i) => i !== state.currentSlideIndex),
    })),
  duplicateCurrentSlide: () =>
    set((state) => ({
      slides: [...state.slides, state.slides[state.currentSlideIndex]],
    })),
}));
