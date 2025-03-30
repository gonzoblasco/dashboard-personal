// src/components/widgets/ListWidget.jsx (con interactividad)
import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Card from "../common/Card";
import Button from "../common/Button";
import { tasksList as initialTasksList } from "../../data/mockData";
import { useUserPreferences } from "../../context/UserPreferencesContext";

const TaskList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const TaskItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  &:hover .delete-button {
    visibility: visible;
  }
`;

const Checkbox = styled.input`
  margin-right: 12px;
`;

const TaskText = styled.span`
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
  color: ${(props) => (props.completed ? "#888" : "#333")};
`;

const TaskActions = styled.div`
  margin-left: auto;
  display: flex;
  gap: 8px;
`;

const FilterBar = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
`;

const NewTaskForm = styled.form`
  display: flex;
  margin-top: 12px;
  border-top: 1px solid #f0f0f0;
  padding-top: 12px;
`;

const TaskInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #f44336;
  cursor: pointer;
  font-size: 14px;
  visibility: hidden;
`;

const ListWidget = () => {
  // Estado para las tareas
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : initialTasksList;
  });

  // Estado para el nuevo texto de tarea
  const [newTaskText, setNewTaskText] = useState("");

  // Estado para el filtro activo
  const [filter, setFilter] = useState("all");

  // Obtener preferencias del usuario
  const { preferences } = useUserPreferences();
  const { colors } = preferences;

  // Guardar tareas en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Manejar cambio de estado de tarea
  const handleToggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  // Manejar eliminación de tarea
  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Manejar adición de nueva tarea
  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskText.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: newTaskText,
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
    setNewTaskText("");
  };

  // Filtrar tareas según el filtro activo
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  // Componente para los botones de filtro
  const FilterButton = ({ label, value }) => (
    <Button
      variant={filter === value ? "primary" : "secondary"}
      onClick={() => setFilter(value)}
      style={{
        backgroundColor: filter === value ? colors.primary : "transparent",
        borderColor: colors.primary,
        color: filter === value ? "white" : colors.primary,
      }}
    >
      {label}
    </Button>
  );

  return (
    <Card title="Tareas Pendientes">
      <FilterBar>
        <FilterButton label="Todas" value="all" />
        <FilterButton label="Activas" value="active" />
        <FilterButton label="Completadas" value="completed" />
      </FilterBar>

      <TaskList>
        {filteredTasks.map((task) => (
          <TaskItem key={task.id}>
            <Checkbox
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleComplete(task.id)}
            />
            <TaskText completed={task.completed}>{task.text}</TaskText>
            <TaskActions>
              <DeleteButton className="delete-button" onClick={() => handleDeleteTask(task.id)}>
                ×
              </DeleteButton>
            </TaskActions>
          </TaskItem>
        ))}
      </TaskList>

      <NewTaskForm onSubmit={handleAddTask}>
        <TaskInput
          type="text"
          placeholder="Agregar nueva tarea..."
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
        />
        <Button type="submit" style={{ backgroundColor: colors.primary }}>
          Agregar
        </Button>
      </NewTaskForm>
    </Card>
  );
};

export default ListWidget;
