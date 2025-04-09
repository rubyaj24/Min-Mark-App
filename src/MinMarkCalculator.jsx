import React, { useState } from 'react';

function MinMarkCalculator() {
  const [internalMarks, setInternalMarks] = useState('');
  const [minPassMark, setMinPassMark] = useState(null);

  const handleInputChange = (e) => {
    setInternalMarks(e.target.value);
  };

  const calculateMinPassMark = () => {
    const internal = parseFloat(internalMarks);
    if (isNaN(internal) || internal < 0 || internal > 50) {
      alert('Please enter a valid internal mark between 0 and 50.');
      return;
    }
    const minPass = 50 - internal;
    setMinPassMark(minPass);
  };

  return (
    <div>
      <h2>Minimum Pass Mark Calculator</h2>
      <input
        type="number"
        value={internalMarks}
        onChange={handleInputChange}
        placeholder="Enter internal marks (0-50)"
      />
      <button onClick={calculateMinPassMark}>Calculate</button>
      {minPassMark !== null && (
        <p>The minimum pass mark required for semester exams is: {minPassMark}</p>
      )}
    </div>
  );
}

export default MinMarkCalculator;
