# AI-Powered Resume Shortlisting Agent - Frontend

A modern React-based frontend for an AI-powered resume screening system that evaluates candidates against job descriptions using artificial intelligence.

## 🌟 Overview

This frontend application serves as the user interface for the AI Resume Shortlisting Agent. It provides an intuitive platform for recruiters and HR professionals to upload resumes, input job descriptions, and receive AI-powered analysis results including shortlisting decisions, match scores, and detailed reasoning.

## ✨ Features

### Core Functionality
- **Resume Input**: Paste resume text or upload files (.txt, .pdf, .doc, .docx)
- **Job Description Input**: Paste job description for comparison
- **AI-Powered Analysis**: Connects to backend API for intelligent matching
- **Real-time Results**: Instant display of analysis results

### Result Visualization
- **Decision Badge**: Clear SHORTLISTED/REJECTED indicator with color coding
- **Match Score**: Circular progress indicator with color coding based on 70% threshold
- **Skills Analysis**: Tag-based display of matched and missing skills
- **Detailed Breakdown**: Score breakdown for skills, experience, education, projects
- **AI Reasoning**: Step-by-step display of the agent's reasoning process

### User Experience
- **Loading States**: Animated spinner and pulse effects during analysis
- **Error Handling**: User-friendly error messages with suggestions
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **File Upload**: Drag-and-drop or click to upload resume files
- **Character Count**: Real-time counter for both inputs

## 🛠️ Tech Stack

- **React 18.2.0** - UI library
- **Axios 1.6.0** - HTTP client for API requests
- **CSS3** - Custom styling with animations
- **Poppins Font** - Modern typography

# File Structure
src/ <br>
├── components/ <br>
│   ├── Home/ <br>
│   │   ├── Home.jsx          # Main layout component <br>
│   │   └── Home.css          # Home component styles <br>
│   ├── Input/ <br>
│   │   ├── Input.jsx         # Input form component <br>
│   │   └── Input.css         # Input form styles <br>
│   └── Result/ <br>
│       ├── Result.jsx        # Results display component <br>
│       └── Result.css        # Results display styles <br>
├── App.js                     # Root component<br>
├── App.css                    # Global app styles <br>
├── index.js                   # Entry point <br>
└── index.css                  # Global styles<br>

