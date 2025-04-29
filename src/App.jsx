import { useState } from 'react'
import Form from './components/Form'
import Result from './components/Result'
import './App.css'

function App() {
  const [resultData, setResultData] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(true);

  const handleCalculate = (formData) => {
    setIsFormVisible(false); // Hide form first
    setTimeout(() => {
      setResultData(formData); // Show results after form fades out
    }, 300); // Match this with transition duration
  };

  const handleReset = () => {
    setResultData(null);
    setTimeout(() => {
      setIsFormVisible(true);
    }, 300);
  };

  return(
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Minimum Mark Calculator
          </h1>
          <p className="text-sm md:text-base text-gray-400">
            Calculate the minimum marks required to pass your exam.
            <br />
            Github Repo:
            <a href="https://github.com/rubyaj24/Min-Mark-App" target="_blank" rel="noopener noreferrer"> Here</a>
          </p>
        </header>

        <main className="relative min-h-[500px]"> {/* Fixed height container */}
          <div className={`absolute inset-0 transition-all duration-300 ease-in-out
            ${isFormVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
            <Form onCalculate={handleCalculate} />
          </div>

          <div className={`absolute inset-0 transition-all duration-300 ease-in-out
            ${!isFormVisible && resultData ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
            {resultData && (
              <div className="h-full">
                <Result data={resultData} />
                <button
                  onClick={handleReset}
                  className="mt-4 px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors mx-auto block"
                >
                  Calculate Another
                </button>
              </div>
            )}
          </div>
        </main>

        <footer className="pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400 text-xs">
            Made with ❤️ by AJ
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App