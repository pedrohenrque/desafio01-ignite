import React, { useState } from "react";

import { Header } from "../components/Header";
import { MyTasksList } from "../components/MyTasksList";
import { TodoInput } from "../components/TodoInput";

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (newTaskTitle) {
      const taskTitle = newTaskTitle;

      return setTasks([
        ...tasks,
        {
          id: new Date().getTime(),
          title: taskTitle,
          done: false,
        },
      ]);
    }
    return null;
  }

  function handleMarkTaskAsDone(id: number) {
    setTasks((prevTasks) => {
      const indexOfTask = prevTasks.findIndex((task) => task.id === id);

      if (indexOfTask >= 0) {
        const newTasks = [...prevTasks];
        newTasks[indexOfTask].done = !newTasks[indexOfTask].done;
        return newTasks;
      }

      return prevTasks;
    });
  }

  function handleRemoveTask(id: number) {
    setTasks((prevTasks) => {
      const tasksFilter = tasks.filter((item) => item.id !== id);

      if (tasksFilter.length !== prevTasks.length) {
        return tasksFilter;
      }

      return prevTasks;
    });
  }

  return (
    <>
      <Header />

      <TodoInput addTask={handleAddTask} />

      <MyTasksList
        tasks={tasks}
        onPress={handleMarkTaskAsDone}
        onLongPress={handleRemoveTask}
      />
    </>
  );
}
