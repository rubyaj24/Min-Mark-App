import { useState } from 'react'
import Form from './components/Form'
import Result from './components/Result'
import './styles/gradients.css' // Add this import

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
    <div className="min-h-min min-w-screen bg-gradient-to-br from-gray-900 to-gray-800 overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {/* Header Section */}
        <header className="w-full max-w-6xl mx-auto text-center space-y-4 mb-8 lg:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold animated-gradient-text tracking-tight">
            Minimum Mark Calculator
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-400 max-w-3xl mx-auto">
            Calculate the minimum marks required to pass your exam.
            <br />
            <span className="inline-flex items-center gap-2 mt-2">
              <a 
                href="https://github.com/rubyaj24/Min-Mark-App" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Github Repo
              </a>
            </span>
          </p>
        </header>

        {/* Main Content */}
        <main className="relative min-h-[600px] lg:min-h-[800px] w-full max-w-7xl mx-auto">
          {/* Form Container */}
          <div 
            className={`absolute inset-0 w-full transition-all duration-300 ease-in-out
              ${isFormVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
          >
            <Form onCalculate={handleCalculate} />
          </div>

          {/* Result Container */}
          <div 
            className={`absolute inset-0 w-full transition-all duration-300 ease-in-out
              ${!isFormVisible && resultData ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
          >
            {resultData && (
              <div className="h-full w-full flex flex-col items-center">
                <Result data={resultData} />
                <button
                  onClick={handleReset}
                  className="mt-8 lg:mt-12 px-8 py-3 lg:px-10 lg:py-4 bg-gray-700 
                           text-white text-base lg:text-lg rounded-xl 
                           hover:bg-gray-600 transition-all duration-200 
                           transform hover:scale-105 focus:outline-none 
                           focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 
                           focus:ring-offset-gray-900"
                >
                  Calculate Another
                </button>
              </div>
            )}
          </div>
        </main>

        <footer className="w-full max-w-6xl mx-auto mt-12 lg:mt-16 pt-6 border-t border-gray-800">
          <p className="text-center text-gray-400 text-xs lg:text-sm">
            Made with ❤️ by AJ
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App