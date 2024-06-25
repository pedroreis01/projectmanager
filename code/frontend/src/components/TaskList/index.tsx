import * as React from 'react';
import * as C from './style';
import Task, { ITask } from '../Task';
import { ClipLoader } from 'react-spinners';

interface TaskListProps {
  tasks: ITask[];
  deleteTask: (id: number) => void;
  editTask: (task: ITask) => void;
  toggleCompleted: (id: number, done: boolean) => void;
  isLoading?: boolean;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  deleteTask,
  editTask,
  toggleCompleted,
  isLoading,
}) => {
  return (
    <C.TaskListWrapper>
      {isLoading ? (
        <ClipLoader />
      ) : (
        tasks.length === 0 ? <C.NoTasksText>Nenhuma tarefa no momento</C.NoTasksText>
        :
        tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            editTask={editTask}
            toggleCompleted={toggleCompleted}
          />
        ))
      )}
    </C.TaskListWrapper>
  );
};

export default TaskList;
