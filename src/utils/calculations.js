export const calculateRequiredMarks = (internal) => {
  // Need minimum 45/100 total and minimum 24/60 in ESE
  const totalRequired = 45;
  const minEseRequired = 24;
  
  // Calculate how many marks needed in ESE to reach total of 45
  const marksForTotal = Math.max(totalRequired - internal, 0);
  
  // Return the higher of minEseRequired or marksForTotal
  return Math.max(marksForTotal, minEseRequired);
};

export const calculateGradeRequirements = (internal) => {
  const gradeThresholds = {
    'O': 90,
    'A+': 85,
    'A': 80,
    'B+': 70,
    'B': 60,
    'C': 50,
    'P': 45
  };

  return Object.entries(gradeThresholds).map(([grade, threshold]) => {
    const required = Math.max(threshold - internal, 24); // Minimum 24 in ESE
    const possible = required <= 60; // Maximum possible ESE marks is 60

    return { grade, required, possible };
  });
};