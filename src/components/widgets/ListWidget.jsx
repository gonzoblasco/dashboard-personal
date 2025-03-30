// src/components/widgets/ListWidget.jsx (con interactividad)
import React, { memo, useState } from "react";
import useLocalData from "../../hooks/useLocalData";
import styled from "@emotion/styled";
import Card from "../common/Card";
import Button from "../common/Button";
import { tasksList as initialTasksList } from "../../data/mockData";
import { useUserPreferences } from "../../context/UserPreferencesContext";

// Styled components
const FilterBar = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

const TaskList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TaskItem = styled.li`
  display: flex;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
`;

const Checkbox = styled.input`
  margin-right: 12px;
`;

const TaskText = styled.span`
  flex-grow: 1;
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
  color: ${(props) => (props.completed ? "#999" : "inherit")};
`;

const TaskActions = styled.div`
  display: flex;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #f44336;
  font-size: 18px;
  cursor: pointer;
  padding: 0 8px;
`;

const NewTaskForm = styled.form`
  display: flex;
  margin-top: 16px;
  gap: 8px;
`;

const TaskInput = styled.input`
  flex-grow: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const ListWidget = () => {
  // Estado para las tareas
  const [tasks, setTasks] = useLocalData(initialTasksList, "dashboard-tasks");

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };
  // Estado para el nuevo texto de tarea
  const [newTaskText, setNewTaskText] = useState("");

  // Estado para el filtro activo
  const [filter, setFilter] = useState("all");

  // Obtener preferencias del usuario
  const { preferences } = useUserPreferences();
  const { colors } = preferences;

  // Guardar tareas en localStorage cuando cambien
  React.useEffect(() => {
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
              <DeleteButton
                className="delete-button"
                onClick={() => handleDeleteTask(task.id)}
              >
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

export default memo(ListWidget);
