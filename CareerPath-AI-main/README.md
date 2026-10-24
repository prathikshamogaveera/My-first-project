# 🚀 CareerPath AI (Full Stack)

CareerPath AI is an intelligent career acceleration platform that analyzes resumes, detects skill gaps against target industry roles, generates personalized learning roadmaps, and recommends tailored portfolio projects and resume improvements.

---

## 📁 Project Architecture

The project is organized into clean, independent folders:

```
CareerPath-AI/
├── backend/                        # Existing Python FastAPI backend
│   ├── app/
│   │   ├── services/
│   │   │   ├── ai_service.py       # Google Gemini generative analysis & realistic mock fallback
│   │   │   ├── parser.py           # Multi-format resume parser (.pdf, .docx, .txt)
│   │   │   └── __init__.py
│   │   ├── config.py               # Server host, port, CORS, upload limits
│   │   ├── main.py                 # FastAPI application routes & middleware
│   │   ├── schemas.py              # Pydantic data schemas & response models
│   │   └── __init__.py
│   ├── .env.example                # Example backend environment variables
│   ├── requirements.txt            # Python dependencies (FastAPI, uvicorn, pypdf, etc.)
│   └── .gitignore
│
├── frontend/                       # Converted Vite + React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx         # Responsive sidebar with active section tracking
│   │   │   ├── Topbar.jsx          # Breadcrumb & real-time backend health indicator
│   │   │   ├── WelcomeSection.jsx  # Hero banner & action button
│   │   │   ├── OverviewGrid.jsx    # Dynamic status, skills count & roadmap stats
│   │   │   ├── ResumeAnalyzer.jsx  # Form with role dropdown, drag-drop file upload & progress
│   │   │   ├── SkillGapAnalysis.jsx# Matched skills, missing gaps, and executive AI insight
│   │   │   ├── CareerMentor.jsx    # Interactive career advisor with quick prompt shortcuts
│   │   │   ├── LearningRoadmap.jsx # Structured multi-phase roadmap with tasks & resources
│   │   │   ├── ProjectIdeas.jsx    # Recommended portfolio projects & certifications
│   │   │   ├── ResumeImprovement.jsx# Actionable ATS bullet-point suggestions
│   │   │   └── Footer.jsx          # App footer & guidance disclaimer
│   │   ├── services/
│   │   │   └── api.js              # Integration service for /api/health and /api/analyze
│   │   ├── config.js               # Centralized API base URL config
│   │   ├── App.jsx                 # Main application state and flow
│   │   ├── index.css               # Complete original CSS styles and enhancements
│   │   └── main.jsx                # React entry point
│   ├── .env                        # Active environment variables
│   ├── .env.example                # Example environment variables
│   ├── package.json                # React 18 + Vite dependencies
│   ├── vite.config.js              # Vite configuration (port 5173 matching backend CORS)
│   └── README.md
│
├── test-backend-integration.py     # Command-line integration test suite
└── README.md                       # This guide
```

---

## 🌐 Connecting React Frontend to Deployed Render Backend

The React frontend connects directly to any backend endpoint using the `VITE_API_BASE_URL` environment variable.

1. Open `frontend/.env` (or create it from `frontend/.env.example`).
2. Set `VITE_API_BASE_URL` to your live Render backend URL:
   ```ini
   VITE_API_BASE_URL=https://your-service-name.onrender.com
   ```
3. Restart or start the Vite frontend (`npm run dev`).

> **Tip for Render Free Tier:**
> Free-tier instances on Render spin down automatically after periods of inactivity. When you make your first request, Render will wake up the instance (typically takes 30–50 seconds). The frontend includes timeout handling and the Topbar status indicator displays when the server is waking up or connected!

---

## 🏃 Step-by-Step: How to Run the Project

### Option A: Connect React Frontend to Render Backend (Fastest)

1. **Navigate to the frontend folder:**
   ```bash
   cd frontend
   ```
2. **Install frontend dependencies:**
   ```bash
   npm install
   ```
3. **Set your Render URL in `frontend/.env`:**
   ```ini
   VITE_API_BASE_URL=https://your-service-name.onrender.com
   ```
4. **Start the React dev server:**
   ```bash
   npm run dev
   ```
5. Open your browser at **`http://localhost:5173`**.

---

### Option B: Run Both Frontend & Python Backend Locally

#### 1. Start the Backend
1. Open a terminal in the `backend/` folder:
   ```bash
   cd backend
   ```
2. Create and activate a Python virtual environment:
   ```bash
   # Windows (PowerShell / Command Prompt):
   python -m venv .venv
   .venv\Scripts\activate

   # macOS / Linux:
   python3 -m venv .venv
   source .venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. (Optional) Configure Gemini API Key:
   - Copy `.env.example` to `.env`.
   - Add your Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
   - *Note: If omitted, the backend automatically provides rich mock analysis for instant testing!*
5. Start the FastAPI server:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```
   Backend will be running at `http://127.0.0.1:8000`. You can also visit `http://127.0.0.1:8000/docs` for interactive Swagger documentation.

#### 2. Start the Frontend
1. Open a second terminal in the `frontend/` folder:
   ```bash
   cd frontend
   ```
2. Verify `frontend/.env` points to local backend:
   ```ini
   VITE_API_BASE_URL=http://localhost:8000
   ```
3. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
4. Start Vite:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:5173`.

---

## 🧪 Testing Frontend-Backend Integration

### 1. In the React UI
- **Live Status Dot:** Check the top-right corner of the Topbar. A green dot confirms that `GET /api/health` succeeded and the frontend is connected to the backend.
- **Upload & Analyze:**
  1. Select a **Target Job Role** (e.g. *Python Developer*).
  2. Upload any sample `.pdf`, `.docx`, or `.txt` resume.
  3. Click **✦ Analyze Resume with AI**.
  4. The frontend sends a multipart `FormData` request to `/api/analyze`.
  5. Upon completion:
     - Overview cards update with candidate match percentage, detected skills count, and roadmap milestones.
     - **Skill Gap Analysis** displays identified skills (green checkmarks) vs missing industry skills (orange arrows) and the executive summary.
     - **Learning Roadmap** populates structured phases with duration, focus areas, actionable tasks, and resources.
     - **Recommended Projects** populates portfolio ideas with tech-stack tags and learning outcomes.
     - **Resume Improvement** populates ATS-friendly suggestions.

### 2. Using the Automated Integration Test Script
You can test backend endpoints directly via the terminal:

```bash
# Test local backend:
python test-backend-integration.py

# Test deployed Render backend:
python test-backend-integration.py --url https://your-service-name.onrender.com
```

This verifies:
1. `GET /` (Root status)
2. `GET /api/health` (Health check & LLM configuration status)
3. `POST /api/analyze-text` (Direct resume text evaluation)
