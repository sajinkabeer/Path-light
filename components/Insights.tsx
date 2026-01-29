import React from 'react';
import { SubjectData } from '../types';
import { TrendingUp, AlertOctagon, Award, ArrowRight, Zap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface InsightsProps {
  subjects: SubjectData[];
  t: (key: string) => string;
}

const Insights: React.FC<InsightsProps> = ({ subjects, t }) => {
  const predictions = subjects.map(s => ({
    name: s.name.substring(0, 3), // Short name
    current: s.currentScore,
    predicted: s.predictedScore || s.currentScore,
  }));

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold text-gray-800 px-1">{t('insights')} & Predictions</h2>

      {/* Board Exam Prediction */}
      <div className="bg-indigo-900 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-3 opacity-10">
           <TrendingUp size={120} />
        </div>
        <div className="relative z-10">
          <h3 className="text-indigo-200 text-sm font-medium mb-1">Predicted Final Outcome</h3>
          <p className="text-xs text-indigo-300 mb-4">Based on current trajectory</p>
          
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
               <BarChart data={predictions} barGap={4}>
                  <XAxis dataKey="name" tick={{fill: '#a5b4fc', fontSize: 12}} axisLine={false} tickLine={false} />
                  <Tooltip 
                     cursor={{fill: 'rgba(255,255,255,0.1)'}}
                     contentStyle={{backgroundColor: '#1e1b4b', border: 'none', color: '#fff', borderRadius: '8px'}}
                     labelStyle={{color: '#a5b4fc'}}
                  />
                  <Bar dataKey="current" name="Current" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="predicted" name="Predicted" fill="#c7d2fe" radius={[4, 4, 0, 0]} />
               </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex justify-center gap-4 mt-2 text-xs">
             <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-indigo-500 rounded-sm"></div> Current
             </div>
             <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-indigo-200 rounded-sm"></div> Predicted
             </div>
          </div>
        </div>
      </div>

      {/* Early Warning System */}
      <div className="space-y-3">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
           <AlertOctagon className="text-red-500" size={18} />
           Areas Needing Focus
        </h3>
        {subjects.filter(s => s.status === 'declining').map(s => (
           <div key={s.id} className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl shadow-sm">
              <h4 className="font-bold text-red-900">{s.name}: Scores Declining</h4>
              <p className="text-sm text-red-700 mt-1">Consistent drop over last 4 assessments. Immediate intervention recommended in {s.struggles[0]?.split('(')[0]}.</p>
              <button className="mt-3 text-xs font-bold text-red-600 bg-white px-3 py-1.5 rounded-full border border-red-100 flex items-center gap-1">
                 View Action Plan <ArrowRight size={12} />
              </button>
           </div>
        ))}
      </div>

      {/* Success Highlights */}
      <div className="space-y-3">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
           <Award className="text-yellow-500" size={18} />
           Success Highlights
        </h3>
        {subjects.filter(s => s.status === 'improving' || s.currentScore > 80).map(s => (
           <div key={s.id} className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl shadow-sm">
              <h4 className="font-bold text-green-900">{s.name}: Top 30% of Class</h4>
              <p className="text-sm text-green-700 mt-1">Excellent grasp of {s.strengths[0]?.split('(')[0]}. Keep up the momentum!</p>
           </div>
        ))}
      </div>

      {/* AI Suggestions */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-5 text-white shadow-md">
         <div className="flex items-center gap-2 mb-3">
            <Zap className="text-yellow-300" size={20} fill="currentColor" />
            <h3 className="font-bold">AI Recommended Actions</h3>
         </div>
         <ul className="space-y-3">
            <li className="flex gap-3 items-start text-sm bg-white/10 p-2 rounded-lg">
               <span className="font-bold text-blue-200 mt-0.5">1.</span>
               Schedule 2 hours/week extra practice in Chemistry specifically on equations.
            </li>
            <li className="flex gap-3 items-start text-sm bg-white/10 p-2 rounded-lg">
               <span className="font-bold text-blue-200 mt-0.5">2.</span>
               Consider discussing study habits with the Math teacher regarding word problems.
            </li>
         </ul>
      </div>
      
      <div className="h-6"></div>
    </div>
  );
};

export default Insights;