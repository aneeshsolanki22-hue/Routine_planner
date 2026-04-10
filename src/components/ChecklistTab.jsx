import React, { useState } from 'react';

export default function ChecklistTab({ checklists, onUpdateChecklist }) {
  const [newItemText, setNewItemText] = useState('');
  
  // We'll just manage the first checklist for this demo app
  const checklist = checklists[0] || { items: [] };

  const handleToggle = (itemId) => {
    const nextChecklists = [...checklists];
    const item = nextChecklists[0].items.find(i => i.id === itemId);
    if (item) item.completed = !item.completed;
    onUpdateChecklist(nextChecklists);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newItemText.trim()) return;
    
    const nextChecklists = [...checklists];
    nextChecklists[0].items.push({
      id: `item_${Date.now()}`,
      text: newItemText.trim(),
      completed: false
    });
    
    onUpdateChecklist(nextChecklists);
    setNewItemText('');
  };

  const handleDelete = (itemId) => {
    const nextChecklists = [...checklists];
    nextChecklists[0].items = nextChecklists[0].items.filter(i => i.id !== itemId);
    onUpdateChecklist(nextChecklists);
  };

  return (
    <div className="screen checklist-screen">
      <div className="home-header">
        <h1 className="home-title">Checklist</h1>
        <p className="home-subtitle">{checklist.items.filter(i => !i.completed).length} items remaining</p>
      </div>

      <div className="checklist-container">
        {checklist.items.map((item) => (
          <div key={item.id} className={`checklist-item ${item.completed ? 'completed' : ''}`}>
            <button 
              className={`checkbox ${item.completed ? 'checked' : ''}`}
              onClick={() => handleToggle(item.id)}
            >
              {item.completed && '✓'}
            </button>
            <span className="checklist-text">{item.text}</span>
            <button className="del-btn" onClick={() => handleDelete(item.id)}>×</button>
          </div>
        ))}

        <form onSubmit={handleAdd} className="add-item-form">
          <input 
            type="text" 
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            placeholder="Add new item..."
            className="add-item-input"
          />
          <button type="submit" className="add-item-btn">+</button>
        </form>
      </div>
    </div>
  );
}
