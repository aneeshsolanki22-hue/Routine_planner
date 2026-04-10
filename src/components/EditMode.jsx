import React, { useState } from 'react';
import { getIcon, IconMap } from '../utils/iconRegistry';

export default function EditMode({ routine, onSave, onDelete, onNavigate }) {
  const [draft, setDraft] = useState(() => JSON.parse(JSON.stringify(routine)));

  const handleTaskChange = (idx, field, value) => {
    const next = { ...draft };
    if (field === 'duration') {
      next.tasks[idx][field] = parseInt(value, 10) || 1;
    } else {
      next.tasks[idx][field] = value;
    }
    setDraft(next);
  };

  const handleAddTask = () => {
    setDraft(prev => ({
      ...prev,
      tasks: [
        ...prev.tasks, 
        { id: `task_new_${Date.now()}`, name: 'New Task', duration: 5, icon: 'activity', order: prev.tasks.length + 1 }
      ]
    }));
  };

  const handleDeleteTask = (idx) => {
    setDraft(prev => {
      const tasks = [...prev.tasks];
      tasks.splice(idx, 1);
      return { ...prev, tasks };
    });
  };

  return (
    <div className="screen edit-screen">
      <div className="header-nav">
        <button onClick={() => onNavigate('detail', { routine })} className="back-btn">Cancel</button>
        <button onClick={() => { onSave(draft); onNavigate('detail', { routine: draft }); }} className="save-btn">Save</button>
      </div>

      <div className="edit-header">
        <input 
          className="edit-title-input" 
          value={draft.name} 
          onChange={(e) => setDraft({ ...draft, name: e.target.value })} 
          placeholder="Routine Name"
        />
        <div className="edit-time-inputs">
          <input type="time" value={draft.startTime} onChange={(e) => setDraft({...draft, startTime: e.target.value})} />
          <span>to</span>
          <input type="time" value={draft.endTime} onChange={(e) => setDraft({...draft, endTime: e.target.value})} />
        </div>
      </div>

      <div className="edit-task-list">
        {draft.tasks.map((task, idx) => (
          <div key={task.id} className="edit-task-item">
            <div className="task-icon-sm">
               {getIcon(task.icon, { size: 16 })}
            </div>
            <select 
               className="edit-icon-select"
               value={task.icon || 'activity'}
               onChange={(e) => handleTaskChange(idx, 'icon', e.target.value)}
            >
               {Object.keys(IconMap).map(k => <option key={k} value={k}>{k}</option>)}
            </select>
            <input  
              className="edit-name-input" 
              value={task.name} 
              onChange={(e) => handleTaskChange(idx, 'name', e.target.value)}
            />
            <div className="edit-duration">
              <input 
                type="number" 
                min="1" 
                value={task.duration} 
                onChange={(e) => handleTaskChange(idx, 'duration', e.target.value)} 
              />
              <span>m</span>
            </div>
            <button className="del-btn" onClick={() => handleDeleteTask(idx)}>×</button>
          </div>
        ))}
        <button className="add-task-btn" onClick={handleAddTask}>+ Add Task</button>
        <button className="del-routine-btn" onClick={() => { 
          if(window.confirm('Delete this routine?')) { 
            onDelete(routine.id); onNavigate('home'); 
          } 
        }}>Delete Routine</button>
      </div>
    </div>
  );
}
