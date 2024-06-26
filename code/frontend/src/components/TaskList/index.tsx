import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';
import Task, { ITask } from '../../components/Task';
import useAlert from '../../hooks/useAlert';
import Button from '../../components/Button';
import * as C from './style';
import { FiPlus } from 'react-icons/fi';
import Modal, { ModalFooter } from '../../components/Modal';
import Input from '../../components/Input';
import TextBox from '../../components/TextBox';
import Select, { SelectOption } from '../../components/Select';
import moment from 'moment';
import { ClipLoader } from 'react-spinners';

interface IProjects {
  id: number;
  name: string;
  description: string;
  startDate: string;
}

interface TaskListProps {
  projectId?: number;
  justList?: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ projectId, justList }) => {
  const { user } = useAuth();
  const { addAlert } = useAlert();
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [projects, setProjects] = useState<IProjects[]>([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [filteredProject, setFilteredProject] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [taskFields, setTaskFields] = useState({
    id: 0,
    name: '',
    description: '',
    dueDate: '',
    projectId: 0,
  });
  const [isEditTask, setIsEditTask] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getTasks = useCallback(() => {
    setIsLoading(true);
    setTasks([])
    let url = 'task/user-project/filter';
    if (projectId) {
      url = `${url}?projectId=${projectId}`;
    } else {
      url = `${url}?userId=${user.id}`;
      if (filteredProject && filteredProject.length > 0) {
        url = `${url}&projectId=${filteredProject}`;
      }
    }

    api
      .get(url)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        addAlert({
          type: 'danger',
          title: 'Error ao buscar tarefas',
          message: error.response.data.message,
        });
      })
      .finally(() => setIsLoading(false));
  }, [user, projectId, filteredProject]);

  const getProjectsUser = useCallback(() => {
    api
      .get(`project/linked-user/${user.id}`)
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        addAlert({
          type: 'danger',
          title: 'Error ao buscar projetos',
          message: error.response.data.message,
        });
      });
  }, [user]);

  useEffect(() => {
    getTasks();
    getProjectsUser();
  }, [getTasks, getProjectsUser]);

  const deleteTask = useCallback(
    (id: number) => {
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
    },
    [getTasks, addAlert]
  );

  const createTask = useCallback(() => {
    api
      .post('task', {
        name: taskFields.name,
        dueDate: taskFields.dueDate,
        description: taskFields.description,
        projectId: Number(selectedProject),
      })
      .then(() => {
        addAlert({
          type: 'success',
          title: 'Sucesso',
          message: 'Tarefa adicionada com sucesso',
        });
        getTasks();
        handleCloseModal();
      })
      .catch((error) => {
        addAlert({
          type: 'danger',
          title: 'Erro ao adicionar tarefa',
          message: error.response.data.message,
        });
      });
  }, [taskFields, selectedProject, getTasks, addAlert]);

  const editTask = useCallback(() => {
    api
      .patch(`task/${taskFields.id}`, {
        name: taskFields.name,
        dueDate: taskFields.dueDate,
        description: taskFields.description,
        projectId: Number(selectedProject),
      })
      .then(() => {
        addAlert({
          type: 'success',
          title: 'Sucesso',
          message: 'Tarefa editada com sucesso',
        });
        getTasks();
        handleCloseModal();
      })
      .catch((error) => {
        addAlert({
          type: 'danger',
          title: 'Erro ao adicionar tarefa',
          message: error.response.data.message,
        });
      });
  }, [taskFields, selectedProject, getTasks, addAlert]);

  const toggleCompleted = useCallback(
    (id: number, done: boolean) => {
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
    },
    [getTasks, addAlert]
  );

  const handleOpenModal = (isEdit?: boolean, task?: ITask) => {
    if (isEdit && task) {
      setIsEditTask(true);
      setTaskFields({ ...taskFields, ...task });
      setSelectedProject(String(task.projectId));
      setOpenModal(true);
    } else {
      setOpenModal(true);
      if(projectId){
        setSelectedProject(String(projectId));
      }
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setIsEditTask(false);
    setSelectedProject('');
    setTaskFields({
      id: 0,
      name: '',
      description: '',
      dueDate: '',
      projectId: 0,
    });
  };

  const handleChangeProject = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProject(event.target.value);
  };

  const handleChangeFilteredProject = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilteredProject(event.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEditTask) {
      editTask();
    } else {
      createTask();
    }
  };
  return (
    <C.TaskListWrapper>
      {!justList && (
        <C.DivHeader>
          <Button
            color="primary"
            onClick={() => handleOpenModal()}
            startIcon={<FiPlus />}
          >
            Nova Tarefa
          </Button>
          {!projectId && (
            <C.FilterDiv>
              <Select
                id="project"
                value={filteredProject}
                label="Filtrar por projeto"
                onChange={handleChangeFilteredProject}
              >
                <SelectOption value="">Todos</SelectOption>
                {projects.map((project) => (
                  <SelectOption key={project.id} value={String(project.id)}>
                    {project.name}
                  </SelectOption>
                ))}
              </Select>
            </C.FilterDiv>
          )}
        </C.DivHeader>
      )}
      {isLoading ? (
        <ClipLoader />
      ) : tasks.length === 0 ? (
        <C.NoTasksText>Nenhuma tarefa no momento</C.NoTasksText>
      ) : (
        tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            editTask={(task: ITask) => handleOpenModal(true, task)}
            toggleCompleted={toggleCompleted}
            justList={justList}
          />
        ))
      )}
      <Modal
        isOpen={openModal}
        onClose={handleCloseModal}
        titleHeader={
          isEditTask ? `Editar Tarefa - ${taskFields.id}` : 'Adicionar Tarefa'
        }
      >
        <C.Form onSubmit={handleSubmit}>
          <C.FormGroup>
            <Input
              id="name"
              label="Nome"
              placeholder="Nome da tarefa"
              required
              value={taskFields.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTaskFields((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </C.FormGroup>
          <C.FormGroup>
            <Input
              id="dueDate"
              label="Data de Entrega"
              type="date"
              name="dueDate"
              placeholder="Data de Entrega"
              required
              value={moment(taskFields.dueDate).utc().format('YYYY-MM-DD')}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTaskFields((prev) => ({ ...prev, dueDate: e.target.value }))
              }
            />
            <Select
              id="projectName"
              label="Projeto"
              value={selectedProject}
              onChange={handleChangeProject}
              required
              disabled={!!projectId}
            >
              <SelectOption
                key="project-option-defult"
                value=""
                disabled
                hidden
              >
                Selecione o Projeto
              </SelectOption>
              {projects.map((project) => (
                <SelectOption
                  key={'project-option' + project.id}
                  value={String(project.id)}
                >
                  {project.name}
                </SelectOption>
              ))}
            </Select>
          </C.FormGroup>
          <C.FormGroup>
            <TextBox
              id="description"
              label="Descrição"
              placeholder="Descrição da tarefa"
              required
              value={taskFields.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setTaskFields((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </C.FormGroup>
          <ModalFooter>
            <Button color="cancel" type="button" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button type="submit">{isEditTask ? 'Editar' : 'Adicionar'}</Button>
          </ModalFooter>
        </C.Form>
      </Modal>
    </C.TaskListWrapper>
  );
};

export default TaskList;
