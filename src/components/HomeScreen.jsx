import React, { useCallback } from 'react';
import { Play, Trophy, Star, CheckSquare } from 'lucide-react';

function formatTime(t) {
  const [h, m] = t.split(':');
  const hour = parseInt(h);
  const ampm = hour >= 12 ? 'pm' : 'am';
  return `${hour % 12 || 12}:${m}${ampm}`;
}

function totalMins(tasks) {
  return tasks.reduce((s, t) => s + t.duration, 0);
}

function getTodayStr() {
  return new Date().toISOString().slice(0, 10);
}

function RoutineCard({ index, routine, streaks, completionHistory, onPlay }) {
  const streak = streaks[routine.id]?.currentStreak || 0;
  const today = getTodayStr();
  const doneToday = completionHistory.some(
    (h) => h.routineId === routine.id && h.completedAt.slice(0, 10) === today
  );

  return (
    <div className="routine-card" onClick={onPlay} style={{cursor: 'pointer'}}>
      <div className="routine-card-left">
        <div className="routine-card-number">
          {streak >= 7 ? <Trophy size={18} color="#FFD700" /> : streak >= 3 ? <Star size={18} color="#FFD700" /> : index}
        </div>
      </div>
      <div className="routine-card-content">
        <div className="routine-card-name">{routine.name}</div>
        <div className="routine-card-meta">
          {formatTime(routine.startTime)} – {formatTime(routine.endTime)}
          <span className="routine-card-duration">· {totalMins(routine.tasks)}m</span>
        </div>
      </div>
      <div className="routine-card-right">
        {doneToday && <span className="done-badge"><CheckSquare size={20} /></span>}
        {streak > 0 && (
          <span className="streak-badge"><Trophy size={12} style={{marginRight: '4px'}}/>{streak}</span>
        )}
        <button className="play-btn" onClick={(e) => { e.stopPropagation(); onPlay(); }} aria-label="Start routine">
          <Play size={16} fill="currentColor" style={{ marginLeft: '2px' }} />
        </button>
      </div>
    </div>
  );
}

export default function HomeScreen({ data, onNavigate }) {
  const { routines, streaks = {}, completionHistory = [] } = data;

  const handlePlay = useCallback((routine) => {
    onNavigate('detail', { routine });
  }, [onNavigate]);

  const dateOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  const todayFormatted = new Date().toLocaleDateString('en-US', dateOptions).toUpperCase();

  const todayStr = getTodayStr();
  const completedTodayCount = routines.filter(r => 
    completionHistory.some(h => h.routineId === r.id && h.completedAt.slice(0, 10) === todayStr)
  ).length;

  return (
    <div className="screen">
      <div className="home-header">
        <h1 className="home-title">Routines</h1>
        <p className="home-subtitle">{routines.length} active routines</p>
      </div>

      <div className="routine-list">
        {routines.map((routine, i) => (
          <RoutineCard
            key={routine.id}
            index={i + 1}
            routine={routine}
            streaks={streaks}
            completionHistory={completionHistory}
            onPlay={() => handlePlay(routine)}
          />
        ))}
        <button className="add-routine-btn glass-btn" onClick={() => onNavigate('add')}>
          + Add Routine
        </button>
      </div>
    </div>
  );
}
