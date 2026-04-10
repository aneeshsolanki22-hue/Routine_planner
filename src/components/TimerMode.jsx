import React, { useState, useEffect, useCallback } from 'react';
import { useTimer } from '../hooks/useTimer';
import { getIcon } from '../utils/iconRegistry';

export default function TimerMode({ routine, onComplete, onNavigate }) {
  const [currentTaskIdx, setCurrentTaskIdx] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);
  const task = routine.tasks[currentTaskIdx];

  const handleTimerComplete = useCallback(() => {
    setIsFinishing(true);
  }, []);

  const timer = useTimer(task?.duration || 1, handleTimerComplete);

  // Auto-start timer when switching tasks
  useEffect(() => {
    if (task) {
      timer.reset();
      timer.start();
      setIsFinishing(false);
    }
  }, [task?.id]);

  const handleNext = () => {
    if (currentTaskIdx < routine.tasks.length - 1) {
      setCurrentTaskIdx((prev) => prev + 1);
    } else {
      // Done with all tasks
      onComplete(routine.id, routine.tasks.length);
      onNavigate('home');
    }
  };

  if (!task) return null;

  return (
    <div className="screen timer-screen">
      <div className="header-nav">
        <button onClick={() => onNavigate('detail', { routine })} className="back-btn timer-back">
          Abandon
        </button>
      </div>

      <div className="timer-progress">
        Task {currentTaskIdx + 1} of {routine.tasks.length}
      </div>

      <div className="timer-main">
        <div className="timer-icon">{getIcon(task.icon, { size: 100, strokeWidth: 1.5, color: "rgba(255,255,255,0.7)" })}</div>
        <h2 className="timer-task-name">{task.name}</h2>
        <div className={`timer-clock ${isFinishing ? 'timer-pulse' : ''}`}>
          {timer.display}
        </div>
      </div>

      {isFinishing && (
        <div className="timer-notification">
          Task "{task.name}" complete!
        </div>
      )}

      <div className="action-footer timer-actions">
        {isFinishing ? (
          <button className="cta-button primary" onClick={handleNext}>
            {currentTaskIdx < routine.tasks.length - 1 ? 'Start Next Task' : 'Finish Routine'}
          </button>
        ) : (
          <>
            <button
              className="cta-button secondary"
              onClick={timer.running ? timer.pause : timer.start}
            >
              {timer.running ? 'Pause' : 'Resume'}
            </button>
            <button className="cta-button ghost" onClick={handleNext}>
              Skip
            </button>
          </>
        )}
      </div>
    </div>
  );
}
