# UOM BIT GPA Calculator

This project involves migrating an existing HTML/CSS/JavaScript GPA calculator application to a modern Next.js 14+ application using TypeScript and Tailwind CSS. The goal is to create a high-performance, responsive, and visually appealing GPA calculator for the University of Moratuwa (UOM) Bachelor of Information Technology (BIT) program.

## Features

- **Dual mode**:
  - **Syllabus Mode**: pre-defined UOM BIT curriculum (Year 1–3) with grade dropdowns
  - **Manual Mode**: add custom subjects (code, name, credits, grade)
- **Integrated Pomodoro Timer**: Automated study/break cycles with session tracking and total study time analytics.
- **Live dashboard**: CGPA, total credits, current standing
- **Responsive UI**: mobile-first layout with shadcn/ui components
- **Fast transitions**: Framer Motion animations
- **Zero-Server Architecture**: user-entered data is stored **locally in the browser** via **localStorage** (no external data transmission)
- **Analytics (GA4 — optional)**: Use Google Analytics

## Tech Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- shadcn/ui + Radix UI
- Lucide React icons
- Framer Motion

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build
```

### Environment variables

For local development copy the example file and edit the values:

```powershell
Copy-Item .env.example .env.local
# then open and edit .env.local to set NEXT_PUBLIC_GA_ID and NEXT_PUBLIC_SITE_URL
```
Do NOT commit your `.env` or `.env.local` file


### Project Structure

```
[project-root]/
├── app/
│   ├── (routes)/                 # Route groups (optional)
│   │   ├── gpa/
│   │   │   ├── [year]/
│   │   │   │   ├── [semester]/
│   │   │   │   │   └── page.tsx  # Year 1 & 2 GPA page
│   │   │   │   └── page.tsx      # Year 3 GPA page
│   │   │   └── page.tsx          # GPA route handler
│   │   └── page.tsx              # Home page
│   ├── favicon.ico
│   ├── globals.css
│   └── layout.tsx
│
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   │   ├── button.tsx            # Button component (shadcn/ui)
│   │   └── [other shadcn components] # Select, Card, Table, etc.
│   ├── custom/                   # Custom application components
│   │   ├── CourseInput.tsx       # Individual course input row
│   │   ├── CourseTable.tsx       # Course table component
│   │   ├── GPADisplay.tsx        # GPA display component
│   │   ├── SemesterCard.tsx      # Semester card wrapper
│   │   └── YearSemesterSelector.tsx # Year/Semester selector
│   └── layout/                    # Layout components
│       ├── Footer.tsx            # Footer component
│       └── Header.tsx            # Header/Navigation component
│
├── lib/                          # Utility functions and hooks
│   ├── utils.ts                  # shadcn/ui utility (cn function)
│   ├── hooks/                    # Custom React hooks
│   │   ├── useGPACalculator.ts   # GPA calculation hook
│   │   └── useCourseData.ts      # Course data hook
│   ├── types/                    # TypeScript type definitions
│   │   ├── course.ts             # Course-related types
│   │   └── gpa.ts                # GPA-related types
│   └── utils/                    # Utility functions
│       ├── course-data.ts        # Course data constants
│       └── gpa-calculator.ts     # GPA calculation logic
│
├── components.json               # shadcn/ui configuration
│
├── docs/                         # Documentation (existing)
│   ├── DEVELOPMENT_ROADMAP.md
│   ├── PROJECT_DOCUMENTATION.md
│   └── screenshots/
│
├── public/                       # Static assets
│   └── [assets]                  # Images, icons, etc.
│
└── [config files]                # Configuration files
```

## Contributors & Credits

* **[Yasiru Viyara](https://github.com/yasiruviyara)** 
* **[Chamathka Nethmini](https://github.com/chamaneth)**

Academic curriculum data provided by the University of Moratuwa (CODL).

## License

Licensed under the MIT License. See the `LICENSE` file for more details.


