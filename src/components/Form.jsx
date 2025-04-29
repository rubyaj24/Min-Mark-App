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
        const selectedSubjectData = subjects.find(
            subject => subject.courseId === selectedSubject
        );
        
        const formData = {
            semesterName: selectedSemester,
            subject: selectedSubjectData,
            internal: parseInt(internalMarks),
            requiredMarks: Math.max(0, 50 - parseInt(internalMarks))
        };
        
        onCalculate(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white text-center">
                    Enter Your Details
                </h2>
                
                <div className="grid gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">
                            Select Semester
                        </label>
                        <select
                            value={selectedSemester}
                            onChange={handleSemesterChange}
                            className="w-full px-4 py-2.5 rounded-xl bg-gray-800/50 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">
                            Select Subject
                        </label>
                        <select
                            value={selectedSubject}
                            onChange={handleSubjectChange}
                            disabled={!selectedSemester}
                            className="w-full px-4 py-2.5 rounded-xl bg-gray-800/50 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
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
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">
                            Internal Marks (0-50)
                        </label>
                        <input
                            type="number"
                            value={internalMarks}
                            onChange={handleMarksChange}
                            placeholder="Enter internal marks"
                            min="0"
                            max="50"
                            className="w-full px-4 py-2.5 rounded-xl bg-gray-800/50 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!selectedSemester || !selectedSubject || !internalMarks}
                        className="w-full py-3 px-4 bg-blue-600 text-white rounded-xl font-medium
                                 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500
                                 disabled:opacity-50 disabled:cursor-not-allowed
                                 transition-all duration-200 mt-4"
                    >
                        Calculate Required Marks
                    </button>
                </div>
            </div>
        </form>
    );
}

export default Form;