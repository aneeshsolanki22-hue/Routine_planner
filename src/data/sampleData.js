export const sampleData = {
  routines: [
    {
      id: 'routine_1',
      name: "Toukir's Morning Routine",
      startTime: '08:30',
      endTime: '09:17',
      tasks: [
        { id: 'task_1_1', name: 'Drinking Water', duration: 1, icon: 'droplets', order: 1 },
        { id: 'task_1_2', name: 'Showering', duration: 15, icon: 'bath', order: 2 },
        { id: 'task_1_3', name: 'Go for a walk without your phone', duration: 15, icon: 'tree', order: 3 },
        { id: 'task_1_4', name: 'Skincare', duration: 3, icon: 'sun', order: 4 },
        { id: 'task_1_5', name: 'Write "Today\'s contract" in one sentence', duration: 2, icon: 'file', order: 5 },
        { id: 'task_1_6', name: 'Check your schedule for the day', duration: 10, icon: 'book', order: 6 },
        { id: 'task_1_7', name: 'Make your bed', duration: 1, icon: 'activity', order: 7 },
      ],
    },
    {
      id: 'routine_2',
      name: 'Evening Wind-Down',
      startTime: '21:00',
      endTime: '21:30',
      tasks: [
        { id: 'task_2_1', name: 'Dinner prep', duration: 15, icon: 'activity', order: 1 },
        { id: 'task_2_2', name: 'Stretch', duration: 10, icon: 'activity', order: 2 },
        { id: 'task_2_3', name: 'Journal', duration: 5, icon: 'book', order: 3 },
      ],
    },
    {
      id: 'routine_3',
      name: 'Deep Work Session',
      startTime: '10:00',
      endTime: '12:00',
      tasks: [
        { id: 'task_3_1', name: 'Review goals', duration: 5, icon: 'check', order: 1 },
        { id: 'task_3_2', name: 'Focus block 1', duration: 50, icon: 'activity', order: 2 },
        { id: 'task_3_3', name: 'Short break', duration: 10, icon: 'coffee', order: 3 },
        { id: 'task_3_4', name: 'Focus block 2', duration: 50, icon: 'activity', order: 4 },
        { id: 'task_3_5', name: 'Reflect & log', duration: 5, icon: 'file', order: 5 },
      ],
    },
  ],
  checklists: [
    {
      id: 'checklist_1',
      name: 'Grocery List',
      items: [
        { id: 'item_1', text: 'Milk', completed: false },
        { id: 'item_2', text: 'Eggs', completed: false },
        { id: 'item_3', text: 'Bread', completed: false },
      ],
    },
  ],
  completionHistory: [],
  streaks: {},
};
