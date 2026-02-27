import React, { useState, useEffect } from "react";
import courseData from "../coursedata_new.json";
import { calculateGradeRequirements } from "../utils/calculations";

function Form({ onCalculate }) {
    const [selectedScheme, setSelectedScheme] = useState("");
    const [selectedBranch, setSelectedBranch] = useState("");
    const [selectedSemester, setSelectedSemester] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");
    const [internalMarks, setInternalMarks] = useState("");
    const [subjects, setSubjects] = useState([]);

    // Get available schemes from courseData
    const schemes = Object.keys(courseData);

    // Get available branches for selected scheme
    const branches = selectedScheme ? Object.keys(courseData[selectedScheme]) : [];

    // Get available semesters for selected scheme and branch
    const semesters = selectedScheme && selectedBranch
        ? Object.keys(courseData[selectedScheme][selectedBranch])
        : [];

    // Update subjects when scheme, branch or semester changes
    useEffect(() => {
        if (selectedScheme && selectedBranch && selectedSemester) {
            setSubjects(courseData[selectedScheme][selectedBranch][selectedSemester]);
            setSelectedSubject(""); // Reset subject when semester changes
        }
    }, [selectedScheme, selectedBranch, selectedSemester]);

    const handleSchemeChange = (event) => {
        setSelectedScheme(event.target.value);
        setSelectedBranch("");
        setSelectedSemester(""); // Reset semester when scheme changes
        setSelectedSubject(""); // Reset subject when scheme changes
    };

    const handleBranchChange = (event) => {
        setSelectedBranch(event.target.value);
        setSelectedSemester("");
        setSelectedSubject("");
    };

    const handleSemesterChange = (event) => {
        setSelectedSemester(event.target.value);
    };

    const handleSubjectChange = (event) => {
        setSelectedSubject(event.target.value);
    };

    const handleMarksChange = (event) => {
        const value = event.target.value;
        const subject = subjects.find(sub => sub.courseId === selectedSubject);
        const maxInternal = subject ? subject.internal : 50;
        if (value === "" || (Number(value) >= 0 && Number(value) <= maxInternal)) {
            setInternalMarks(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const internal = parseInt(internalMarks);
        const subject = subjects.find(sub => sub.courseId === selectedSubject);
        

        const minEseRequired = Math.max(45 - internal, 24); //ESE - End Semester Exam

        
        let risk = "IMPOSSIBLE";
        if (minEseRequired <= 30) risk = "SAFE";
        else if (minEseRequired <= 45) risk = "MODERATE";
        else if (minEseRequired <= 60) risk = "RISKY";

        
        const gradeRequirements = calculateGradeRequirements(internal);

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
                    {/* Scheme Selection */}
                    <div className="space-y-2 lg:space-y-3">
                        <label className="text-sm lg:text-base font-medium text-gray-300">
                            Select Scheme
                        </label>
                        <select
                            value={selectedScheme}
                            onChange={handleSchemeChange}
                            className="w-full px-4 py-2.5 lg:py-3 rounded-xl bg-gray-800/50 
                                     text-white text-sm lg:text-base border border-gray-700 
                                     focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Choose Scheme</option>
                            {schemes.map((scheme) => (
                                <option key={scheme} value={scheme}>
                                    {scheme}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Branch Selection */}
                    <div className="space-y-2 lg:space-y-3">
                        <label className="text-sm lg:text-base font-medium text-gray-300">
                            Select Branch
                        </label>
                        <select
                            value={selectedBranch}
                            onChange={handleBranchChange}
                            disabled={!selectedScheme}
                            className="w-full px-4 py-2.5 lg:py-3 rounded-xl bg-gray-800/50
                                     text-white text-sm lg:text-base border border-gray-700
                                     focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                            <option value="">Choose Branch</option>
                            {branches.map((branch) => (
                                <option key={branch} value={branch}>
                                    {branch}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Semester Selection */}
                    <div className="space-y-2 lg:space-y-3">
                        <label className="text-sm lg:text-base font-medium text-gray-300">
                            Select Semester
                        </label>
                        <select
                            value={selectedSemester}
                            onChange={handleSemesterChange}
                            disabled={!selectedBranch}
                            className="w-full px-4 py-2.5 lg:py-3 rounded-xl bg-gray-800/50 
                                     text-white text-sm lg:text-base border border-gray-700 
                                     focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
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
                            Internal Marks (0-
                            {subjects.find(sub => sub.courseId === selectedSubject)?.internal || "50"})
                        </label>
                        <input
                            type="number"
                            value={internalMarks}
                            onChange={handleMarksChange}
                            placeholder="Enter internal marks"
                            min="0"
                            max={subjects.find(sub => sub.courseId === selectedSubject)?.internal || "50"}
                            className="w-full px-4 py-2.5 lg:py-3 rounded-xl bg-gray-800/50 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!selectedScheme || !selectedBranch || !selectedSemester || !selectedSubject || !internalMarks}
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