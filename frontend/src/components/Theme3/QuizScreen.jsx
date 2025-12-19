import React, { useState, useEffect, useRef } from "react";
import Question from "./Question";
import anime_rain from '../../../public/assets/anime_rain.mp4'

export default function QuizScreen({ selectedQuiz, questions, answers, setAnswers, onSubmit, onBack }) {
    const quizQuestions = questions.filter((q) => q.quiz_name === selectedQuiz);
    const [index, setIndex] = useState(0);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [videoError, setVideoError] = useState(false);
    const videoRef = useRef(null);

    // Video loading effect
    useEffect(() => {
        const checkVideoFile = async () => {
            try {
                const response = await fetch('/assets/anime_rain.mp4', { method: 'HEAD' });
                if (!response.ok) {
                    console.warn('Primary video path not accessible, trying alternate path');
                    setVideoError(true);
                }
            } catch (error) {
                console.warn('Video file check failed:', error);
                setVideoError(true);
            }
        };

        checkVideoFile();
    }, []);

    // Video event handlers
    const handleVideoLoad = () => {
        setVideoLoaded(true);
        setVideoError(false);
        console.log('Video loaded successfully');
    };

    const handleVideoError = (e) => {
        console.error("Video loading error:", e.target.error);
        setVideoError(true);
        setVideoLoaded(false);
        
        // Try to load the video again with alternate source after a delay
        setTimeout(() => {
            if (videoRef.current) {
                videoRef.current.load();
            }
        }, 1000);
    };

    const handleVideoCanPlay = () => {
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.error("Video autoplay failed:", error);
            });
        }
    };

    // Background component for reusability
    const VideoBackground = ({ children }) => (
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

            {/* Enhanced nature-tech overlay */}
            <div className="fixed inset-0 bg-gradient-to-br from-black/30 via-emerald-900/20 to-black/40 z-0" />

            {/* Floating nature particles overlay */}
            <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
                <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-emerald-300/30 rounded-full animate-pulse delay-1000 blur-sm"></div>
                <div className="absolute top-3/4 right-1/5 w-1 h-1 bg-teal-300/40 rounded-full animate-pulse delay-2000 blur-sm"></div>
                <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-cyan-300/30 rounded-full animate-pulse delay-3000 blur-sm"></div>
                <div className="absolute top-1/3 right-2/3 w-1 h-1 bg-green-300/40 rounded-full animate-pulse delay-4000 blur-sm"></div>
            </div>

            {children}
        </div>
    );

// No questions found screen
    if (quizQuestions.length === 0) {
        return (
            <VideoBackground>
                <div className="relative z-10 flex items-center justify-center h-screen p-6">
                    <div className="bg-black/40 backdrop-blur-xl border border-red-400/30 rounded-3xl p-8 text-center max-w-md w-full shadow-2xl shadow-red-500/20">
                        {/* Floating error particles */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-red-300/40 rounded-full animate-bounce delay-1000"></div>
                            <div className="absolute top-3/4 right-1/4 w-0.5 h-0.5 bg-orange-300/40 rounded-full animate-bounce delay-2000"></div>
                        </div>

                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-500/30 to-orange-500/30 flex items-center justify-center backdrop-blur-sm border border-red-400/20">
                            <svg className="w-10 h-10 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.232 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-semibold text-white mb-4 drop-shadow-lg">No Questions Found</h3>
                        <p className="text-red-100 mb-6 drop-shadow-md">No questions found for <span className="text-red-300 font-semibold">{selectedQuiz}</span></p>
                        
                        {/* Video status indicator */}
                        {videoError && (
                            <div className="mb-4 p-3 bg-amber-500/20 border border-amber-400/30 rounded-lg">
                                <p className="text-amber-200 text-sm">
                                    <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Background video unavailable
                                </p>
                            </div>
                        )}

                        <button
                            onClick={onBack}
                            className="bg-gradient-to-r from-slate-700/60 to-slate-800/60 hover:from-emerald-600/60 hover:to-teal-600/60 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-slate-500/30 hover:border-emerald-400/30"
                        >
                            Back to Quiz List
                        </button>
                    </div>
                </div>
            </VideoBackground>
        );
    }

    const q = quizQuestions[index];
    const progress = ((index + 1) / quizQuestions.length) * 100;
    const answeredQuestions = Object.keys(answers).filter(key =>
        quizQuestions.some(qq => qq.id.toString() === key)
    ).length;

    function choose(optionNumber) {
        setAnswers((prev) => ({ ...prev, [q.id]: optionNumber }));
    }

    return (
        <VideoBackground>
            {/* Full height container with flex layout and custom scrollbar styles */}
            <div className="relative z-10 h-screen flex flex-col max-w-4xl mx-auto p-3">
                <style jsx>{`
                    /* Custom scrollbar styles for WebKit browsers */
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 8px;
                    }
                    
                    .custom-scrollbar::-webkit-scrollbar-track {
                        background: rgba(30, 41, 59, 0.3);
                        border-radius: 50px;
                        backdrop-filter: blur(10px);
                    }
                    
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background: linear-gradient(180deg, rgba(16, 185, 129, 0.6) 0%, rgba(20, 184, 166, 0.6) 100%);
                        border-radius: 50px;
                        border: 1px solid rgba(16, 185, 129, 0.2);
                        transition: all 0.3s ease;
                    }
                    
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                        background: linear-gradient(180deg, rgba(16, 185, 129, 0.8) 0%, rgba(20, 184, 166, 0.8) 100%);
                        border-color: rgba(16, 185, 129, 0.4);
                        box-shadow: 0 0 10px rgba(16, 185, 129, 0.3);
                    }
                    
                    /* Firefox scrollbar styling */
                    .custom-scrollbar {
                        scrollbar-width: thin;
                        scrollbar-color: rgba(16, 185, 129, 0.6) rgba(30, 41, 59, 0.3);
                    }
                `}</style>
                {/* Compact Header */}
                <div className="flex items-center justify-between mb-3 flex-shrink-0">
                    <button
                        onClick={onBack}
                        className="flex items-center px-4 py-2 bg-black/40 backdrop-blur-xl border border-emerald-400/20 rounded-xl text-slate-200 hover:text-white hover:border-emerald-400/40 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-emerald-500/10 group"
                    >
                        <svg className="w-4 h-4 mr-2 group-hover:text-emerald-300 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                    </button>

                    <div className="text-center relative">
                        <h3 className="text-xl lg:text-2xl font-bold text-white bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-xl">
                            {selectedQuiz}
                        </h3>
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 blur-xl rounded-full -z-10"></div>
                    </div>

                    {/* Compact Video status indicator */}
                    <div className="flex items-center space-x-2">
                        {videoLoaded && !videoError && (
                            <div className="flex items-center text-emerald-300 text-xs">
                                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-1 animate-pulse"></div>
                                HD
                            </div>
                        )}
                        {videoError && (
                            <div className="flex items-center text-amber-300 text-xs">
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Static
                            </div>
                        )}
                        <div className="w-16"></div>
                    </div>
                </div>

                {/* Compact Progress Section */}
                <div className="bg-black/30 backdrop-blur-xl border border-emerald-400/20 rounded-2xl p-4 mb-3 shadow-2xl shadow-emerald-500/10 relative overflow-hidden flex-shrink-0">
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-emerald-300 to-teal-400 rounded-full blur-2xl animate-pulse"></div>
                        <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tl from-cyan-300 to-green-400 rounded-full blur-2xl animate-pulse delay-1000"></div>
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                                <div className="bg-emerald-500/20 backdrop-blur-sm rounded-full px-3 py-1 border border-emerald-400/20">
                                    <span className="text-emerald-200 text-xs font-medium flex items-center">
                                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-1 animate-pulse"></div>
                                        {index + 1}/{quizQuestions.length}
                                    </span>
                                </div>
                                <div className="bg-teal-500/20 backdrop-blur-sm rounded-full px-3 py-1 border border-teal-400/20">
                                    <span className="text-teal-200 text-xs font-medium flex items-center">
                                        <div className="w-1.5 h-1.5 bg-teal-400 rounded-full mr-1 animate-pulse delay-300"></div>
                                        {answeredQuestions}/{quizQuestions.length}
                                    </span>
                                </div>
                            </div>

                            <div className="text-right">
                                <div className="text-lg font-bold text-white drop-shadow-lg">{Math.round(progress)}%</div>
                                <div className="text-xs text-emerald-200/80">Complete</div>
                            </div>
                        </div>

                        {/* Compact Progress Bar */}
                        <div className="relative">
                            <div className="w-full h-3 bg-slate-800/40 rounded-full overflow-hidden backdrop-blur-sm border border-slate-600/30">
                                <div
                                    className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-full transition-all duration-700 ease-out relative shadow-lg shadow-emerald-400/30"
                                    style={{ width: `${progress}%` }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-300/50 via-teal-300/50 to-cyan-300/50 animate-pulse"></div>
                                    <div className="absolute inset-0 bg-white/20 animate-pulse blur-sm"></div>
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-md"></div>
                        </div>
                    </div>
                </div>

                {/* Question Component - Flexible height with custom scrollbar */}
                <div className="flex-1 overflow-y-auto mb-3 custom-scrollbar">
                    <Question q={q} selected={answers[q.id]} choose={choose} />
                </div>

                {/* Compact Navigation Controls */}
                <div className="bg-black/30 backdrop-blur-xl border border-emerald-400/20 rounded-2xl p-4 shadow-2xl shadow-emerald-500/10 relative overflow-hidden flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-teal-500/5"></div>

                    <div className="relative z-10">
                        <div className="flex flex-col lg:flex-row justify-between items-center space-y-3 lg:space-y-0">
                            {/* Left: Previous Button */}
                            <div className="flex-1">
                                <button
                                    onClick={() => setIndex(index - 1)}
                                    disabled={index === 0}
                                    className={`
                                        flex items-center px-4 py-2 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm text-sm
                                        ${index === 0
                                            ? 'bg-slate-800/40 text-slate-400 cursor-not-allowed border border-slate-600/30'
                                            : 'bg-gradient-to-r from-slate-700/60 to-slate-800/60 hover:from-emerald-600/40 hover:to-teal-600/40 text-white hover:shadow-lg transform hover:scale-105 border border-slate-500/30 hover:border-emerald-400/30 shadow-lg shadow-emerald-500/10'
                                        }
                                    `}
                                >
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Previous
                                </button>
                            </div>

                            {/* Center: Compact Question Dots */}
                            <div className="flex items-center space-x-2 mx-6">
                                {quizQuestions.slice(Math.max(0, index - 2), Math.min(quizQuestions.length, index + 3)).map((_, idx) => {
                                    const actualIndex = Math.max(0, index - 2) + idx;
                                    const isAnswered = answers[quizQuestions[actualIndex].id];
                                    const isCurrent = actualIndex === index;

                                    return (
                                        <button
                                            key={actualIndex}
                                            onClick={() => setIndex(actualIndex)}
                                            className={`
                                                w-3 h-3 rounded-full transition-all duration-300 relative
                                                ${isCurrent
                                                    ? 'bg-emerald-400 scale-125 shadow-lg shadow-emerald-400/60'
                                                    : isAnswered
                                                        ? 'bg-teal-400 hover:scale-110 shadow-md shadow-teal-400/40'
                                                        : 'bg-slate-500 hover:bg-slate-400 hover:scale-110'
                                                }
                                            `}
                                        >
                                            {isCurrent && (
                                                <div className="absolute inset-0 bg-emerald-300/30 rounded-full animate-ping"></div>
                                            )}
                                        </button>
                                    );
                                })}
                                {quizQuestions.length > 5 && index < quizQuestions.length - 3 && (
                                    <span className="text-slate-300 mx-1 text-sm">...</span>
                                )}
                            </div>

                            {/* Right: Action Buttons */}
                            <div className="flex-1 flex justify-end space-x-2">
                                <button
                                    onClick={() => setIndex(index + 1)}
                                    disabled={index === quizQuestions.length - 1}
                                    className={`
                                        flex items-center px-4 py-2 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm text-sm
                                        ${index === quizQuestions.length - 1
                                            ? 'bg-slate-800/40 text-slate-400 cursor-not-allowed border border-slate-600/30'
                                            : 'bg-gradient-to-r from-emerald-600/60 to-teal-600/60 hover:from-emerald-500/70 hover:to-teal-500/70 text-white hover:shadow-lg transform hover:scale-105 border border-emerald-400/20 shadow-lg shadow-emerald-500/20'
                                        }
                                    `}
                                >
                                    Next
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>

                                <button
                                    onClick={onSubmit}
                                    className="bg-gradient-to-r from-cyan-600/70 to-blue-600/70 hover:from-cyan-500/80 hover:to-blue-500/80 text-white font-semibold px-6 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/30 backdrop-blur-sm border border-cyan-400/20 text-sm"
                                >
                                    Submit Quiz
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Compact Mobile Navigation */}
                <div className="mt-2 lg:hidden flex-shrink-0">
                    <div className="bg-black/30 backdrop-blur-xl border border-emerald-400/20 rounded-2xl p-3 shadow-2xl shadow-emerald-500/10">
                        <div className="text-center text-emerald-200 text-xs mb-2 font-medium flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-1 animate-pulse"></div>
                            Quick Navigation
                        </div>
                        <div className="flex flex-wrap justify-center gap-2">
                            {quizQuestions.map((_, qIndex) => {
                                const isAnswered = answers[quizQuestions[qIndex].id];
                                const isCurrent = qIndex === index;

                                return (
                                    <button
                                        key={qIndex}
                                        onClick={() => setIndex(qIndex)}
                                        className={`
                                            w-8 h-8 rounded-xl text-xs font-bold transition-all duration-300 backdrop-blur-sm relative
                                            ${isCurrent
                                                ? 'bg-gradient-to-br from-emerald-400 to-teal-400 text-slate-900 scale-110 shadow-lg shadow-emerald-400/50'
                                                : isAnswered
                                                    ? 'bg-gradient-to-br from-teal-500/60 to-cyan-500/60 text-white hover:scale-105 border border-teal-400/20'
                                                    : 'bg-slate-700/60 text-slate-200 hover:bg-slate-600/60 hover:scale-105 border border-slate-500/30'
                                            }
                                        `}
                                    >
                                        {qIndex + 1}
                                        {isCurrent && (
                                            <div className="absolute inset-0 bg-emerald-300/20 rounded-xl animate-pulse"></div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </VideoBackground>
    );
}