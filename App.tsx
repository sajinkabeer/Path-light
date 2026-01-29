import React, { useState } from 'react';
import { SUBJECTS_DATA, STUDENT_PROFILE, TRANSLATIONS, UPDATES_DATA } from './constants';
import { ViewState } from './types';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import { SubjectList, SubjectDetail } from './components/SubjectViews';
import Insights from './components/Insights';
import Updates from './components/Updates';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [lang, setLang] = useState<'en' | 'ml'>('en');

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'ml' : 'en');
  };

  const t = (key: string): string => {
    return TRANSLATIONS[lang][key] || key;
  };

  const handleNavigate = (view: ViewState, subjectId?: string) => {
    if (subjectId) {
      setSelectedSubjectId(subjectId);
    }
    setCurrentView(view);
    // Scroll to top when changing views
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard 
            subjects={SUBJECTS_DATA} 
            updates={UPDATES_DATA} 
            onNavigate={handleNavigate}
            t={t}
          />
        );
      
      case 'subjects':
        return (
          <SubjectList 
            subjects={SUBJECTS_DATA} 
            onSelect={(id) => handleNavigate('subject-detail', id)}
            t={t}
          />
        );
      
      case 'subject-detail':
        const subject = SUBJECTS_DATA.find(s => s.id === selectedSubjectId);
        if (!subject) return <div className="p-4">Subject not found</div>;
        return (
          <SubjectDetail 
            subject={subject} 
            onBack={() => handleNavigate('subjects')} 
            t={t}
          />
        );

      case 'insights':
        return <Insights subjects={SUBJECTS_DATA} t={t} />;
      
      case 'updates':
        return <Updates updates={UPDATES_DATA} t={t} />;
        
      default:
        return <div>View not found</div>;
    }
  };

  return (
    <Layout 
      currentView={currentView} 
      setView={(v) => handleNavigate(v)}
      profile={STUDENT_PROFILE}
      lang={lang}
      toggleLang={toggleLang}
      t={t}
    >
      {renderContent()}
    </Layout>
  );
}

export default App;