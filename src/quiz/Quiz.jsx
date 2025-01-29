import { useCallback, useEffect } from "react";
import { useState } from "react";

const API_URL =
  "https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const shuffleAnswers = (ans) => {
    return [...ans].sort(() => Math.random() - 0.5);
  };

  const prepareData = (data) => {
    return data.map((q) => ({
      question: q.question,
      answers: shuffleAnswers([...q.incorrect_answers, q.correct_answer]),
      correctAnswer: q.correct_answer,
    }));
  };

  const fetchQuestions = useCallback(async () => {
    try {
      const response = await fetch(API_URL);
      const result = await response.json();

      const preparedQuestions = prepareData(result.results);

      setQuestions(preparedQuestions);
    } catch (error) {
      console.error("Error fetching questions: ", error);
    }
  }, []);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (!selectedAnswer) return;

    setShowResults(true);

    setTimeout(() => {
      if (selectedAnswer === questions[currentQuestion].correctAnswer) {
        setScore((prev) => prev + 1);
      }

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
        setShowResults(false);
      } else {
        setQuizFinished(true);
      }
    }, 2000);
  };

  const handleResetQuiz = () => {
    setQuestions([]);
    setScore(0);
    setCurrentQuestion(0);
    setQuizFinished(false);
    setSelectedAnswer(null);
    setShowResults(false);
    fetchQuestions();
  };

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  if (!questions.length) {
    return <LoadingSpinner />;
  }

  if (quizFinished) {
    return (
      <div>
        <p className="font-bold my-2">
          Your score: {score} / {questions.length} (
          {Math.floor((score / questions.length) * 100)})%
        </p>
        <button onClick={handleResetQuiz}>Try again!</button>
      </div>
    );
  }

  return (
    <div>
      {questions.length > 0 && (
        <>
          <h1 className="my-2">Question {currentQuestion + 1}</h1>
          <Question
            question={questions[currentQuestion]}
            selectedAnswer={selectedAnswer}
            onAnswerSelect={handleAnswerSelection}
            showResults={showResults}
          />
          <div className="mt-2">
            <button
              disabled={currentQuestion === 0}
              onClick={() => setCurrentQuestion((prev) => prev - 1)}
              className="mr-2"
            >
              Prev
            </button>
            <button disabled={!selectedAnswer} onClick={handleNextQuestion}>
              {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const Question = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  showResults,
}) => {
  return (
    <>
      <h1>{question.question}</h1>
      {question.answers.map((ans, i) => {
        let answerClass = "mr-5";

        if (showResults) {
          if (ans === question.correctAnswer) {
            answerClass += " text-green-500 font-bold";
          } else if (ans === selectedAnswer) {
            answerClass += " text-red-500 font-bold";
          }
        }

        return (
          <label key={i} className={answerClass}>
            <input
              type="radio"
              name={question.question}
              value={ans}
              className="mr-2"
              checked={selectedAnswer === ans}
              disabled={showResults}
              onChange={() => onAnswerSelect(ans)}
            />
            {ans}
            <br />
          </label>
        );
      })}
    </>
  );
};

const LoadingSpinner = () => {
  return (
    <div role="status" className="mt-2">
      <svg
        aria-hidden="true"
        className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Quiz;
