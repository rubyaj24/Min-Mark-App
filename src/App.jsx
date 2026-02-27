import { useState } from 'react'
import Form from './components/Form'
import Result from './components/Result'
import './styles/gradients.css'
import Header from './components/Header';

function App() {
  const [resultData, setResultData] = useState(null);

  const handleCalculate = (formData) => {
    setResultData(formData);
  };

  const handleReset = () => {
    setResultData(null);
  };

  return(
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-gray-900 to-gray-800 overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {/* Header Section */}
        <Header />

        {/* Main Content */}
        <main className="w-full max-w-7xl mx-auto">
          {!resultData ? (
            <Form onCalculate={handleCalculate} />
          ) : (
            <div className="w-full flex flex-col items-center">
              <Result data={resultData} />
              <button
                onClick={handleReset}
                className="my-6 sm:my-8 lg:my-12 px-6 sm:px-8 py-3 lg:px-10 lg:py-4 bg-gray-700 
                         text-white text-sm sm:text-base lg:text-lg rounded-xl 
                         hover:bg-gray-600 transition-all duration-200 
                         transform hover:scale-[1.02] focus:outline-none 
                         focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 
                         focus:ring-offset-gray-900"
              >
                Calculate Another
              </button>
            </div>
          )}
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