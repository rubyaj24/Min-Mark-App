export const calculateRequiredMarks = (internal) => {
  // Need minimum 45/100 total and minimum 24/60 in ESE
  const totalRequired = 45;
  const minEseRequired = 24;
  
  // Calculate how many marks needed in ESE to reach total of 45
  const marksForTotal = Math.max(totalRequired - internal, 0);
  
  // Return the higher of minEseRequired or marksForTotal
  return Math.max(marksForTotal, minEseRequired);
};

export const GRADE_THRESHOLDS = {
  S: 90,
  "A+": 85,
  A: 80,
  "B+": 70,
  B: 60,
  C: 50,
  P: 45,
};

export const calculateGradeRequirements = (internal) => {
  return Object.entries(GRADE_THRESHOLDS).map(([grade, threshold]) => {
    const required = Math.max(threshold - internal, 24); // Minimum 24 in ESE
    const possible = required <= 60; // Maximum possible ESE marks is 60

    return { grade, required, possible };
  });
};

const normaliseCieMarks = (cieMarks, cieMax, eseMarks, eseMax) => {
  if (cieMax <= 0 || eseMax <= 0) return cieMarks;

  const ciePercent = (cieMarks / cieMax) * 100;
  const esePercent = (eseMarks / eseMax) * 100;
  const maxAllowedCiePercent = esePercent + 30;

  if (ciePercent <= maxAllowedCiePercent) {
    return cieMarks;
  }

  return (maxAllowedCiePercent / 100) * cieMax;
};

const createResponse = ({
  status,
  requiredESEMarks = null,
  reason = "",
  explanation = "",
  schemeMode,
  targetMode,
}) => ({
  status,
  required_ESE_marks: requiredESEMarks,
  reason,
  explanation,
  scheme_mode: schemeMode,
  target_mode: targetMode,
});

export const evaluateKtuResult = ({
  scheme_mode,
  course_type,
  attendance_percent,
  CIE_marks,
  CIE_max,
  ESE_marks,
  ESE_max,
  target_mode,
}) => {
  const schemeMode = String(scheme_mode);
  const courseType = String(course_type);
  const targetMode = String(target_mode);

  const attendancePercent = Number(attendance_percent);
  const cieMarks = Number(CIE_marks);
  const cieMax = Number(CIE_max);
  const eseMarks = ESE_marks !== undefined && ESE_marks !== null ? Number(ESE_marks) : null;
  const eseMax = Number(ESE_max);

  const minEseMarks = 0.4 * eseMax;
  const overallPassMarks = 0.5 * (cieMax + eseMax);
  const validCourseTypes = ["theory", "lab", "level5"];

  if (!validCourseTypes.includes(courseType)) {
    return createResponse({
      status: "FAIL",
      reason: "Invalid course type",
      schemeMode,
      targetMode,
    });
  }

  if (attendancePercent < 75) {
    return createResponse({
      status: "FE",
      reason: "Attendance below 75%",
      schemeMode,
      targetMode,
    });
  }

  if (targetMode === "NORMAL_PASS") {
    if (eseMarks === null || Number.isNaN(eseMarks)) {
      return createResponse({
        status: "F",
        reason: "ESE marks required for NORMAL_PASS",
        schemeMode,
        targetMode,
      });
    }

    if (eseMarks < minEseMarks) {
      return createResponse({
        status: "F",
        reason: "ESE below 40%",
        schemeMode,
        targetMode,
      });
    }

    const normalisedCie = normaliseCieMarks(cieMarks, cieMax, eseMarks, eseMax);

    if (normalisedCie + eseMarks < overallPassMarks) {
      return createResponse({
        status: "F",
        reason: "Overall below 50%",
        schemeMode,
        targetMode,
      });
    }

    return createResponse({
      status: "PASS",
      explanation: "Eligible for pass (≥ P) as per KTU rules",
      schemeMode,
      targetMode,
    });
  }

  if (targetMode === "LOW_PASS") {
    let eseRequired = Math.max(minEseMarks, overallPassMarks - cieMarks);

    if (eseRequired > eseMax) {
      return createResponse({
        status: "FAIL",
        reason: "Insufficient CIE — pass impossible",
        schemeMode,
        targetMode,
      });
    }

    for (let index = 0; index < 10; index += 1) {
      const normalisedCie = normaliseCieMarks(cieMarks, cieMax, eseRequired, eseMax);
      const revisedEseRequired = Math.max(minEseMarks, overallPassMarks - normalisedCie);

      if (revisedEseRequired <= eseRequired + 1e-9) {
        break;
      }

      eseRequired = revisedEseRequired;
    }

    if (eseRequired > eseMax) {
      return createResponse({
        status: "FAIL",
        reason: "Insufficient CIE — pass impossible",
        schemeMode,
        targetMode,
      });
    }

    return createResponse({
      status: "LOW PASS (P Grade)",
      requiredESEMarks: Math.ceil(eseRequired),
      explanation: "Minimum marks required to just pass as per KTU rules",
      schemeMode,
      targetMode,
    });
  }

  return createResponse({
    status: "FAIL",
    reason: "Invalid target mode",
    schemeMode,
    targetMode,
  });
};