import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const QuizQuestion = atom({
  key: "quizquestion", // unique ID (with respect to other atoms/selectors)
  default: [
    {
      hint1: false,
      hint2: false,
      hint3: false,
    },
    {
      hint1: false,
      hint2: false,
      hint3: false,
    },
    {
      hint1: false,
      hint2: false,
      hint3: false,
    },
    {
      hint1: false,
      hint2: false,
      hint3: false,
    },
    {
      hint1: false,
      hint2: false,
      hint3: false,
    },
    {
      hint1: false,
      hint2: false,
      hint3: false,
    },
    {
      hint1: false,
      hint2: false,
      hint3: false,
    },
  ], // default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
});
const QuizAnswer = atom({
  key: "quizanswer", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
const QuizTitleLength = atom({
  key: "quiztitlelength", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
});

const QuizHintUsed = atom({
  key: "quizHintUsed", // 고유 ID
  default: [], // 기본값: 모든 퀴즈에 대한 힌트 사용 여부를 배열로 저장
  effects_UNSTABLE: [persistAtom],
});
const QuizUser = atom({
  key: "quizuser", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
});
const Ranking = atom({
  key: "ranking", // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
});
const IsMobile = atom({
  key: "mobile", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
const IsReset = atom({
  key: "reset", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export {
  QuizQuestion,
  QuizAnswer,
  QuizUser,
  Ranking,
  IsMobile,
  QuizHintUsed,
  QuizTitleLength,
  IsReset,
};
