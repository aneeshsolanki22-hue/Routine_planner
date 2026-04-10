import React from 'react';
import { Activity, Droplets, BookOpen, Sun, Moon, Coffee, Bath, TreePine, FileText, CheckCircle2 } from 'lucide-react';

export const IconMap = {
  activity: <Activity />,
  droplets: <Droplets />,
  book: <BookOpen />,
  sun: <Sun />,
  moon: <Moon />,
  coffee: <Coffee />,
  bath: <Bath />,
  tree: <TreePine />,
  file: <FileText />,
  check: <CheckCircle2 />
};

export const getIcon = (key, props = {}) => {
  const icon = IconMap[key] || <Activity />;
  return React.cloneElement(icon, props);
};
