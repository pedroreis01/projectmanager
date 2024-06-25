import { useCallback, useEffect, useState } from 'react';
import CardContent from '../../components/CardContent';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';
import { ITask } from '../../components/Task';
import useAlert from '../../hooks/useAlert';
import TaskList from '../../components/TaskList';
import Button from '../../components/Button';
import * as C from './style';
import { GoPlus } from 'react-icons/go';
import { FiPlus } from 'react-icons/fi';

const Tasks: React.FC = () => {
  const { user } = useAuth();
  const { addAlert } = useAlert();
  const [tasks, setTasks] = useState<ITask[]>([]);

  const getTasks = useCallback(() => {
    api
      .get(`task/user/${user.id}`)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        addAlert({
          type: 'danger',
          title: 'Error ao buscar tarefas',
          message: error.response.data.message,
        });
      });
  }, [user]);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const deleteTask = (id: number) => {
    api
      .delete(`task/${id}`)
      .then(() => {
        getTasks();
      })
      .catch((error) => {
        addAlert({
          type: 'danger',
          title: 'Error ao excluir tarefa',
          message: error.response.data.message,
        });
      });
  };

  const editTask = (task: ITask) => {
    alert('Editou a tarefa ' + task.id);
  };

  const toggleCompleted = (id: number, done: boolean) => {
    api
      .patch(`task/${id}/status`, { done })
      .then(() => {
        getTasks();
      })
      .catch((error) => {
        addAlert({
          type: 'danger',
          title: 'Error ao buscar tarefas',
          message: error.response.data.message,
        });
      });
  };

  return (
    <CardContent fullWidth>
      <C.AddDiv>
        <Button
          color="primary"
          onClick={() => {
            alert('Adicionou uma nova tarefa');
          }}
          endIcon={<FiPlus />}
        >
          Adicionar
        </Button>
      </C.AddDiv>
      <TaskList
        tasks={tasks}
        deleteTask={deleteTask}
        editTask={editTask}
        toggleCompleted={toggleCompleted}
      />
    </CardContent>
  );
};

export default Tasks;
