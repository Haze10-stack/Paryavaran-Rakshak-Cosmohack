import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizList from "./QuizList.jsx";
import QuizScreen from "./QuizScreen";
import Result from "./Result";


export default function Quiz() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8000/api/questions/")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setQuestions(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching questions:', err);
        setError(err.message || 'Failed to load questions');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#07111a] to-[#071a25] p-8 flex items-center justify-center">
        <div className="text-[#b8d4f0] text-lg">Loading questions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#07111a] to-[#071a25] p-8 flex items-center justify-center">
        <div className="text-red-300 text-lg">Error loading questions: {error}</div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#07111a] to-[#071a25] p-8 flex items-center justify-center">
        <div className="text-[#b8d4f0] text-lg">No quizzes available</div>
      </div>
    );
  }

  if (!selectedQuiz) {
    return (
      <QuizList
        questions={questions}
        onSelectQuiz={(quizName) => setSelectedQuiz(quizName)}
      />
    );
  }

  if (showResult) {
    return (
      <Result
        selectedQuiz={selectedQuiz}
        questions={questions}
        answers={answers}
        onBack={() => {
          setSelectedQuiz(null);
          setAnswers({});
          setShowResult(false);
        }}
      />
    );
  }

  return (
    <QuizScreen
      selectedQuiz={selectedQuiz}
      questions={questions}
      answers={answers}
      setAnswers={setAnswers}
      onSubmit={() => setShowResult(true)}
      onBack={() => {
        setSelectedQuiz(null);
        setAnswers({});
      }}
    />
  );
}