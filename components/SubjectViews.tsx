import React from 'react';
import { ChevronLeft, TrendingUp, TrendingDown, Minus, BookOpen, MessageCircle, ExternalLink, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';
import { SubjectData } from '../types';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, Cell } from 'recharts';

// --- SUB COMPONENTS ---

const StatusBadge = ({ status }: { status: string }) => {
  if (status === 'improving') {
    return <div className="flex items-center gap-1 text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full"><TrendingUp size={12} /> Improving</div>;
  }
  if (status === 'declining') {
    return <div className="flex items-center gap-1 text-xs font-medium text-red-700 bg-red-100 px-2 py-1 rounded-full"><TrendingDown size={12} /> Declining</div>;
  }
  return <div className="flex items-center gap-1 text-xs font-medium text-blue-700 bg-blue-100 px-2 py-1 rounded-full"><Minus size={12} /> Stable</div>;
};

// --- MAIN COMPONENTS ---

export const SubjectList: React.FC<{
  subjects: SubjectData[];
  onSelect: (id: string) => void;
  t: (key: string) => string;
}> = ({ subjects, onSelect, t }) => {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold text-gray-800 px-1">{t('subjects')}</h2>
      {subjects.map(subject => (
        <div 
          key={subject.id}
          onClick={() => onSelect(subject.id)}
          className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 active:scale-[0.98] transition-all cursor-pointer"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">{subject.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <StatusBadge status={subject.status} />
              </div>
            </div>
            <div className="text-right">
              <span className={`text-2xl font-bold ${subject.currentScore >= 75 ? 'text-green-600' : subject.currentScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                {subject.currentScore}%
              </span>
              <p className="text-xs text-gray-400">Avg: {subject.classAverage}%</p>
            </div>
          </div>

          {/* Mini Trend Graph */}
          <div className="h-16 w-full mb-4">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={subject.trend.map((v, i) => ({ idx: i, val: v }))}>
                 <Line 
                    type="monotone" 
                    dataKey="val" 
                    stroke={subject.status === 'declining' ? '#ef4444' : '#22c55e'} 
                    strokeWidth={2} 
                    dot={false} 
                 />
               </LineChart>
             </ResponsiveContainer>
          </div>

          <div className="space-y-2">
            <div className="flex gap-2 text-sm">
                <span className="font-semibold text-green-700 min-w-[70px]">{t('strengths')}:</span>
                <span className="text-gray-600 truncate">{subject.strengths.join(', ')}</span>
            </div>
            <div className="flex gap-2 text-sm">
                <span className="font-semibold text-red-700 min-w-[70px]">{t('struggles')}:</span>
                <span className="text-gray-600 truncate">{subject.struggles.join(', ')}</span>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-gray-100">
             <div className="flex gap-2 items-start">
                <MessageCircle size={14} className="text-blue-500 mt-1 shrink-0" />
                <p className="text-xs text-gray-500 italic">"{subject.teacherComment}"</p>
             </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const SubjectDetail: React.FC<{
  subject: SubjectData;
  onBack: () => void;
  t: (key: string) => string;
}> = ({ subject, onBack, t }) => {
  
  const trendData = subject.trend.map((score, idx) => ({
    name: `T${idx + 1}`,
    score: score,
    avg: subject.classAverage
  }));

  return (
    <div className="bg-white min-h-full">
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm p-4 border-b border-gray-100 z-10 flex items-center gap-3">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <ChevronLeft size={24} className="text-gray-600" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-gray-900 leading-none">{subject.name}</h2>
          <span className="text-xs text-gray-500">{t('viewDetails')}</span>
        </div>
      </div>

      <div className="p-4 space-y-6">
        
        {/* Main Score Card */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 flex justify-between items-center shadow-sm">
           <div>
              <p className="text-sm text-blue-800 font-medium mb-1">Current Score</p>
              <h1 className="text-4xl font-bold text-blue-900">{subject.currentScore}%</h1>
              <p className="text-xs text-blue-600 font-medium mt-2 flex items-center gap-1">
                 {subject.currentScore > subject.classAverage ? (
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                       <TrendingUp size={12} /> Above Avg ({subject.classAverage}%)
                    </span>
                 ) : (
                    <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                       <TrendingDown size={12} /> Below Avg ({subject.classAverage}%)
                    </span>
                 )}
              </p>
           </div>
           <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center shadow-sm">
              <BookOpen size={28} className="text-blue-500" />
           </div>
        </div>

        {/* AI Insight */}
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex gap-3">
           <div className="mt-0.5 shrink-0">
              <div className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center">
                 <span className="text-[10px] font-bold text-amber-800">AI</span>
              </div>
           </div>
           <div>
              <p className="text-sm text-amber-900 font-medium leading-relaxed">
                 {subject.aiInsight}
              </p>
           </div>
        </div>

        {/* Performance Graph */}
        <div>
           <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp size={18} className="text-blue-600" />
              {t('trend')}
           </h3>
           <div className="h-56 w-full bg-white border border-gray-100 rounded-xl p-2 shadow-sm">
              <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={trendData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} dy={10} />
                    <YAxis domain={[40, 100]} axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                    <Tooltip 
                       contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                       itemStyle={{ fontSize: '12px', fontWeight: 600 }}
                    />
                    <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} name="Arjun" />
                    <Line type="monotone" dataKey="avg" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Class Avg" />
                 </LineChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Topic Breakdown */}
        <div>
           <h3 className="font-bold text-gray-800 mb-4">{t('topicBreakdown')}</h3>
           <div className="space-y-3">
              {subject.topics.map((topic, i) => (
                 <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                       <span className="text-gray-700 font-medium">{topic.topic}</span>
                       <span className={`font-bold ${topic.score >= 75 ? 'text-green-600' : topic.score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>{topic.score}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                       <div 
                          className={`h-full rounded-full ${topic.score >= 75 ? 'bg-green-500' : topic.score >= 60 ? 'bg-yellow-400' : 'bg-red-400'}`} 
                          style={{ width: `${topic.score}%` }}
                       />
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* Recommended Resources */}
        <div>
           <h3 className="font-bold text-gray-800 mb-3">{t('resources')}</h3>
           <div className="space-y-2">
              {subject.resources.map((res, i) => (
                 <a key={i} href={res.link} className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors group">
                    <div className="p-2 bg-white rounded-md border border-gray-200 text-blue-600 mr-3 group-hover:border-blue-200 group-hover:text-blue-700">
                       <ExternalLink size={16} />
                    </div>
                    <div className="flex-1">
                       <p className="text-sm font-semibold text-gray-800">{res.title}</p>
                       <p className="text-[10px] text-gray-500 uppercase tracking-wide font-medium">{res.type}</p>
                    </div>
                 </a>
              ))}
           </div>
        </div>

        {/* Message Teacher */}
        <button className="w-full py-3 bg-white border-2 border-blue-600 text-blue-700 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors">
           <MessageCircle size={20} />
           {t('messageTeacher')}
        </button>

        <div className="h-6"></div>
      </div>
    </div>
  );
};