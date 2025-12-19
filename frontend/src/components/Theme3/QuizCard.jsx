import React from "react";

export default function QuizCard({ name, onClick, index = 0 }) {
    // Create a unique delay for each card based on index
    const animationDelay = `delay-${Math.min(index * 100, 1000)}`;

    return (
        <div
            onClick={onClick}
            className={`
                group relative cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-translate-y-2
                ${animationDelay}
            `}
        >
            {/* Main Card */}
            <div className="
                bg-black/30 backdrop-blur-xl border border-emerald-400/20 rounded-3xl p-6 lg:p-8 
                shadow-2xl shadow-emerald-500/10 relative overflow-hidden
                hover:border-emerald-400/40 hover:shadow-emerald-500/20
                transition-all duration-500 group-hover:bg-black/40
            ">
                {/* Organic flowing background pattern */}
                <div className="absolute inset-0 opacity-10 group-hover:opacity-15 transition-opacity duration-500">
                    <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-emerald-300 to-teal-400 rounded-full blur-2xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-teal-300 to-green-400 rounded-full blur-xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-green-300 to-emerald-400 rounded-full blur-lg animate-pulse delay-500"></div>
                </div>

                {/* Nature-inspired accent elements */}
                <div className="absolute top-0 left-0 h-full w-1.5 bg-gradient-to-b from-emerald-300 via-teal-400 to-green-400 rounded-r-full opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Top corner decorative elements */}
                <div className="absolute top-4 right-4 flex space-x-1">
                    <div className="w-1 h-1 bg-emerald-300/50 rounded-full animate-ping"></div>
                    <div className="w-0.5 h-0.5 bg-teal-300/60 rounded-full animate-ping delay-300"></div>
                    <div className="w-0.5 h-0.5 bg-green-300/40 rounded-full animate-ping delay-600"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center">
                    {/* Icon/Symbol */}
                    <div className="
                        w-16 h-16 lg:w-20 lg:h-20 mb-6 
                        bg-gradient-to-br from-emerald-400 via-teal-400 to-green-400 
                        rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-400/30
                        group-hover:shadow-2xl group-hover:shadow-emerald-400/40
                        transition-all duration-500 group-hover:scale-110 group-hover:rotate-3
                        backdrop-blur-sm border border-emerald-300/20
                    ">
                        {/* Quiz Icon */}
                        <svg
                            className="w-8 h-8 lg:w-10 lg:h-10 text-white drop-shadow-lg"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                            />
                        </svg>

                        {/* Inner glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-2xl group-hover:animate-pulse"></div>
                    </div>

                    {/* Quiz Name */}
                    <h3 className="
                        text-lg lg:text-xl font-bold text-white mb-3 
                        group-hover:text-emerald-100 transition-colors duration-500
                        drop-shadow-lg leading-tight
                    ">
                        {name}
                    </h3>

                    {/* Status Indicator */}
                    <div className="flex items-center text-sm text-emerald-200 group-hover:text-emerald-100 transition-colors duration-500">
                        <div className="w-2 h-2 bg-gradient-to-r from-emerald-300 to-teal-300 rounded-full mr-2 animate-pulse group-hover:animate-bounce"></div>
                        <span className="font-medium">Ready to Play</span>
                        <div className="w-1 h-1 bg-emerald-300 rounded-full ml-2 animate-ping group-hover:animate-bounce delay-300"></div>
                    </div>

                    {/* Action Hint */}
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                        <div className="flex items-center text-xs text-emerald-300 bg-emerald-900/30 px-3 py-1 rounded-full backdrop-blur-sm border border-emerald-400/20">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                            Click to Start
                        </div>
                    </div>
                </div>

                {/* Hover shimmer effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-100/5 via-teal-100/5 to-transparent transform -skew-x-12 animate-pulse"></div>
                </div>

                {/* Interactive particles that appear on hover */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-emerald-300/60 rounded-full animate-bounce delay-100"></div>
                    <div className="absolute top-3/4 right-1/4 w-0.5 h-0.5 bg-teal-300/70 rounded-full animate-bounce delay-300"></div>
                    <div className="absolute top-1/2 right-1/3 w-0.5 h-0.5 bg-green-300/50 rounded-full animate-bounce delay-500"></div>
                    <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-cyan-300/40 rounded-full animate-bounce delay-700"></div>
                </div>
            </div>

            {/* Card glow effects */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-400/5 via-teal-400/5 to-green-400/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 -z-20 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 group-hover:animate-pulse"></div>

            {/* Ripple effect on click */}
            <div className="absolute inset-0 rounded-3xl bg-emerald-400/10 opacity-0 group-active:opacity-100 group-active:animate-ping transition-opacity duration-200"></div>
        </div>
    );
}