import React, { useMemo } from 'react';
import { ChevronLeft, MoreHorizontal, Circle } from 'lucide-react';
import { getIcon } from '../utils/iconRegistry';

function totalMins(tasks) {
  return tasks.reduce((s, t) => s + t.duration, 0);
}

function formatTime(t) {
  const [h, m] = t.split(':');
  const hour = parseInt(h);
  const ampm = hour >= 12 ? 'pm' : 'am';
  return `${hour % 12 || 12}:${m}${ampm}`;
}

export default function DetailView({ routine, completionHistory, onNavigate }) {
  const isDoneToday = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return completionHistory.some(
      (h) => h.routineId === routine.id && h.completedAt.slice(0, 10) === today
    );
  }, [routine.id, completionHistory]);

  return (
    <div className="screen">
      <div className="header-nav">
        <button onClick={() => onNavigate('home')} className="back-btn" title="Back">
          <ChevronLeft size={20} />
        </button>
        <button className="options-btn" onClick={() => onNavigate('edit', { routine })} title="Options">
          <MoreHorizontal size={20} />
        </button>
      </div>
      
      <div className="detail-header">
        <h1 className="detail-title">{routine.name}</h1>
        <p className="detail-meta">
          {formatTime(routine.startTime)} – {formatTime(routine.endTime)} 
          <span className="detail-duration"> ({totalMins(routine.tasks)} mins)</span>
        </p>
      </div>

      <div className="task-list-disabled">
        {routine.tasks.map((task, i) => (
          <div key={task.id} className="task-item-disabled">
            <div className="task-left">
              <span className="task-number">{i + 1}</span>
            </div>
            <div className="task-body">
              <span className="task-icon">{getIcon(task.icon, { size: 24, strokeWidth: 1.5, color: "rgba(255,255,255,0.7)" })}</span>
              <span className="task-name">{task.name}</span>
            </div>
            <div className="task-right">
              <span className="task-duration">{task.duration}m</span>
              <div className="checkbox-empty"><Circle size={24} strokeWidth={1} color="rgba(255,255,255,0.2)" /></div>
            </div>
          </div>
        ))}
      </div>

      <div className="action-footer">
        <button 
          className="cta-button primary" 
          onClick={() => onNavigate('timer', { routine })}
        >
          {isDoneToday ? 'Restart Routine' : 'Start Routine'}
        </button>
      </div>
    </div>
  );
}
