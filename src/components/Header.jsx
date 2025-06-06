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
            <span>v1.1.0</span>
          </div>
          <p className="text-sm sm:text-base lg:text-lg text-gray-400 max-w-3xl mx-auto">
            New update! Added 2019 scheme too! <br></br>
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
    </div>
  )
}

export default Header