import React from 'react';
import { LayoutDashboard, BookOpen, Bell, TrendingUp, Menu, User, Globe } from 'lucide-react';
import { ViewState, StudentProfile } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  setView: (view: ViewState) => void;
  profile: StudentProfile;
  lang: 'en' | 'ml';
  toggleLang: () => void;
  t: (key: string) => string;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, setView, profile, lang, toggleLang, t }) => {
  const navItems = [
    { id: 'dashboard' as ViewState, icon: LayoutDashboard, label: t('dashboard') },
    { id: 'subjects' as ViewState, icon: BookOpen, label: t('subjects') },
    { id: 'insights' as ViewState, icon: TrendingUp, label: t('insights') },
    { id: 'updates' as ViewState, icon: Bell, label: t('updates') },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto shadow-2xl overflow-hidden relative border-x border-gray-200">
      {/* Header */}
      <header className="bg-white px-4 py-3 border-b border-gray-200 sticky top-0 z-20 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border-2 border-blue-50">
            <User size={20} />
          </div>
          <div>
            <h1 className="font-bold text-gray-800 text-lg leading-tight">{profile.name}</h1>
            <p className="text-xs text-gray-500">Class {profile.class} - {profile.section}</p>
          </div>
        </div>
        <button 
          onClick={toggleLang}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-xs font-medium text-gray-700 transition-colors"
        >
          <Globe size={14} />
          {lang === 'en' ? 'EN' : 'മലയാളം'}
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-24 scroll-smooth">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-200 px-4 py-2 flex justify-between items-center z-30 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        {navItems.map((item) => {
          const isActive = currentView === item.id || (item.id === 'subjects' && currentView === 'subject-detail');
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200 w-16 ${
                isActive ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <div className={`p-1.5 rounded-full ${isActive ? 'bg-blue-50' : ''}`}>
                <Icon size={isActive ? 24 : 22} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] font-medium ${isActive ? 'font-bold' : ''}`}>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Layout;