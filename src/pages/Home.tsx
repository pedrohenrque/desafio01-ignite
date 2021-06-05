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
    const tasksFilter = tasks.filter((item) => item.id !== id);
    const markerTask = tasks.filter((item) => item.id === id)[0];
    markerTask.done = !markerTask.done;

    setTasks([...tasksFilter, markerTask]);
  }

  function handleRemoveTask(id: number) {
    const tasksFilter = tasks.filter((item) => item.id !== id);
    setTasks(tasksFilter);
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
