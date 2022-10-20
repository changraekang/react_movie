import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const QuizQuestion = atom({
  key: "quizquestion", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
const QuizAnswer = atom({
  key: "quizanswer", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
const QuizUser = atom({
  key: "quizuser", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
const Ranking = atom({
  key: "ranking", // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
});

export { QuizQuestion, QuizAnswer, QuizUser, Ranking };
