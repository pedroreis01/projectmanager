import * as React from 'react';
import * as C from './style';
import Task, { ITask } from '../Task';

interface TaskListProps {
  tasks: ITask[];
  deleteTask: (id: number) => void;
  editTask: (task: ITask) => void;
  toggleCompleted: (id: number, done: boolean) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks,
  deleteTask,
  editTask,
  toggleCompleted,
 }) => {

  return (
    <C.TaskListWrapper>

      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          editTask={editTask}
          toggleCompleted={toggleCompleted}
        />
      ))}
    </C.TaskListWrapper>
  );
};

export default TaskList;