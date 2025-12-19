import React from "react";

export default function Question({ q, selected, choose }) {
    const options = [
        { value: "1", text: q.quiz_option_1, letter: "A" },
        { value: "2", text: q.quiz_option_2, letter: "B" },
        { value: "3", text: q.quiz_option_3, letter: "C" },
        { value: "4", text: q.quiz_option_4, letter: "D" }
    ];

    return (
        <div className="bg-black/30 backdrop-blur-xl border border-emerald-400/20 rounded-3xl p-8 shadow-2xl shadow-emerald-500/10 relative overflow-hidden">
            {/* Organic flowing background pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-emerald-300 to-teal-400 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-cyan-300 to-blue-400 rounded-full blur-2xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-gradient-to-r from-green-300 to-emerald-400 rounded-full blur-xl animate-pulse delay-500"></div>
            </div>

            {/* Question Header with organic elements */}
            <div className="mb-8 relative z-10">
                <div className="flex items-center mb-6">
                    {/* Nature-inspired accent */}
                    <div className="flex items-center mr-4">
                        <div className="w-2 h-8 bg-gradient-to-b from-emerald-400 via-green-400 to-teal-500 rounded-full mr-2 animate-pulse"></div>
                        <div className="w-1 h-6 bg-gradient-to-b from-teal-300 to-cyan-400 rounded-full animate-pulse delay-300"></div>
                        <div className="w-0.5 h-4 bg-gradient-to-b from-green-300 to-emerald-400 rounded-full ml-1 animate-pulse delay-600"></div>
                    </div>
                    <div className="text-emerald-200 text-sm font-medium uppercase tracking-wider flex items-center">
                        <span>Question</span>
                        <div className="w-2 h-2 bg-emerald-400 rounded-full ml-2 animate-ping"></div>
                    </div>
                </div>

                <p className="text-xl lg:text-2xl text-white leading-relaxed font-medium drop-shadow-lg">
                    {q.quiz_question}
                </p>
            </div>

            {/* Options with nature-inspired design */}
            <div className="space-y-5 relative z-10">
                {options.map((option, index) => (
                    <div key={option.value} className="relative group">
                        <label className={`
                            flex items-center p-6 lg:p-7 rounded-2xl cursor-pointer transition-all duration-500 border-2 relative overflow-hidden
                            ${selected === option.value
                                ? 'bg-gradient-to-r from-emerald-600/25 via-teal-500/20 to-cyan-600/25 border-emerald-400/50 shadow-xl shadow-emerald-500/20 scale-[1.03] backdrop-blur-2xl'
                                : 'bg-slate-800/40 border-slate-600/30 hover:border-emerald-400/40 hover:bg-gradient-to-r hover:from-emerald-900/20 hover:to-teal-900/20 hover:scale-[1.01] backdrop-blur-xl'
                            }
                        `}>
                            {/* Flowing background effect */}
                            <div className={`
                                absolute inset-0 bg-gradient-to-r from-emerald-400/5 via-transparent to-teal-400/5 
                                opacity-0 transition-all duration-500
                                ${selected === option.value ? 'opacity-100 animate-pulse' : 'group-hover:opacity-100'}
                            `}></div>

                            {/* Nature-inspired particles */}
                            {selected === option.value && (
                                <>
                                    <div className="absolute top-2 right-2 w-1 h-1 bg-emerald-300 rounded-full animate-ping"></div>
                                    <div className="absolute bottom-3 left-3 w-0.5 h-0.5 bg-teal-300 rounded-full animate-ping delay-300"></div>
                                    <div className="absolute top-1/2 right-4 w-0.5 h-0.5 bg-cyan-300 rounded-full animate-ping delay-700"></div>
                                </>
                            )}

                            {/* Enhanced Custom Radio Button */}
                            <div className="relative z-10 mr-5 lg:mr-6">
                                <input
                                    type="radio"
                                    name={`q_${q.id}`}
                                    checked={selected === option.value}
                                    onChange={() => choose(option.value)}
                                    className="sr-only"
                                />

                                {/* Outer organic circle */}
                                <div className={`
                                    w-7 h-7 lg:w-8 lg:h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500 relative
                                    ${selected === option.value
                                        ? 'border-emerald-400 bg-gradient-to-br from-emerald-500/30 to-teal-500/30 shadow-lg shadow-emerald-500/40 backdrop-blur-sm'
                                        : 'border-slate-400 group-hover:border-emerald-400/70 group-hover:shadow-md group-hover:shadow-emerald-400/20'
                                    }
                                `}>
                                    {/* Inner glowing dot */}
                                    <div className={`
                                        w-4 h-4 lg:w-5 lg:h-5 rounded-full transition-all duration-500 relative
                                        ${selected === option.value
                                            ? 'bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 scale-100 shadow-lg shadow-emerald-300/50'
                                            : 'scale-0'
                                        }
                                    `}>
                                        {/* Inner glow effect */}
                                        {selected === option.value && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-200 to-teal-200 rounded-full animate-pulse blur-sm"></div>
                                        )}
                                    </div>

                                    {/* Ripple effect for selected */}
                                    {selected === option.value && (
                                        <>
                                            <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping"></div>
                                            <div className="absolute inset-0 rounded-full bg-teal-400/15 animate-ping delay-300"></div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Option Text with better contrast */}
                            <div className="flex-1 relative z-10">
                                <span className={`
                                    text-base lg:text-lg font-medium transition-all duration-500
                                    ${selected === option.value
                                        ? 'text-white drop-shadow-lg'
                                        : 'text-slate-100 group-hover:text-white drop-shadow-md'
                                    }
                                `}>
                                    {option.text}
                                </span>
                            </div>

                            {/* Nature-inspired Letter Badge */}
                            <div className={`
                                relative z-10 w-10 h-10 lg:w-12 lg:h-12 rounded-2xl flex items-center justify-center text-sm lg:text-base font-bold transition-all duration-500 backdrop-blur-sm
                                ${selected === option.value
                                    ? 'bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 text-slate-900 shadow-xl shadow-emerald-400/30'
                                    : 'bg-slate-700/60 text-slate-200 group-hover:bg-gradient-to-br group-hover:from-emerald-500/40 group-hover:to-teal-500/40 group-hover:text-white group-hover:shadow-lg'
                                }
                            `}>
                                {option.letter}
                                {/* Letter badge glow */}
                                {selected === option.value && (
                                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/30 to-teal-300/30 rounded-2xl blur-md"></div>
                                )}
                            </div>

                            {/* Organic selection indicator */}
                            <div className={`
                                absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-emerald-300 via-teal-400 to-cyan-400 rounded-r-full transition-all duration-500
                                ${selected === option.value ? 'opacity-100 shadow-lg shadow-emerald-400/50' : 'opacity-0'}
                            `}></div>

                            {/* Enhanced shimmer effect */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-100/10 via-teal-100/10 to-transparent transform -skew-x-12 animate-pulse"></div>
                            </div>
                        </label>

                        {/* Enhanced glow for selected option */}
                        {selected === option.value && (
                            <>
                                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-400/15 via-teal-400/10 to-cyan-400/15 rounded-2xl blur-xl"></div>
                                <div className="absolute inset-0 -z-20 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-3xl blur-2xl animate-pulse"></div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            {/* Enhanced Selection Status */}
            <div className="mt-8 flex items-center justify-center relative z-10">
                {selected ? (
                    <div className="flex items-center text-emerald-200 text-sm bg-emerald-900/30 px-4 py-2 rounded-full backdrop-blur-sm border border-emerald-400/20">
                        <div className="w-2 h-2 bg-gradient-to-r from-emerald-300 to-teal-300 rounded-full mr-3 animate-pulse shadow-md shadow-emerald-300/50"></div>
                        <span className="font-medium">Option {options.find(opt => opt.value === selected)?.letter} selected</span>
                        <div className="w-1 h-1 bg-emerald-300 rounded-full ml-2 animate-ping"></div>
                    </div>
                ) : (
                    <div className="flex items-center text-slate-300 text-sm bg-slate-800/40 px-4 py-2 rounded-full backdrop-blur-sm border border-slate-600/30">
                        <div className="w-2 h-2 bg-slate-400 rounded-full mr-3 animate-pulse"></div>
                        <span>Choose an option to continue</span>
                    </div>
                )}
            </div>

            {/* Floating nature particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-emerald-300/40 rounded-full animate-bounce delay-1000"></div>
                <div className="absolute top-3/4 right-1/4 w-0.5 h-0.5 bg-teal-300/40 rounded-full animate-bounce delay-2000"></div>
                <div className="absolute top-1/2 right-1/3 w-0.5 h-0.5 bg-cyan-300/40 rounded-full animate-bounce delay-3000"></div>
            </div>
        </div>
    );
}