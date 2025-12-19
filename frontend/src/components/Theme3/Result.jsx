import React, { useState, useEffect } from "react";
import anime_rain from '../../../public/assets/anime_rain.mp4'


export default function Result({ selectedQuiz, questions, answers, onBack }) {
    const [animatedPercentage, setAnimatedPercentage] = useState(0);
    const [showDetails, setShowDetails] = useState(false);

    const quizQuestions = questions.filter((q) => q.quiz_name === selectedQuiz);

    let total = quizQuestions.length;
    let correct = quizQuestions.reduce((acc, item) => {
        const given = answers[item.id];
        if (given && given === item.correct_answer) {
            return acc + 1;
        }
        return acc;
    }, 0);

    let percentage = total > 0 ? ((correct / total) * 100) : 0;
    let status = percentage >= 80 ? "Pass" : "Fail";
    let isPassing = percentage >= 80;
    const userEmail = localStorage.getItem("userEmail");

    useEffect(() => {
        if (isPassing) {
            // Replace with your backend API URL
            const apiUrl = "http://localhost:8000/api/store_quiz_result/";

            const payload = {
                email: userEmail,
                quiz_name: selectedQuiz,
            };

            fetch(apiUrl + `?email=${encodeURIComponent(payload.email)}&quiz_name=${encodeURIComponent(payload.quiz_name)}`, {
                method: "GET", // or "POST" if your API expects POST
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("API response:", data);
                })
                .catch((err) => {
                    console.error("API error:", err);
                });
        }
    }, [isPassing]); // Runs only when isPassing changes

    // Animate percentage counter
    useEffect(() => {
        const timer = setTimeout(() => {
            const increment = percentage / 30; // 30 steps for smooth animation
            const interval = setInterval(() => {
                setAnimatedPercentage(prev => {
                    if (prev >= percentage) {
                        clearInterval(interval);
                        return percentage;
                    }
                    return Math.min(prev + increment, percentage);
                });
            }, 50);

            return () => clearInterval(interval);
        }, 500);

        return () => clearTimeout(timer);
    }, [percentage]);

    // Performance message based on score
    const getPerformanceMessage = () => {
        if (percentage >= 90) return "Outstanding! 🌟";
        if (percentage >= 80) return "Excellent Work! 🌿";
        if (percentage >= 70) return "Good Progress! 🌱";
        if (percentage >= 60) return "Keep Growing! 🌿";
        return "Never Give Up! 💪";
    };

    const getGradeColor = () => {
        if (percentage >= 90) return "from-emerald-400 to-green-500";
        if (percentage >= 80) return "from-teal-400 to-emerald-500";
        if (percentage >= 70) return "from-yellow-400 to-emerald-500";
        if (percentage >= 60) return "from-orange-400 to-yellow-500";
        return "from-red-400 to-orange-500";
    };

    return (
        <div className="relative w-full min-h-screen">
            {/* Background video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="fixed top-0 left-0 w-full h-full object-cover z-0"
            >
                <source src={anime_rain} type="video/mp4" />
            </video>

            {/* Nature-inspired overlay */}
            <div className="fixed inset-0 bg-gradient-to-br from-emerald-900/30 via-black/50 to-teal-900/30 z-0" />

            {/* Floating nature particles */}
            <div className="fixed inset-0 pointer-events-none z-5">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-300/30 rounded-full animate-pulse delay-1000"></div>
                <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-teal-300/40 rounded-full animate-bounce delay-2000"></div>
                <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-green-300/30 rounded-full animate-ping delay-3000"></div>
                <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-cyan-300/40 rounded-full animate-pulse delay-4000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-0.5 h-0.5 bg-emerald-400/50 rounded-full animate-bounce delay-5000"></div>
            </div>

            {/* Scrollable content */}
            <div className="relative z-10 max-w-4xl mx-auto p-4">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center bg-emerald-800/40 backdrop-blur-lg border border-emerald-400/30 rounded-full px-6 py-3 mb-6">
                        <div className="flex items-center mr-3">
                            <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
                            <div className="w-1.5 h-1.5 bg-green-300 rounded-full ml-1 animate-ping"></div>
                        </div>
                        <span className="text-emerald-200 text-sm uppercase tracking-wide font-medium">Quiz Complete</span>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                        {selectedQuiz}
                    </h2>
                    <div className="text-xl text-emerald-200 flex items-center justify-center">
                        <div className="w-1 h-6 bg-gradient-to-b from-emerald-400 to-teal-400 rounded-full mr-3"></div>
                        Final Results
                        <div className="w-1 h-6 bg-gradient-to-b from-teal-400 to-emerald-400 rounded-full ml-3"></div>
                    </div>
                </div>

                {/* Main Result Card */}
                <div className="bg-black/30 backdrop-blur-xl border border-emerald-400/20 rounded-3xl p-8 lg:p-12 mb-8 relative overflow-hidden shadow-2xl shadow-emerald-500/10">
                    {/* Organic flowing background pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-emerald-300 to-teal-400 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-teal-300 to-green-400 rounded-full blur-2xl animate-pulse delay-1000"></div>
                        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-green-300 to-emerald-400 rounded-full blur-xl animate-pulse delay-500"></div>
                        <div className="absolute bottom-1/3 left-1/4 w-16 h-16 bg-gradient-to-br from-cyan-300 to-teal-300 rounded-full blur-lg animate-pulse delay-1500"></div>
                    </div>

                    <div className="relative z-10">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Left: Circular Progress */}
                            <div className="text-center">
                                <div className="relative w-48 h-48 mx-auto mb-6">
                                    {/* Background circle */}
                                    <div className="absolute inset-0 rounded-full border-8 border-slate-700/50"></div>

                                    {/* Progress circle */}
                                    <div className="absolute inset-0">
                                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                            <circle
                                                cx="50"
                                                cy="50"
                                                r="42"
                                                fill="none"
                                                stroke="url(#gradient)"
                                                strokeWidth="8"
                                                strokeLinecap="round"
                                                strokeDasharray={`${(animatedPercentage / 100) * 264} 264`}
                                                className="transition-all duration-1000 ease-out"
                                            />
                                            <defs>
                                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" stopColor={isPassing ? "#10b981" : "#ef4444"} />
                                                    <stop offset="50%" stopColor={isPassing ? "#14b8a6" : "#f97316"} />
                                                    <stop offset="100%" stopColor={isPassing ? "#06b6d4" : "#dc2626"} />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                    </div>

                                    {/* Center content */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <div className="text-5xl font-bold text-white mb-2 drop-shadow-lg">
                                            {Math.round(animatedPercentage)}%
                                        </div>
                                        <div className={`
                                            text-lg font-semibold px-4 py-2 rounded-full backdrop-blur-sm
                                            ${isPassing
                                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 shadow-lg shadow-emerald-400/20'
                                                : 'bg-red-500/20 text-red-300 border border-red-400/40 shadow-lg shadow-red-400/20'
                                            }
                                        `}>
                                            {status}
                                        </div>
                                    </div>

                                    {/* Glow effect */}
                                    <div className={`
                                        absolute inset-0 rounded-full blur-xl opacity-20
                                        ${isPassing ? 'bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400' : 'bg-gradient-to-r from-red-500 to-orange-500'}
                                    `}></div>

                                    {/* Ripple effects for passing */}
                                    {isPassing && (
                                        <>
                                            <div className="absolute inset-0 rounded-full bg-emerald-400/10 animate-ping"></div>
                                            <div className="absolute inset-0 rounded-full bg-teal-400/10 animate-ping delay-500"></div>
                                        </>
                                    )}
                                </div>

                                <div className="text-2xl text-emerald-100 font-medium flex items-center justify-center">
                                    <div className="w-2 h-2 bg-gradient-to-r from-emerald-300 to-teal-300 rounded-full mr-3 animate-pulse"></div>
                                    {getPerformanceMessage()}
                                    <div className="w-2 h-2 bg-gradient-to-r from-teal-300 to-emerald-300 rounded-full ml-3 animate-pulse"></div>
                                </div>
                            </div>

                            {/* Right: Statistics */}
                            <div className="space-y-6">
                                {/* Score breakdown */}
                                <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-emerald-400/20">
                                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                                        <div className="flex items-center mr-3">
                                            <div className="w-1 h-6 bg-gradient-to-b from-emerald-400 to-teal-400 rounded-full mr-1"></div>
                                            <div className="w-0.5 h-4 bg-gradient-to-b from-teal-300 to-green-400 rounded-full"></div>
                                        </div>
                                        Score Breakdown
                                    </h3>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-emerald-200">Correct Answers</span>
                                            <div className="flex items-center">
                                                <span className="text-emerald-400 font-bold text-xl mr-2">{correct}</span>
                                                <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-400/30">
                                                    <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span className="text-emerald-200">Wrong Answers</span>
                                            <div className="flex items-center">
                                                <span className="text-red-400 font-bold text-xl mr-2">{total - correct}</span>
                                                <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center border border-red-400/30">
                                                    <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-emerald-600/30">
                                            <div className="flex justify-between items-center">
                                                <span className="text-emerald-200 font-semibold">Total Questions</span>
                                                <span className="text-teal-400 font-bold text-xl">{total}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Performance bar */}
                                <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-emerald-400/20">
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                                        <div className="w-2 h-2 bg-gradient-to-r from-emerald-300 to-teal-300 rounded-full mr-2 animate-pulse"></div>
                                        Performance Grade
                                    </h3>
                                    <div className="relative h-4 bg-slate-700/50 rounded-full overflow-hidden border border-slate-600/30">
                                        <div
                                            className={`h-full bg-gradient-to-r ${getGradeColor()} rounded-full transition-all duration-1000 ease-out relative`}
                                            style={{ width: `${animatedPercentage}%` }}
                                        >
                                            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between text-sm text-slate-400 mt-2">
                                        <span>0%</span>
                                        <span className="text-emerald-300">{percentage.toFixed(1)}%</span>
                                        <span>100%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={() => setShowDetails(!showDetails)}
                        className="bg-slate-800/50 hover:bg-slate-700/60 text-emerald-200 hover:text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 border border-emerald-600/30 hover:border-emerald-400/50 backdrop-blur-sm shadow-lg hover:shadow-emerald-500/20"
                    >
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
                            {showDetails ? 'Hide' : 'Show'} Detailed Review
                        </div>
                    </button>

                    <button
                        onClick={onBack}
                        className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 hover:from-emerald-500 hover:via-teal-500 hover:to-green-500 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/30 backdrop-blur-sm"
                    >
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-white/80 rounded-full mr-2 animate-bounce"></div>
                            Back to Quiz List
                            <div className="w-2 h-2 bg-white/80 rounded-full ml-2 animate-bounce delay-300"></div>
                        </div>
                    </button>
                </div>

                {/* Detailed Review Section */}
                {showDetails && (
                    <div className="mt-8 bg-black/30 backdrop-blur-xl border border-emerald-400/20 rounded-2xl p-8 relative overflow-hidden shadow-2xl shadow-emerald-500/10">
                        {/* Background decoration */}
                        <div className="absolute inset-0 opacity-5">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-300 to-teal-400 rounded-full blur-3xl animate-pulse"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-300 to-emerald-400 rounded-full blur-2xl animate-pulse delay-1000"></div>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center relative z-10">
                            <div className="flex items-center mr-4">
                                <div className="w-1 h-8 bg-gradient-to-b from-emerald-400 to-teal-400 rounded-full mr-2"></div>
                                <div className="w-0.5 h-6 bg-gradient-to-b from-teal-300 to-green-400 rounded-full mr-1"></div>
                                <div className="w-0.5 h-4 bg-gradient-to-b from-green-300 to-emerald-400 rounded-full"></div>
                            </div>
                            Question Review
                        </h3>

                        <div className="space-y-6 relative z-10">
                            {quizQuestions.map((question, index) => {
                                const userAnswer = answers[question.id];
                                const isCorrect = userAnswer === question.correct_answer;

                                return (
                                    <div key={question.id} className={`
                                        p-6 rounded-xl border-2 transition-all duration-300 backdrop-blur-sm relative overflow-hidden
                                        ${isCorrect
                                            ? 'bg-emerald-500/10 border-emerald-400/40 shadow-lg shadow-emerald-500/10'
                                            : 'bg-red-500/10 border-red-400/40 shadow-lg shadow-red-500/10'
                                        }
                                    `}>
                                        {/* Background particles */}
                                        {isCorrect && (
                                            <>
                                                <div className="absolute top-2 right-2 w-1 h-1 bg-emerald-300/50 rounded-full animate-ping"></div>
                                                <div className="absolute bottom-3 left-3 w-0.5 h-0.5 bg-teal-300/60 rounded-full animate-ping delay-300"></div>
                                            </>
                                        )}

                                        <div className="flex items-start justify-between mb-4">
                                            <h4 className="text-lg font-medium text-white flex-1 pr-4 drop-shadow-sm">
                                                <span className="text-emerald-300">Q{index + 1}:</span> {question.quiz_question}
                                            </h4>
                                            <div className={`
                                                w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm border
                                                ${isCorrect
                                                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-400/40 shadow-lg shadow-emerald-400/20'
                                                    : 'bg-red-500/20 text-red-400 border-red-400/40 shadow-lg shadow-red-400/20'
                                                }
                                            `}>
                                                {isCorrect ? '✓' : '✗'}
                                            </div>
                                        </div>

                                        <div className="grid sm:grid-cols-2 gap-4 text-sm">
                                            <div className="flex items-center">
                                                <div className="w-2 h-2 bg-slate-400 rounded-full mr-3"></div>
                                                <span className="text-slate-300">Your Answer: </span>
                                                <span className={isCorrect ? 'text-emerald-300 ml-2' : 'text-red-300 ml-2'}>
                                                    {question[`quiz_option_${userAnswer}`] || 'No answer'}
                                                </span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3 animate-pulse"></div>
                                                <span className="text-slate-300">Correct Answer: </span>
                                                <span className="text-emerald-300 ml-2">
                                                    {question[`quiz_option_${question.correct_answer}`]}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}