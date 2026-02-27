import React from 'react'

const Header = () => {
  return (
    <div>
        <header className="w-full max-w-6xl mx-auto text-center space-y-4 mb-8 lg:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold animated-gradient-text tracking-tight">
            Minimum Mark Calculator
          </h1>
          <div className='flex flex-col sm:flex-row items-center justify-center gap-2 text-gray-300'>
            <span className="text-sm text-gray-400">Calculate the minimum marks required to pass your exam.</span>
            <span>v2.0.0</span>
          </div>
          <p className="text-sm sm:text-base lg:text-lg text-gray-400 max-w-3xl mx-auto">
            New update! Added 2019 scheme too! <br></br>
            <span className="inline-flex items-center gap-3 mt-3 flex-wrap justify-center">
              <button 
                onClick={() => window.open("https://github.com/rubyaj24/Min-Mark-App", "_blank")}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Github Repo
              </button>
              <button
                onClick={() => window.open("https://github.com/rubyaj24/Min-Mark-App/edit/main/src/coursedata_new.json", "_blank")}
                className="px-4 py-2 rounded-lg bg-blue-600 text-gray-100 text-sm font-medium hover:bg-blue-700 transition-all duration-200"
              >
                Contribute Course Data
              </button>
              <button
                onClick={() => window.open("https://github.com/rubyaj24/Min-Mark-App/issues/new?title=Course%20data%20update%20request%3A%20%5BScheme%5D%20%5BBranch%5D%20%5BSemester%5D", "_blank")}
                className="px-4 py-2 rounded-lg bg-gray-700 text-white text-sm font-medium hover:bg-gray-600 transition-all duration-200"
              >
                Open Data Request Issue
              </button>
            </span>
          </p>
        </header>
    </div>
  )
}

export default Header