import React, { useState, useTransition } from 'react';
import { useStorage } from './hooks/useStorage';
import HomeScreen from './components/HomeScreen';
import DetailView from './components/DetailView';
import TimerMode from './components/TimerMode';
import EditMode from './components/EditMode';
import ChecklistTab from './components/ChecklistTab';
import { CalendarDays, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [data, updateData] = useStorage();
  const [activeTab, setActiveTab] = useState('routine'); // 'routine' | 'checklist'
  const [view, setView] = useState({ name: 'home', params: {} });
  const [isPending, startTransition] = useTransition();

  if (!data) return <div className="loading">Loading...</div>;

  const navigate = (name, params = {}) => {
    // Vercel React best practice: useTransition for view switches
    startTransition(() => {
      setView({ name, params });
    });
  };

  const handleCompleteRoutine = (routineId, tasksCompleted) => {
    updateData((prev) => {
      const next = { ...prev };
      
      // Add to history
      const now = new Date().toISOString();
      const today = now.slice(0, 10);
      next.completionHistory.push({
        routineId,
        completedAt: now,
        tasksCompleted
      });

      // Update streak
      if (!next.streaks[routineId]) {
        next.streaks[routineId] = { currentStreak: 1, longestStreak: 1, lastCompletedDate: today };
      } else {
        const streak = next.streaks[routineId];
        if (streak.lastCompletedDate !== today) {
          // If the last completion was exactly yesterday, increment. Otherwise, reset to 1.
          const lastDate = new Date(streak.lastCompletedDate);
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          
          if (lastDate.toISOString().slice(0,10) === yesterday.toISOString().slice(0,10)) {
            streak.currentStreak += 1;
          } else {
            streak.currentStreak = 1;
          }
          
          if (streak.currentStreak > streak.longestStreak) {
            streak.longestStreak = streak.currentStreak;
          }
          streak.lastCompletedDate = today;
        }
      }
      return next;
    });
  };

  const handleUpdateChecklists = (checklists) => {
    updateData(prev => ({ ...prev, checklists }));
  };

  const handleSaveRoutine = (routine) => {
    updateData(prev => {
      const next = { ...prev };
      const idx = next.routines.findIndex(r => r.id === routine.id);
      if (idx !== -1) {
        next.routines[idx] = routine;
      } else {
        next.routines.push(routine);
      }
      return next;
    });
  };

  const handleDeleteRoutine = (routineId) => {
    updateData(prev => {
      const next = { ...prev };
      next.routines = next.routines.filter(r => r.id !== routineId);
      return next;
    });
  };


  return (
    <div className="app-container">
      {/* View matching */}
      <main className={`app-main ${isPending ? 'navigating' : ''}`}>
        {view.name === 'home' && activeTab === 'routine' && (
          <HomeScreen data={data} onNavigate={navigate} />
        )}
        
        {view.name === 'home' && activeTab === 'checklist' && (
          <ChecklistTab checklists={data.checklists} onUpdateChecklist={handleUpdateChecklists} />
        )}

        {view.name === 'detail' && (
          <DetailView 
            routine={view.params.routine} 
            completionHistory={data.completionHistory}
            onNavigate={navigate} 
          />
        )}

        {view.name === 'timer' && (
          <TimerMode 
            routine={view.params.routine} 
            onComplete={handleCompleteRoutine}
            onNavigate={navigate} 
          />
        )}

        {view.name === 'edit' && (
          <EditMode 
            routine={view.params.routine} 
            onSave={handleSaveRoutine}
            onDelete={handleDeleteRoutine}
            onNavigate={navigate} 
          />
        )}
        {view.name === 'add' && (
          <EditMode 
            routine={{ id: `routine_${Date.now()}`, name: '', startTime: '09:00', endTime: '10:00', tasks: [] }} 
            onSave={handleSaveRoutine}
            onDelete={() => navigate('home')}
            onNavigate={navigate} 
          />
        )}
      </main>

      {/* Bottom Nav if on Home */}
      {view.name === 'home' && (
        <nav className="bottom-nav">
          <button 
            className={`nav-btn ${activeTab === 'routine' ? 'active' : ''}`}
            onClick={() => setActiveTab('routine')}
          >
            <span className="nav-icon"><CalendarDays size={20} /></span>
            Routine
          </button>
          <button 
            className={`nav-btn ${activeTab === 'checklist' ? 'active' : ''}`}
            onClick={() => setActiveTab('checklist')}
          >
            <span className="nav-icon"><CheckCircle2 size={20} /></span>
            Checklist
          </button>
        </nav>
      )}
    </div>
  );
}
