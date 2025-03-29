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
