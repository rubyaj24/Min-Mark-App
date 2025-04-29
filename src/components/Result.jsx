import React, { useState } from "react";

function Result({ data }) {
    const [activeCard, setActiveCard] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e, cardId) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
        setActiveCard(cardId);
    };

    const handleMouseLeave = () => {
        setActiveCard(null);
    };

    const cardStyle = (cardId) => ({
        background: activeCard === cardId 
            ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
                rgba(255,255,255,0.1), transparent 40%)`
            : undefined,
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
    });

    return (
        <div className="max-w-5xl mx-auto">
            <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-2xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    Analysis
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Subject Card */}
                    <div 
                        className="lg:col-span-2 group relative overflow-hidden bg-gradient-to-br 
                                 from-red-900/80 to-red-700/80 rounded-xl p-6 hover:scale-[1.01] 
                                 transition-all duration-700 ease-out shadow-lg 
                                 hover:shadow-red-500/20"
                        onMouseMove={(e) => handleMouseMove(e, 'subject')}
                        onMouseLeave={handleMouseLeave}
                        style={cardStyle('subject')}
                    >
                        <div className="flex flex-col space-y-1 transform transition-transform duration-500">
                            <h2 className="text-3xl font-bold text-white group-hover:text-red-400 text-left">
                                {data.subject.courseId}
                            </h2>
                            <div className="text-red-100/80 text-left">
                                <div className="flex flex-row justify-between mt-4">
                                    <p>{data.subject.courseName}</p>
                                    <p>Credits: {data.subject.credits}</p>
                                </div>
                                <div className="flex flex-row justify-between space-y-2 mt-4">
                                    <p className="text-xl font-semibold mt-2">
                                        Total Marks: {data.subject.external} 
                                        <span className="text-sm font-normal">
                                            ({data.subject.external - data.subject.internal}+{data.subject.internal})
                                        </span>
                                    </p>
                                    <p className="text-xl font-semibold mt-2">
                                        Your internal score: {data.internal}
                                    </p>
                                </div>
                                <p className="text-2xl font-semibold mt-2">
                                    You Need to score <span className="font-bold">{data.requiredMarks}</span> more to pass
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Grade Forecast */}
                    <div 
                        className="group relative overflow-hidden bg-gradient-to-br from-amber-900/80 to-amber-700/80 rounded-xl p-6 hover:scale-[1.01] transition-all duration-700 ease-out cursor-pointer shadow-lg hover:shadow-amber-500/20"
                        onMouseMove={(e) => handleMouseMove(e, 'Grade')}
                        onMouseLeave={handleMouseLeave}
                        style={cardStyle('Grade')}
                    >
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold text-white">Grade Forecast</h2>
                            <div className="grid grid-cols-2 text-amber-100/80">
                                <p className="text-2xl font-bold">S</p>
                                <p className="text-xl font-semibold">100-90</p>
                                <p className="text-2xl font-bold">A+</p>
                                <p className="text-xl font-semibold">90-85</p>
                                <p className="text-2xl font-bold">A</p>
                                <p className="text-xl font-semibold">85-70</p>
                                <p className="text-2xl font-bold">B+</p>
                                <p className="text-xl font-semibold">69</p>
                                <p className="text-2xl font-bold">B</p>
                                <p className="text-xl font-semibold">59</p>
                            </div>
                        </div>
                    </div>

                    {/* Regular Card */}
                    <div 
                        className="group relative overflow-hidden bg-gradient-to-br from-green-900/80 to-green-700/80 rounded-xl p-6 hover:scale-[1.01] transition-all duration-700 ease-out cursor-pointer shadow-lg hover:shadow-green-500/20"
                        onMouseMove={(e) => handleMouseMove(e, 'final')}
                        onMouseLeave={handleMouseLeave}
                        style={cardStyle('final')}
                    >
                        <h2 className="text-2xl font-bold mb-4 text-white">Final Score</h2>
                        <div className="space-y-3">
                            <p className="text-green-100/80">Total: <span className="text-2xl font-bold">89.5%</span></p>
                            <p className="text-green-100/80">Status: <span className="text-green-400 font-bold">PASSED</span></p>
                            <p className="text-green-100/80 font-bold">Congratulations! 🎉</p>
                        </div>
                    </div>

                    {/* Large Card - Spans 2 columns */}
                    <div 
                        className="group relative overflow-hidden bg-gradient-to-br from-purple-900/80 to-purple-700/80 rounded-xl p-6 hover:scale-[1.01] transition-all duration-700 ease-out cursor-pointer shadow-lg hover:shadow-purple-500/20 lg:col-span-2"
                        onMouseMove={(e) => handleMouseMove(e, 'info')}
                        onMouseLeave={handleMouseLeave}
                        style={cardStyle('info')}
                    >
                        <h2 className="text-2xl font-bold mb-4 text-white">Additional Info</h2>
                        <div className="space-y-3">
                            <p className="text-purple-100/80">Exam Date: <span className="font-semibold">25th April 2025</span></p>
                            <p className="text-purple-100/80">Duration: <span className="font-semibold">3 hours</span></p>
                            <p className="text-purple-100/80">Next Steps: <span className="text-purple-300 hover:text-purple-200 cursor-pointer">Download Certificate</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Result;