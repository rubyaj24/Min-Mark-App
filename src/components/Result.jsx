import React from "react";

function Result() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-4">
            <div className="flex flex-col my-3 w-[90vw] mx-auto items-center justify-center gap-6 bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-xl p-6 shadow-xl">
                <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Results</h2>
                
                {/* Top Row Flex Container */}
                <div className="flex flex-col md:flex-row gap-6 w-full">
                    <div className="flex-1 bg-gray-950 shadow-xl rounded-xl p-6 hover:scale-105 transition-transform">
                        <h2 className="text-2xl font-semibold mb-4 text-white">Subject Details</h2>
                        <div className="flex flex-col gap-3">
                            <p className="text-gray-300">Subject: Computer Science</p>
                            <p className="text-gray-300">Code: CS101</p>
                            <p className="text-gray-300">Semester: 3</p>
                        </div>
                    </div>

                    <div className="flex-1 bg-blue-950 shadow-xl rounded-xl p-6 hover:scale-105 transition-transform">
                        <h2 className="text-2xl font-semibold mb-4 text-white">Analysis</h2>
                        <div className="flex flex-col gap-3">
                            <p className="text-gray-300">Internal Mark: <span className="font-bold">40/50</span></p>
                            <p className="text-gray-300">Required Mark: <span className="font-bold">10/50</span></p>
                            <p className="text-gray-300 font-bold">You're on track!</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Row Flex Container */}
                <div className="flex flex-col md:flex-row gap-6 w-full">
                    <div className="flex-1 bg-green-950 shadow-xl rounded-xl p-6 hover:scale-105 transition-transform">
                        <h2 className="text-2xl font-semibold mb-4 text-white">Final Score</h2>
                        <div className="flex flex-col gap-3">
                            <p className="text-gray-300">Total: <span className="font-bold">75%</span></p>
                            <p className="text-gray-300">Status: <span className="text-green-400 font-bold">PASSED</span></p>
                            <p className="text-gray-300 font-bold">Congratulations!</p>
                        </div>
                    </div>

                    <div className="flex-1 bg-purple-950 shadow-xl rounded-xl p-6 hover:scale-105 transition-transform">
                        <h2 className="text-2xl font-semibold mb-4 text-white">Additional Info</h2>
                        <div className="flex flex-col gap-3">
                            <p className="text-gray-300">Exam Date: 25th April 2025</p>
                            <p className="text-gray-300">Duration: 3 hours</p>
                            <p className="text-gray-300">Next Steps: Download Certificate</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Result;