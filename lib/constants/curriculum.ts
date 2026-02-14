import type { Course } from '@/lib/types';

export interface SemesterData {
  semester: number;
  courses: Course[];
}

export interface YearData {
  year: number;
  semesters: SemesterData[];
}

export interface CurriculumData {
  [year: string]: {
    [semester: string]: Course[];
  } | Course[]; // Year 3 is just an array
}

/**
 * UOM BIT Curriculum Data - New Syllabus (2024)
 * Year 1 and Year 2 have semesters, Year 3 has all courses together
 */
export const CURRICULUM: CurriculumData = {
  '1': {
    '1': [
      { code: 'ITE 1913', name: 'Communication Skills Development', credits: 2 },
      { code: 'ITE 1213', name: 'Computer Systems', credits: 2 },
      { code: 'ITE 1813', name: 'Mathematics & Statistics for IT', credits: 2 },
      { code: 'ITE 1713', name: 'Web Design', credits: 3 },
      { code: 'ITE 1123', name: 'Fundamentals of Programming', credits: 3 },
      { code: 'ITE 1923', name: 'ICT Skills and Applications', credits: 3 },
    ],
    '2': [
      { code: 'ITE 1413', name: 'Fundamentals of Databases', credits: 2 },
      { code: 'ITE 1933', name: 'Technical Writing', credits: 2 },
      { code: 'ITE 1133', name: 'Visual Applications', credits: 3 },
      { code: 'ITE 1723', name: 'Web Programming', credits: 3 },
      { code: 'ITE 1223', name: 'System & Design Paradigms', credits: 3 },
      { code: 'ITE 1943', name: 'ICT Project', credits: 2 },
    ],
  },
  '2': {
    '1': [
      { code: 'ITE 2133', name: 'Object Oriented Programming', credits: 3 },
      { code: 'ITE 2143', name: 'Data Structures and Algorithms', credits: 2 },
      { code: 'ITE 2233', name: 'Operating Systems', credits: 2 },
      { code: 'ITE 2823', name: 'Calculus & Statistical Distributions', credits: 2 },
      { code: 'ITE 2163', name: 'Software Engineering', credits: 3 },
      { code: 'ITE 2153', name: 'Object Oriented Analysis Design', credits: 3 },
    ],
    '2': [
      { code: 'ITE 2423', name: 'Database Management Systems', credits: 3 },
      { code: 'ITE 2433', name: 'Data Communication & Networking', credits: 2 },
      { code: 'ITE 2173', name: 'UI/UX Design', credits: 2 },
      { code: 'ITE 2313', name: 'IT Quality Assurance', credits: 3 },
      { code: 'ITE 2613', name: 'IT Project Management', credits: 2 },
      { code: 'ITE 2953', name: 'Programming Group Project', credits: 4 },
    ],
  },
  '3': [
    // Core Courses
    { code: 'ITE 3113', name: 'Discrete Mathematics', credits: 2 },
    { code: 'ITE 3123', name: 'Professional Practice', credits: 2 },
    { code: 'ITE 3143', name: 'Information Security', credits: 2 },
    { code: 'ITE 3153', name: 'Essentials of AI', credits: 2 },
    { code: 'ITE 3963', name: 'Project', credits: 10 },
    // Software Engineering Stream
    { code: 'ITE 3213', name: 'Software Engineering in Practice', credits: 3 },
    { code: 'ITE 3223', name: 'Secure Software Development', credits: 3 },
    { code: 'ITE 3233', name: 'Quality Assurance in Practice', credits: 3 },
    { code: 'ITE 3253', name: 'Mobile Application Development', credits: 3 },
    { code: 'ITE 3273', name: 'Enterprise Application Development', credits: 3 },
    // Data Science Stream
    { code: 'ITE 3313', name: 'Data Visualization', credits: 3 },
    { code: 'ITE 3323', name: 'Data Infrastructure and Automation', credits: 3 },
    { code: 'ITE 3333', name: 'Business Statistics', credits: 3 },
    { code: 'ITE 3343', name: 'Data Mining', credits: 3 },
    { code: 'ITE 3363', name: 'Business Analytics', credits: 3 },
    // Network & Security Stream
    { code: 'ITE 3413', name: 'Internet/Web Security', credits: 3 },
    { code: 'ITE 3423', name: 'Cloud Based Application Development', credits: 3 },
    { code: 'ITE 3433', name: 'Web Services', credits: 3 },
    // AI & ML Stream
    { code: 'ITE 3513', name: 'Artificial Neural Networks', credits: 3 },
    { code: 'ITE 3523', name: 'Big Data Analytics', credits: 3 },
    { code: 'ITE 3533', name: 'Machine Learning', credits: 3 },
    { code: 'ITE 3543', name: 'Natural Language Processing', credits: 3 },
    // UX/UI Stream
    { code: 'ITE 3613', name: 'UX Engineering', credits: 3 },
    { code: 'ITE 3623', name: 'Interaction Design', credits: 3 },
    { code: 'ITE 3633', name: 'Graphic Application Development', credits: 3 },
    { code: 'ITE 3653', name: 'Human Computer Interaction', credits: 3 },
    // Network & IoT Stream
    { code: 'ITE 3713', name: 'Wireless Communications', credits: 3 },
    { code: 'ITE 3723', name: 'Cyber Security', credits: 3 },
    { code: 'ITE 3733', name: 'Internet of Things', credits: 3 },
    { code: 'ITE 3743', name: 'Network Programming', credits: 3 },
    { code: 'ITE 3753', name: 'Cloud Computing', credits: 3 },
  ],
};

/**
 * Get courses for a specific year and semester
 */
export function getCourses(year: number, semester?: number): Course[] {
  const yearData = CURRICULUM[year.toString()];
  
  if (!yearData) {
    return [];
  }

  // Year 3 is just an array
  if (year === 3) {
    return Array.isArray(yearData) ? yearData : [];
  }

  // Year 1 and 2 have semesters
  if (semester && !Array.isArray(yearData)) {
    return yearData[semester.toString()] || [];
  }

  return [];
}

/**
 * Get all courses for a year (flattened)
 */
export function getAllCoursesForYear(year: number): Course[] {
  const yearData = CURRICULUM[year.toString()];
  
  if (!yearData) {
    return [];
  }

  // Year 3 is just an array
  if (year === 3) {
    return Array.isArray(yearData) ? yearData : [];
  }

  // Year 1 and 2: combine all semesters
  if (!Array.isArray(yearData)) {
    return Object.values(yearData).flat();
  }

  return [];
}

/**
 * Get structured year data
 */
export function getYearData(year: number): YearData | null {
  const yearData = CURRICULUM[year.toString()];
  
  if (!yearData) {
    return null;
  }

  // Year 3: return as single "semester"
  if (year === 3 && Array.isArray(yearData)) {
    return {
      year: 3,
      semesters: [
        {
          semester: 0, // Special case for Year 3
          courses: yearData,
        },
      ],
    };
  }

  // Year 1 and 2: structure by semesters
  if (!Array.isArray(yearData)) {
    const semesters: SemesterData[] = Object.entries(yearData).map(([sem, courses]) => ({
      semester: parseInt(sem, 10),
      courses: courses as Course[],
    }));

    return {
      year,
      semesters,
    };
  }

  return null;
}
