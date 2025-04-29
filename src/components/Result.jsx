import React from "react";

function Result() {
    return (
        <>
        <div className="flex flex-col my-3 w-[80vw] items-center justify-center h-screen bg-black/10 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Results</h2>
            <div className="bg-blue-950 shadow-md rounded-lg p-6 w-80">
                <h2 className="text-xl font-semibold mb-4">Analysis</h2>
                <p className="text-white">You need to score at least <span className="font-bold">50%</span> in the final exam.</p>
                <p className="text-white mt-4">Make sure to review your materials thoroughly.</p>
                <p className="text-white mt-4 font-bold">Good luck!</p>
            </div>
            <div className="bg-green-950 shadow-md rounded-lg p-6 w-80 mt-4">
                <h2 className="text-xl font-semibold mb-4">Final Score</h2>
                <p className="text-white">Your final score is: <span className="font-bold">75%</span></p>
                <p className="text-white mt-4">You have passed the exam!</p>
                <p className="text-white mt-4 font-bold">Congratulations!</p>
            </div>
        </div>
        </>
    )
}

export default Result;