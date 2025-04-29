# Project Proposal: KTU Student Grade Analysis & Final Exam Planning Tool

---

## 1. Introduction

In the academic environment of APJ Abdul Kalam Technological University (KTU), students often face a critical challenge in balancing internal marks and final examination performance. The internal assessments (CIE) are sometimes the only component under student control throughout the semester, whereas the final exam (ESE) often carries greater weight and pressure. Revaluation procedures are expensive and opaque, and students are left with little guidance on how to plan their exam performance to reach their target grades.

This proposal outlines the development of a web-based/mobile app that analyzes a student’s internal assessment scores and calculates the marks they must achieve in the final exam to secure specific overall grades.

---

## 2. Updated KTU Assessment Scheme (2024 Onward)

### 2.1. Mark Distribution

| Component                        | Maximum Marks |
|----------------------------------|----------------|
| Continuous Internal Evaluation (CIE) | 40 marks       |
| End Semester Examination (ESE)       | 60 marks       |
| **Total**                           | **100 marks**  |

### 2.2. Breakdown of Internal Evaluation (CIE)

- **Attendance**: 5 marks  
- **Assignment / Microproject**: 15 marks  
- **Internal Exam 1**: 10 marks  
- **Internal Exam 2**: 10 marks

### 2.3. End Semester Exam (ESE) Structure

- **Part A**: 8 Questions × 3 Marks = 24 marks  
- **Part B**: 4 Questions × 9 Marks = 36 marks

---

## 3. KTU Grading System

| Grade | Marks Range (Total %) | Grade Point |
|-------|------------------------|-------------|
| O     | 90–100                | 10          |
| A+    | 85–89                 | 9           |
| A     | 80–84                 | 8.5         |
| B+    | 70–79                 | 8           |
| B     | 60–69                 | 7           |
| C     | 50–59                 | 6           |
| P     | 45–49                 | 5           |
| F     | < 45                  | 0           |

> **Important**: To pass, a student must score a minimum of **45/100 overall**, and must secure **at least 24/60** in the university examination (ESE).

---

## 4. App Features & Analysis Modules

### 4.1. Final Exam Target Score Calculator

- **Input**: CIE marks and subject name  
- **Output**: Minimum marks needed in ESE to:
  - Pass (45 overall, 24 in ESE)
  - Achieve grades: P, C, B, B+, A, A+, O

### 4.2. Grade Feasibility Checker

- Determines whether each grade is realistically achievable based on current internal score and max possible final marks (60).

### 4.3. What-If Analyzer

- Allows students to input hypothetical ESE scores  
- Shows resulting final grade instantly

### 4.4. Risk Assessment Module

- Classifies subjects into:
  - ✅ Safe: Easy to pass
  - ⚠️ Risky: Needs high marks to pass
  - ❌ Impossible: Grade not achievable

### 4.5. Ranked Priority List

- Ranks subjects based on difficulty in achieving pass/target grade  
- Helps students allocate study time effectively

### 4.6. SGPA Forecast (Optional)

- Allows multi-subject input to forecast semester GPA

### 4.7. Visual Reports & Charts

- Bar charts showing:
  - Internal vs required ESE for each grade
  - Color-coded grade zones for clarity

---

## 5. Sample Analysis Output

> **Subject**: MAT202 – Partial Differential Equations  
> **CIE Marks**: 28/40  
> **Required in ESE to Pass**: 17/60 (Fails – needs at least 24/60)  
> **To Pass**: 24/60 ✅  
> **To secure B grade (60%)**: 32/60 ✅  
> **To secure A grade (80%)**: 48/60 ❌  
> **Max achievable grade with 60/60 in final**: A+  

---

## 6. Technical Implementation Suggestions

- **Frontend**: React (Web) / Flutter (Mobile)  
- **Backend**: Node.js or Python Flask with internal formulas  
- **Database**: Firebase or MongoDB for user storage (optional)  
- **Grade Logic Engine**: Pure function modules calculating feasibility and grade output based on fixed KTU rules

---

## 7. Conclusion

This application can significantly support KTU students by offering transparency, planning tools, and motivation for academic success. It fills a critical gap in the student experience by demystifying grade outcomes and providing actionable goals for each subject. With support for KTU’s 2024 regulation scheme and grading system, the tool is both relevant and scalable.

---
 
**Date**: [29/04/25]  
**Project Title**: Internal-to-Final Grade Planning App for KTU
