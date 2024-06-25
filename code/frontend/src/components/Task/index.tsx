import * as React from 'react';
import * as C from './style';
import Button from '../Button';
import { HiOutlineTrash } from 'react-icons/hi2';
import { FiEdit } from 'react-icons/fi';
import moment from 'moment';
import { FaRegCalendarAlt, FaRegCalendarCheck } from 'react-icons/fa';

export interface ITask {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  done: boolean;
  finishedDate: string;
  projectName: string;
  projectId: number;
}
interface TaskProps {
  task: ITask;
  deleteTask: (id: number) => void;
  editTask: (task: ITask) => void;
  toggleCompleted: (id: number, done: boolean) => void;
}

const Task: React.FC<TaskProps> = ({
  task,
  deleteTask,
  editTask,
  toggleCompleted,
}) => {
  return (
    <C.TaskItemWrapper>
      <C.TaskCheckbox
        type="checkbox"
        checked={task.done}
        onChange={() => toggleCompleted(task.id, !task.done)}
      />
      <C.TaskBody>
        <C.TaskText $done={task.done}>
          {task.name} - {task.projectName}
        </C.TaskText>
        <C.TaskGroupDate>
          <C.TaskDate>
            <FaRegCalendarAlt /> {moment(task.dueDate).format('DD/MM/yyyy')}
          </C.TaskDate>
          {task.done && (
              <C.TaskDate>
              <FaRegCalendarCheck />{' '}
                {moment(task.finishedDate).format('DD/MM/yyyy')}
              </C.TaskDate>
          )}
        </C.TaskGroupDate>
      </C.TaskBody>

      <C.TaskActions>
        <Button color="primary" isRound onlyIcon onClick={() => editTask(task)}>
          <FiEdit />
        </Button>
        <Button
          color="danger"
          isRound
          onlyIcon
          onClick={() => deleteTask(task.id)}
        >
          <HiOutlineTrash />
        </Button>
      </C.TaskActions>
    </C.TaskItemWrapper>
  );
};

export default Task;
