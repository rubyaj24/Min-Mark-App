import React, { useState } from "react";
import { calculateRequiredMarks } from "../utils/calculations";

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

    const getRiskColor = (risk) => {
        const colors = {
            SAFE: "text-green-400",
            MODERATE: "text-yellow-400",
            RISKY: "text-orange-400",
            IMPOSSIBLE: "text-red-400"
        };
        return colors[risk] || "text-white";
    };

    const getGradeColor = (grade) => {
        const colors = {
            'S': "text-purple-400",
            'A+': "text-blue-400",
            'A': "text-cyan-400",
            'B+': "text-teal-400",
            'B': "text-green-400",
            'C': "text-yellow-400",
            'P': "text-orange-400",
            'F': "text-red-400"
        };
        return colors[grade] || "text-white";
    };

    const requiredMarks = calculateRequiredMarks(data.internal);
    // const gradeRequirements = calculateGradeRequirements(data.internal);

    const isPossible = requiredMarks <= 60;

    // Determine risk level
    const getRiskLevel = (required) => {
        if (!isPossible) return "IMPOSSIBLE";
        if (required <= 30) return "SAFE";
        if (required <= 45) return "MODERATE";
        return "RISKY";
    };

    const risk = getRiskLevel(requiredMarks);

    return (
        <div className="w-full max-w-4xl lg:max-w-7xl mx-auto">
            <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-4 sm:p-6 lg:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                    {/* Main Subject Card */}
                    <div 
                        className="md:col-span-2 lg:row-span-2 group relative overflow-hidden 
                                 bg-gradient-to-br from-red-900/80 to-red-700/80 rounded-xl 
                                 p-4 sm:p-6 lg:p-8 hover:scale-[1.01] transition-all duration-700 
                                 ease-out shadow-lg hover:shadow-red-500/20"
                        onMouseMove={(e) => handleMouseMove(e, 'subject')}
                        onMouseLeave={handleMouseLeave}
                        style={cardStyle('subject')}
                    >
                        <div className="space-y-3 lg:space-y-4">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                                {data.subject.courseId}
                            </h2>
                            <div className="text-red-100/80">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-3 mt-4">
                                    <p>{data.subject.courseName}</p>
                                    <p>Credits: {data.subject.credits}</p>
                                </div>
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mt-4">
                                    <p className="text-lg sm:text-xl font-semibold">
                                        Total Marks: {data.subject.external+data.subject.internal} 
                                        <span className="text-sm font-normal">
                                            ({data.subject.external}+{data.subject.internal})
                                        </span>
                                    </p>
                                    <p className="text-lg sm:text-xl font-semibold">
                                        Your internal score: {data.internal}
                                    </p>
                                </div>
                                <div className="text-xl sm:text-2xl font-semibold mt-3">
                                    {isPossible ? (
                                        <span>
                                            You Need to score <span className="font-bold">{requiredMarks}</span> out of {data.subject.external} to pass
                                        </span>
                                    ) : (
                                        <span className="text-red-400">
                                            Cannot pass with current internal marks
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className={`text-lg ${getRiskColor(risk)} font-bold mt-2`}>
                                Risk Level: {risk}
                            </div>
                        </div>
                    </div>

                    {/* Grade Requirements Card - Spans 2 columns */}
                    <div 
                        className="md:col-span-2 group relative overflow-hidden 
                                 bg-gradient-to-br from-amber-900/80 to-amber-700/80 
                                 rounded-xl p-4 md:p-6 hover:scale-[1.01] transition-all 
                                 duration-700 ease-out shadow-lg hover:shadow-amber-500/20"
                        onMouseMove={(e) => handleMouseMove(e, 'Grade')}
                        onMouseLeave={handleMouseLeave}
                        style={cardStyle('Grade')}
                    >
                        <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                            Grade Requirements
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-3">
                            {data.gradeRequirements.map(({ grade, required, possible }) => (
                                <div key={grade} 
                                     className="flex justify-between items-center bg-black/20 
                                              rounded-lg p-2 backdrop-blur-sm">
                                    <span className={`${getGradeColor(grade)} font-bold`}>{grade}</span>
                                    <span className={possible ? "text-white" : "text-gray-500"}>
                                        {possible ? `${required}/60` : "N/A"}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Maximum Grade Card */}
                    <div 
                        className="group relative overflow-hidden bg-gradient-to-br 
                                 from-green-900/80 to-green-700/80 rounded-xl p-4 md:p-6 
                                 hover:scale-[1.01] transition-all duration-700 ease-out 
                                 shadow-lg hover:shadow-green-500/20 flex flex-col justify-between"
                        onMouseMove={(e) => handleMouseMove(e, 'final')}
                        onMouseLeave={handleMouseLeave}
                        style={cardStyle('final')}
                    >
                        <h2 className="text-xl md:text-2xl font-bold text-white">Max Grade</h2>
                        <div className={`text-3xl md:text-4xl font-bold ${getGradeColor(data.maxPossibleGrade)} 
                                      text-center my-4`}>
                            {data.maxPossibleGrade}
                        </div>
                    </div>

                    {/* Risk Level Card */}
                    <div 
                        className="group relative overflow-hidden bg-gradient-to-br 
                                 from-purple-900/80 to-purple-700/80 rounded-xl p-4 md:p-6 
                                 hover:scale-[1.01] transition-all duration-700 ease-out 
                                 shadow-lg hover:shadow-purple-500/20 flex flex-col justify-between"
                        onMouseMove={(e) => handleMouseMove(e, 'risk')}
                        onMouseLeave={handleMouseLeave}
                        style={cardStyle('risk')}
                    >
                        <h2 className="text-xl md:text-2xl font-bold text-white">Risk Level</h2>
                        <div className={`text-2xl md:text-3xl font-bold ${getRiskColor(data.risk)} 
                                      text-center my-4`}>
                            {data.risk}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Result;