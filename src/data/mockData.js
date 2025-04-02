// src/data/mockData.js
export const habitData = [
  { day: "Lun", completed: 5, total: 7 },
  { day: "Mar", completed: 6, total: 7 },
  { day: "Mié", completed: 4, total: 7 },
  { day: "Jue", completed: 7, total: 7 },
  { day: "Vie", completed: 5, total: 7 },
  { day: "Sáb", completed: 3, total: 7 },
  { day: "Dom", completed: 2, total: 7 },
];

export const goalProgress = {
  current: 68,
  target: 100,
  unit: "%",
  title: "Progreso Proyecto React",
};

export const tasksList = [
  { id: 1, text: "Aprender Hooks básicos", completed: true },
  { id: 2, text: "Crear componente Card", completed: true },
  { id: 3, text: "Implementar Context API", completed: false },
  { id: 4, text: "Estudiar Redux Toolkit", completed: false },
  { id: 5, text: "Practicar con Recharts", completed: false },
];

export const recentActivities = [
  {
    id: 1,
    type: "completion",
    text: 'Completaste "Crear componente Card"',
    timestamp: "2023-09-10T14:30:00Z",
  },
  {
    id: 2,
    type: "milestone",
    text: 'Alcanzaste 50% en "Progreso Proyecto React"',
    timestamp: "2023-09-09T16:15:00Z",
  },
  {
    id: 3,
    type: "streak",
    text: "3 días consecutivos de actividad",
    timestamp: "2023-09-08T20:00:00Z",
  },
];

// Data for multi-chart visualization widget
export const productivityData = [
  {
    date: "Ene",
    focusTime: 4.2,
    tasksCompleted: 15,
    efficiency: 68
  },
  {
    date: "Feb",
    focusTime: 5.8,
    tasksCompleted: 22,
    efficiency: 75
  },
  {
    date: "Mar",
    focusTime: 6.5,
    tasksCompleted: 28,
    efficiency: 82
  },
  {
    date: "Abr",
    focusTime: 5.9,
    tasksCompleted: 25,
    efficiency: 79
  },
  {
    date: "May",
    focusTime: 7.1,
    tasksCompleted: 30,
    efficiency: 86
  },
  {
    date: "Jun",
    focusTime: 6.8,
    tasksCompleted: 27,
    efficiency: 84
  },
  {
    date: "Jul",
    focusTime: 6.2,
    tasksCompleted: 24,
    efficiency: 78
  },
  {
    date: "Ago",
    focusTime: 7.5,
    tasksCompleted: 32,
    efficiency: 89
  },
  {
    date: "Sep",
    focusTime: 8.1,
    tasksCompleted: 35,
    efficiency: 92
  },
  {
    date: "Oct",
    focusTime: 7.8,
    tasksCompleted: 33,
    efficiency: 88
  },
  {
    date: "Nov",
    focusTime: 6.9,
    tasksCompleted: 29,
    efficiency: 85
  },
  {
    date: "Dic",
    focusTime: 5.4,
    tasksCompleted: 20,
    efficiency: 74
  }
];
