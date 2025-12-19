import React from "react";
import QuizCard from "./QuizCard";
import anime_rain from '../../../public/assets/anime_rain.mp4'
import { useNavigate } from "react-router-dom";


export default function QuizList({ questions, onSelectQuiz }) {
    if (questions.length === 0) {
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

                {/* Empty state content */}
                <div className="relative z-10 flex items-center justify-center min-h-screen">
                    <div className="bg-black/30 backdrop-blur-xl border border-emerald-400/20 rounded-3xl p-12 text-center shadow-2xl shadow-emerald-500/10 relative overflow-hidden max-w-2xl mx-4">
                        {/* Background decoration */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-emerald-300 to-teal-400 rounded-full blur-3xl animate-pulse"></div>
                            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-teal-300 to-green-400 rounded-full blur-2xl animate-pulse delay-1000"></div>
                        </div>

                        <div className="relative z-10">
                            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-xl shadow-emerald-400/30">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-4">No Quizzes Available</h3>
                            <p className="text-emerald-200 text-lg">Create your first quiz in the Django admin panel to get started!</p>

                            <div className="flex items-center justify-center mt-6">
                                <div className="w-2 h-2 bg-emerald-300 rounded-full mr-2 animate-bounce"></div>
                                <div className="w-2 h-2 bg-teal-300 rounded-full mr-2 animate-bounce delay-300"></div>
                                <div className="w-2 h-2 bg-green-300 rounded-full animate-bounce delay-600"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const quizNames = [...new Set(questions.map((q) => q.quiz_name))];
    const navigate = useNavigate();
    const gotoDashboard = () => {
      navigate('/theme3dashboard');
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
                <div className="absolute top-1/5 left-3/4 w-1 h-1 bg-teal-400/35 rounded-full animate-ping delay-6000"></div>
                <div className="absolute bottom-1/3 right-1/5 w-1.5 h-1.5 bg-green-400/25 rounded-full animate-pulse delay-7000"></div>
            </div>

            {/* Scrollable content */}
            <div className="relative z-10 max-w-6xl mx-auto p-4 py-8">
                {/* Header Section */}
                <div className="text-center mb-12">
                    {/* Status Badge */}
                    <div className="inline-flex items-center bg-emerald-800/40 backdrop-blur-lg border border-emerald-400/30 rounded-full px-6 py-3 mb-8">
                        <div className="flex items-center mr-3">
                            <i onClick={gotoDashboard} className="fa-solid fa-arrow-left" style={{ marginRight: "20px", color: "white", cursor:'pointer' }}></i>
                            <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
                            <div className="w-1.5 h-1.5 bg-green-300 rounded-full ml-1 animate-ping"></div>
                        </div>
                        <span className="text-emerald-200 text-sm uppercase tracking-wide font-medium">Quiz Portal</span>
                    </div>

                    {/* Main Title */}
                    <div className="relative">
                        <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
                            Choose Your
                            <span className="block bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 bg-clip-text text-transparent animate-pulse">
                                Adventure
                            </span>
                        </h1>

                        {/* Decorative elements */}
                        <div className="flex items-center justify-center mt-6 mb-8">
                            <div className="flex items-center">
                                <div className="w-1 h-8 bg-gradient-to-b from-emerald-400 to-teal-400 rounded-full mr-2 animate-pulse"></div>
                                <div className="w-0.5 h-6 bg-gradient-to-b from-teal-300 to-green-400 rounded-full mr-2 animate-pulse delay-300"></div>
                                <div className="w-0.5 h-4 bg-gradient-to-b from-green-300 to-emerald-400 rounded-full mr-4 animate-pulse delay-600"></div>
                            </div>

                            <div className="text-xl text-emerald-200 font-medium px-6">
                                Select a Quiz to Begin
                            </div>

                            <div className="flex items-center">
                                <div className="w-0.5 h-4 bg-gradient-to-b from-emerald-400 to-green-300 rounded-full ml-4 animate-pulse delay-600"></div>
                                <div className="w-0.5 h-6 bg-gradient-to-b from-green-400 to-teal-300 rounded-full ml-2 animate-pulse delay-300"></div>
                                <div className="w-1 h-8 bg-gradient-to-b from-teal-400 to-emerald-400 rounded-full ml-2 animate-pulse"></div>
                            </div>
                        </div>

                        {/* Quiz count indicator */}
                        <div className="inline-flex items-center bg-black/20 backdrop-blur-sm border border-emerald-400/20 rounded-full px-4 py-2">
                            <div className="w-2 h-2 bg-gradient-to-r from-emerald-300 to-teal-300 rounded-full mr-3 animate-pulse"></div>
                            <span className="text-emerald-200 text-sm font-medium">
                                {quizNames.length} Quiz{quizNames.length !== 1 ? 'es' : ''} Available
                            </span>
                            <div className="w-1 h-1 bg-emerald-300 rounded-full ml-2 animate-ping"></div>
                        </div>
                    </div>
                </div>

                {/* Quiz Cards Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {quizNames.map((name, idx) => (
                        <div key={idx} className="transform transition-all duration-300 hover:scale-105">
                            <QuizCard
                                name={name}
                                onClick={() => onSelectQuiz(name)}
                                index={idx}
                            />
                        </div>
                    ))}
                </div>

                {/* Bottom Decorative Section */}
                <div className="mt-16 text-center">
                    <div className="inline-flex items-center bg-emerald-900/20 backdrop-blur-sm border border-emerald-400/20 rounded-full px-6 py-3">
                        <div className="flex space-x-1 mr-3">
                            <div className="w-1.5 h-1.5 bg-emerald-300/60 rounded-full animate-bounce"></div>
                            <div className="w-1.5 h-1.5 bg-teal-300/60 rounded-full animate-bounce delay-150"></div>
                            <div className="w-1.5 h-1.5 bg-green-300/60 rounded-full animate-bounce delay-300"></div>
                        </div>
                        <span className="text-emerald-200/80 text-sm">Ready to test your knowledge?</span>
                    </div>
                </div>

                {/* Organic Background Elements */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
                    <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-gradient-to-br from-emerald-300 to-teal-400 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/6 w-48 h-48 bg-gradient-to-tl from-teal-300 to-green-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-green-300 to-emerald-400 rounded-full blur-2xl animate-pulse delay-500"></div>
                </div>
            </div>
        </div>
    );
}