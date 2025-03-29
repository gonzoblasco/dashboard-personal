// src/components/widgets/ListWidget.jsx
import React from "react";
import styled from "@emotion/styled";
import Card from "../common/Card";
import { tasksList } from "../../data/mockData";

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
`;

const Checkbox = styled.input`
  margin-right: 12px;
`;

const TaskText = styled.span`
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
  color: ${(props) => (props.completed ? "#888" : "#333")};
`;

const ListWidget = () => {
  return (
    <Card title="Tareas Pendientes">
      <TaskList>
        {tasksList.map((task) => (
          <TaskItem key={task.id}>
            <Checkbox type="checkbox" checked={task.completed} readOnly />
            <TaskText completed={task.completed}>{task.text}</TaskText>
          </TaskItem>
        ))}
      </TaskList>
    </Card>
  );
};

export default ListWidget;
