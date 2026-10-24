# CareerPath AI - React Frontend

Modern Vite + React frontend for **CareerPath AI**, preserving the original design, responsive dashboard layout, and seamless communication with the Python FastAPI backend (local or deployed on Render).

---

## 🛠️ Tech Stack
- **Framework:** React 18
- **Build Tool:** Vite 5
- **Styling:** Custom CSS with CSS variables, matching 100% of the original design
- **State Management:** React Hooks (`useState`, `useEffect`, `useRef`)
- **API Communication:** Fetch API with multipart `FormData` support

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Backend URL
Copy `.env.example` to `.env` (or edit `.env`):
```ini
# For local Python FastAPI backend:
VITE_API_BASE_URL=http://localhost:8000

# For deployed Render backend:
# VITE_API_BASE_URL=https://<your-render-app>.onrender.com
```

### 3. Run Development Server
```bash
npm run dev
```
The React frontend will be accessible at: `http://localhost:5173`

### 4. Build for Production
```bash
npm run build
```
Generates an optimized static production build in the `dist/` directory.

---

## 🔗 Backend Endpoints Used
| Endpoint | Method | Purpose |
| :--- | :--- | :--- |
| `/api/health` | `GET` | Verifies backend connectivity and displays the status dot in the Topbar |
| `/api/analyze` | `POST` | Uploads resume (`.pdf`, `.docx`, `.txt`) and `target_role` to generate AI career gaps, roadmap, and project recommendations |
| `/api/analyze-text`| `POST` | Alternative direct text analysis endpoint |
