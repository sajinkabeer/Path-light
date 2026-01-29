import React, { useState } from 'react';
import { Update } from '../types';
import { MessageSquare, Calendar, Filter, Search, Check } from 'lucide-react';

interface UpdatesProps {
  updates: Update[];
  t: (key: string) => string;
}

const Updates: React.FC<UpdatesProps> = ({ updates, t }) => {
  const [filter, setFilter] = useState<'all' | 'academic' | 'general'>('all');

  const filteredUpdates = updates.filter(u => filter === 'all' || u.type === filter);

  return (
    <div className="p-4 bg-gray-50 min-h-full">
      <div className="flex justify-between items-center mb-6 px-1">
        <h2 className="text-xl font-bold text-gray-800">{t('updates')}</h2>
        <div className="flex gap-2">
          <button className="p-2 bg-white rounded-full shadow-sm text-gray-500 hover:text-blue-600">
             <Search size={18} />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide">
         {['all', 'academic', 'general', 'behavior'].map((f) => (
            <button
               key={f}
               onClick={() => setFilter(f as any)}
               className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === f 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                  : 'bg-white text-gray-600 border border-gray-200'
               }`}
            >
               {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
         ))}
      </div>

      {/* Timeline Feed */}
      <div className="space-y-4">
        {filteredUpdates.length === 0 ? (
           <div className="text-center py-10 text-gray-400">
              <p>No updates found for this filter.</p>
           </div>
        ) : (
           filteredUpdates.map((update, index) => (
            <div key={update.id} className="relative pl-6 pb-2 last:pb-0">
               {/* Timeline Line */}
               {index !== filteredUpdates.length - 1 && (
                  <div className="absolute left-2.5 top-8 bottom-0 w-0.5 bg-gray-200"></div>
               )}
               
               {/* Dot */}
               <div className={`absolute left-0 top-1.5 w-5 h-5 rounded-full border-4 border-white shadow-sm flex items-center justify-center ${
                  update.type === 'academic' ? 'bg-blue-500' : update.type === 'general' ? 'bg-purple-500' : 'bg-orange-500'
               }`}>
               </div>

               {/* Card */}
               <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                     <div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide mb-1 inline-block ${
                           update.type === 'academic' ? 'bg-blue-50 text-blue-600' : update.type === 'general' ? 'bg-purple-50 text-purple-600' : 'bg-orange-50 text-orange-600'
                        }`}>
                           {update.subject}
                        </span>
                        <h4 className="text-sm font-bold text-gray-900">{update.teacherName}</h4>
                     </div>
                     <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                        <Calendar size={10} /> {update.date}
                     </span>
                  </div>
                  
                  <p className="text-sm text-gray-700 leading-relaxed mb-3">
                     {update.message}
                  </p>

                  {update.score && (
                     <div className="inline-flex items-center px-3 py-1 bg-gray-50 rounded-lg border border-gray-200 mb-3">
                        <span className="text-xs font-semibold text-gray-500 mr-2">Score:</span>
                        <span className="text-sm font-bold text-gray-900">{update.score}</span>
                     </div>
                  )}

                  <div className="flex gap-2 border-t border-gray-100 pt-3 mt-1">
                     <button className="flex-1 text-xs font-medium text-gray-500 hover:text-blue-600 py-1 flex items-center justify-center gap-1 transition-colors">
                        <Check size={14} /> Acknowledge
                     </button>
                     <div className="w-px bg-gray-200 h-4 self-center"></div>
                     <button className="flex-1 text-xs font-medium text-gray-500 hover:text-blue-600 py-1 flex items-center justify-center gap-1 transition-colors">
                        <MessageSquare size={14} /> Reply
                     </button>
                  </div>
               </div>
            </div>
          ))
        )}
      </div>
      <div className="h-20"></div>
    </div>
  );
};

export default Updates;