import React, { useState, useEffect } from "react";
import courseData from "../coursedata.json";

function Form({ onCalculate }) {
    const [selectedSemester, setSelectedSemester] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");
    const [internalMarks, setInternalMarks] = useState("");
    const [subjects, setSubjects] = useState([]);

    // Get available semesters from courseData
    const semesters = Object.keys(courseData);

    // Update subjects when semester changes
    useEffect(() => {
        if (selectedSemester) {
            setSubjects(courseData[selectedSemester]);
            setSelectedSubject(""); // Reset subject when semester changes
        }
    }, [selectedSemester]);

    const handleSemesterChange = (event) => {
        setSelectedSemester(event.target.value);
    };

    const handleSubjectChange = (event) => {
        setSelectedSubject(event.target.value);
    };

    const handleMarksChange = (event) => {
        const value = event.target.value;
        if (value === "" || (Number(value) >= 0 && Number(value) <= 50)) {
            setInternalMarks(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const internal = parseInt(internalMarks);
        const subject = subjects.find(sub => sub.courseId === selectedSubject);
        
        // Basic calculations
        const minEseRequired = Math.max(45 - internal, 24); // Minimum ESE marks needed
        const maxPossibleTotal = internal + 60; // Maximum possible total

        // Grade feasibility calculations
        const gradeFeasibility = {
            O:  { min: 90, possible: maxPossibleTotal >= 90 },
            'A+': { min: 85, possible: maxPossibleTotal >= 85 },
            A:  { min: 80, possible: maxPossibleTotal >= 80 },
            'B+': { min: 70, possible: maxPossibleTotal >= 70 },
            B:  { min: 60, possible: maxPossibleTotal >= 60 },
            C:  { min: 50, possible: maxPossibleTotal >= 50 },
            P:  { min: 45, possible: maxPossibleTotal >= 45 }
        };

        // Risk assessment
        let risk = "IMPOSSIBLE";
        if (minEseRequired <= 30) risk = "SAFE";
        else if (minEseRequired <= 45) risk = "MODERATE";
        else if (minEseRequired <= 60) risk = "RISKY";

        // Calculate required marks for each grade
        const gradeRequirements = Object.entries(gradeFeasibility).map(([grade, data]) => ({
            grade,
            required: Math.max(data.min - internal, 24),
            possible: data.possible && (data.min - internal) <= 60
        }));

        const analysisData = {
            semesterName: selectedSemester,
            subject,
            internal,
            minEseRequired,
            risk,
            gradeRequirements,
            maxPossibleGrade: gradeRequirements.find(g => g.possible)?.grade || 'F'
        };

        onCalculate(analysisData);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-3xl lg:max-w-4xl mx-auto">
            <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 lg:p-10">
                <div className="grid gap-6 lg:gap-8">
                    {/* Form Fields */}
                    <div className="space-y-2 lg:space-y-3">
                        <label className="text-sm lg:text-base font-medium text-gray-300">
                            Select Semester
                        </label>
                        <select
                            value={selectedSemester}
                            onChange={handleSemesterChange}
                            className="w-full px-4 py-2.5 lg:py-3 rounded-xl bg-gray-800/50 
                                     text-white text-sm lg:text-base border border-gray-700 
                                     focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Choose Semester</option>
                            {semesters.map((semester) => (
                                <option key={semester} value={semester}>
                                    {semester.replace(/semester/, 'Semester ')}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Subject Selection */}
                    <div className="space-y-2 lg:space-y-3">
                        <label className="text-sm lg:text-base font-medium text-gray-300">
                            Select Subject
                        </label>
                        <select
                            value={selectedSubject}
                            onChange={handleSubjectChange}
                            disabled={!selectedSemester}
                            className="w-full px-4 py-2.5 lg:py-3 rounded-xl bg-gray-800/50 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                            <option value="">Choose Subject</option>
                            {subjects.map((subject) => (
                                <option key={subject.courseId} value={subject.courseId}>
                                    {subject.courseName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Internal Marks Input */}
                    <div className="space-y-2 lg:space-y-3">
                        <label className="text-sm lg:text-base font-medium text-gray-300">
                            Internal Marks (0-50)
                        </label>
                        <input
                            type="number"
                            value={internalMarks}
                            onChange={handleMarksChange}
                            placeholder="Enter internal marks"
                            min="0"
                            max="50"
                            className="w-full px-4 py-2.5 lg:py-3 rounded-xl bg-gray-800/50 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!selectedSemester || !selectedSubject || !internalMarks}
                        className="w-full py-3 lg:py-4 px-4 bg-blue-600 text-white 
                                 text-base lg:text-lg font-medium rounded-xl 
                                 hover:bg-blue-700 transition-all duration-200 
                                 disabled:opacity-50 disabled:cursor-not-allowed
                                 transform hover:scale-[1.02] focus:outline-none 
                                 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                                 focus:ring-offset-gray-900"
                    >
                        Calculate Required Marks
                    </button>
                </div>
            </div>
        </form>
    );
}

export default Form;