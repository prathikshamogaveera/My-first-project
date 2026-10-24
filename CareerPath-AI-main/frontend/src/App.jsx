import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import WelcomeSection from './components/WelcomeSection';
import OverviewGrid from './components/OverviewGrid';
import ResumeAnalyzer from './components/ResumeAnalyzer';
import SkillGapAnalysis from './components/SkillGapAnalysis';
import CareerMentor from './components/CareerMentor';
import LearningRoadmap from './components/LearningRoadmap';
import ProjectIdeas from './components/ProjectIdeas';
import ResumeImprovement from './components/ResumeImprovement';
import Footer from './components/Footer';
import { checkBackendHealth, analyzeResume } from './services/api';
import './index.css';
export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [backendStatus, setBackendStatus] = useState({
    checking: true,
    online: false,
    data: null,
    message: '',
  });

  const sectionRefs = {
    home: useRef(null),
    analyzer: useRef(null),
    skills: useRef(null),
    mentor: useRef(null),
    roadmap: useRef(null),
    projects: useRef(null),
    improve: useRef(null),
  };

  // Check backend health on initial load
  const verifyHealth = async () => {
    setBackendStatus((prev) => ({ ...prev, checking: true }));
    const result = await checkBackendHealth();
    if (result.online) {
      setBackendStatus({
        checking: false,
        online: true,
        data: result.data,
        message: 'Connected',
      });
    } else {
      setBackendStatus({
        checking: false,
        online: false,
        data: null,
        message: result.message || 'Offline',
      });
    }
  };

  useEffect(() => {
    verifyHealth();
    // Periodically re-check health every 60 seconds
    const interval = setInterval(verifyHealth, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAnalyze = async ({ file, targetRole, jobDescription }) => {
    setIsLoading(true);
    setError(null);
    setStatusMessage('Uploading resume and generating AI career analysis...');

    try {
      const data = await analyzeResume(file, targetRole);
      setAnalysisResult(data);
      setStatusMessage('✓ AI analysis completed! Review your profile and roadmap below.');

      // Mark backend as verified online
      setBackendStatus((prev) => ({ ...prev, online: true, checking: false }));

      // Smoothly navigate to skills section to display results
      setTimeout(() => {
        handleNavigate('skills');
      }, 300);
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err.message || 'An error occurred during resume analysis.');
      setStatusMessage('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <main className="main-content" id="home">
        <Topbar
          onToggleMenu={() => setSidebarOpen((prev) => !prev)}
          backendStatus={backendStatus}
          onRetryHealth={verifyHealth}
        />

        <WelcomeSection onStartAnalyze={() => handleNavigate('analyzer')} />

        <OverviewGrid analysisResult={analysisResult} />

        <ResumeAnalyzer
          onAnalyze={handleAnalyze}
          isLoading={isLoading}
          error={error}
          statusMessage={statusMessage}
          targetSectionRef={sectionRefs.analyzer}
        />

        <SkillGapAnalysis
          analysisResult={analysisResult}
          targetSectionRef={sectionRefs.skills}
        />

        <CareerMentor
          analysisResult={analysisResult}
          targetSectionRef={sectionRefs.mentor}
        />

        <LearningRoadmap
          analysisResult={analysisResult}
          targetSectionRef={sectionRefs.roadmap}
        />

        <ProjectIdeas
          analysisResult={analysisResult}
          targetSectionRef={sectionRefs.projects}
        />

        <ResumeImprovement
          analysisResult={analysisResult}
          targetSectionRef={sectionRefs.improve}
        />

        <Footer />
      </main>
    </div>
  );
}
