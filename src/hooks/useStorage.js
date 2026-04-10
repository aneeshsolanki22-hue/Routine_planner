import { useState, useCallback } from 'react';
import { sampleData } from '../data/sampleData';

const STORAGE_KEY = 'routine_planner_v1';

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveToStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // storage full or disabled — silent fail
  }
}

function initData() {
  const stored = loadFromStorage();
  if (stored) return stored;
  saveToStorage(sampleData);
  return sampleData;
}

export function useStorage() {
  const [data, setData] = useState(() => initData());

  const update = useCallback((updater) => {
    setData((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      saveToStorage(next);
      return next;
    });
  }, []);

  return [data, update];
}
