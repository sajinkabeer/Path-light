import React from 'react';
import { TrendingUp, AlertTriangle, ChevronRight, CheckCircle2 } from 'lucide-react';
import { SubjectData, Update, ViewState } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  subjects: SubjectData[];
  updates: Update[];
  onNavigate: (view: ViewState, subjectId?: string) => void;
  t: (key: string) => string;
}

const Dashboard: React.FC<DashboardProps> = ({ subjects, updates, onNavigate, t }) => {
  // Simple calculation for overall
  const overallScore = Math.round(subjects.reduce((acc, curr) => acc + curr.currentScore, 0) / subjects.length);
  const improvingCount = subjects.filter(s => s.status === 'improving').length;
  const decliningCount = subjects.filter(s => s.status === 'declining').length;

  const getStatusColor = (score: number) => {
    if (score >= 75) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusBg = (score: number) => {
    if (score >= 75) return 'bg-green-50 border-green-200';
    if (score >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const pieData = [
    { name: 'Score', value: overallScore },
    { name: 'Remaining', value: 100 - overallScore }
  ];

  return (
    <div className="p-4 space-y-6">
      
      {/* Overview Card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h2 className="text-gray-800 font-bold text-lg mb-4 flex items-center gap-2">
          {t('overview')}
        </h2>
        
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-24 h-24">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={40}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                  >
                    <Cell fill={overallScore >= 75 ? '#22c55e' : overallScore >= 60 ? '#eab308' : '#ef4444'} />
                    <Cell fill="#f3f4f6" />
                  </Pie>
                </PieChart>
             </ResponsiveContainer>
             <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className={`text-xl font-bold ${getStatusColor(overallScore)}`}>{overallScore}%</span>
             </div>
          </div>
          
          <div className="flex-1 pl-6">
            <p className="text-gray-600 font-medium mb-1">Overall Performance</p>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-lg font-bold ${getStatusColor(overallScore)}`}>
                {overallScore >= 75 ? 'Good' : overallScore >= 60 ? 'Average' : 'Needs Attention'}
              </span>
              {improvingCount > decliningCount ? (
                <TrendingUp size={18} className="text-green-500" />
              ) : (
                <AlertTriangle size={18} className="text-yellow-500" />
              )}
            </div>
            <p className="text-xs text-gray-500">Based on {subjects.length} core subjects</p>
          </div>
        </div>

        {/* Key Highlights */}
        <div className="space-y-3">
          {subjects.filter(s => s.status === 'improving').slice(0, 1).map(s => (
            <div key={s.id} className="flex items-start gap-3 p-3 bg-green-50 rounded-xl border border-green-100">
              <div className="p-1 bg-green-200 rounded-full mt-0.5">
                <TrendingUp size={14} className="text-green-700" />
              </div>
              <div>
                <p className="text-sm font-semibold text-green-800">{s.name} scores improving</p>
                <p className="text-xs text-green-700 mt-0.5">Up by {s.trend[s.trend.length-1] - s.trend[0]}% in last 6 tests</p>
              </div>
            </div>
          ))}
          {subjects.filter(s => s.status === 'declining').slice(0, 1).map(s => (
            <div key={s.id} className="flex items-start gap-3 p-3 bg-red-50 rounded-xl border border-red-100">
              <div className="p-1 bg-red-200 rounded-full mt-0.5">
                <AlertTriangle size={14} className="text-red-700" />
              </div>
              <div>
                <p className="text-sm font-semibold text-red-800">{s.name} needs attention</p>
                <p className="text-xs text-red-700 mt-0.5">Scores dropped in recent tests</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Subject Access */}
      <div>
        <div className="flex justify-between items-center mb-3 px-1">
          <h3 className="font-bold text-gray-800">{t('subjects')}</h3>
          <button 
            onClick={() => onNavigate('subjects')}
            className="text-xs text-blue-600 font-medium flex items-center"
          >
            View All <ChevronRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {subjects.map(subject => (
            <div 
              key={subject.id} 
              onClick={() => onNavigate('subject-detail', subject.id)}
              className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between active:scale-[0.99] transition-transform"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${getStatusBg(subject.currentScore)} ${getStatusColor(subject.currentScore)}`}>
                  {subject.currentScore}%
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{subject.name}</h4>
                  <p className="text-xs text-gray-500">Avg: {subject.classAverage}%</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Recent Updates Preview */}
      <div>
        <div className="flex justify-between items-center mb-3 px-1">
          <h3 className="font-bold text-gray-800">{t('recentUpdates')}</h3>
          <button 
            onClick={() => onNavigate('updates')}
            className="text-xs text-blue-600 font-medium flex items-center"
          >
            View All <ChevronRight size={14} />
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {updates.slice(0, 3).map((update, idx) => (
            <div key={update.id} className={`p-4 ${idx !== 2 ? 'border-b border-gray-100' : ''}`}>
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">{update.subject}</span>
                <span className="text-[10px] text-gray-400">{update.date}</span>
              </div>
              <p className="text-sm text-gray-800 line-clamp-2">{update.message}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;