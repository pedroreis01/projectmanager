import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';
import Project, { IProject, IProjectUserTask } from '../../components/Project';
import useAlert from '../../hooks/useAlert';
import Button from '../../components/Button';
import * as C from './style';
import { FiPlus } from 'react-icons/fi';
import Modal, { ModalFooter } from '../../components/Modal';
import Input from '../../components/Input';
import TextBox from '../../components/TextBox';
import moment from 'moment';
import { ClipLoader } from 'react-spinners';

interface ProjectListProps {
  linkedUser: boolean;
}

const ProjectList: React.FC<ProjectListProps> = ({ linkedUser }) => {
  const { user } = useAuth();
  const { addAlert } = useAlert();
  const [projects, setProjects] = useState<IProjectUserTask[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [projectFields, setProjectFields] = useState({
    id: 0,
    name: '',
    description: '',
    startDate: '',
  });
  const [isEditProject, setIsEditProject] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getProjectsLinkedUser = useCallback(async () => {
    await api
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
  }, [user, addAlert]);

  const getProjectsUnlinkedUser = useCallback(async () => {
    await api
      .get(`project/unlinked-user/${user.id}`)
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
  }, [user, addAlert]);

  const getProjects = useCallback(async () => {
    setIsLoading(true);
    if (linkedUser) {
      await getProjectsLinkedUser();
    } else {
      await getProjectsUnlinkedUser();
    }
    setIsLoading(false);
  }, [getProjectsLinkedUser, getProjectsUnlinkedUser, linkedUser]);

  useEffect(() => {
    getProjects();
  }, [getProjects]);

  const deleteProject = useCallback(
    (id: number) => {
      api
        .delete(`project/${id}`)
        .then(() => {
          addAlert({
            type: 'success',
            title: 'Sucesso',
            message: 'Projeto excluído com sucesso.',
          });
          getProjects();
        })
        .catch((error) => {
          addAlert({
            type: 'danger',
            title: 'Error ao excluir projeto',
            message: error.response.data.message,
          });
        });
    },
    [getProjects, addAlert]
  );

  const createProjectWithoutUser = useCallback(() => {
    api
      .post('project', {
        name: projectFields.name,
        startDate: projectFields.startDate,
        description: projectFields.description,
      })
      .then(() => {
        addAlert({
          type: 'success',
          title: 'Sucesso',
          message: 'Projeto adicionado com sucesso.',
        });
        getProjects();
        handleCloseModal();
      })
      .catch((error) => {
        addAlert({
          type: 'danger',
          title: 'Erro ao adicionar projeto',
          message: error.response.data.message,
        });
      });
  }, [projectFields, getProjects, addAlert]);

  const createProjectWithUser = useCallback(() => {
    api
      .post(`project/user/${user.id}`, {
        name: projectFields.name,
        startDate: projectFields.startDate,
        description: projectFields.description,
      })
      .then(() => {
        addAlert({
          type: 'success',
          title: 'Sucesso',
          message: 'Projeto adicionado para seu usuário com sucesso',
        });
        getProjects();
        handleCloseModal();
      })
      .catch((error) => {
        addAlert({
          type: 'danger',
          title: 'Erro ao adicionar projeto',
          message: error.response.data.message,
        });
      });
  }, [projectFields, getProjects, addAlert]);

  const createProject = useCallback(() => {
    if(linkedUser) {
      createProjectWithUser();
    } else {
      createProjectWithoutUser();
    }
  }, [linkedUser, createProjectWithUser, createProjectWithoutUser]);

  const editProject = useCallback(() => {
    api
      .patch(`project/${projectFields.id}`, {
        name: projectFields.name,
        startDate: projectFields.startDate,
        description: projectFields.description,
      })
      .then(() => {
        addAlert({
          type: 'success',
          title: 'Sucesso',
          message: 'Projeto editada com sucesso',
        });
        getProjects();
        handleCloseModal();
      })
      .catch((error) => {
        addAlert({
          type: 'danger',
          title: 'Erro ao adicionar projeto',
          message: error.response.data.message,
        });
      });
  }, [projectFields, getProjects, addAlert]);

  const linkProjectUser = useCallback((id: number) => {
    api
      .post(`project/${id}/link-users`, {
        userIds: [user.id],
      })
      .then(() => {
        addAlert({
          type: 'success',
          title: 'Sucesso',
          message: 'Projeto vinculado ao seu usuário. Acesse Meus Projetos para ver',
        });
        getProjects();
        handleCloseModal();
      })
      .catch((error) => {
        addAlert({
          type: 'danger',
          title: 'Erro ao vincular projeto',
          message: error.response.data.message,
        });
      });
  }, [projectFields, getProjects, addAlert]);

  const unlinkProjectUser = useCallback((id: number) => {
    api
      .post(`project/${id}/unlink-users`, {
        userIds: [user.id],
      })
      .then(() => {
        addAlert({
          type: 'info',
          title: 'Atenção',
          message: 'Projeto desvinculado do seu usuário. Acesse Novos Projetos para ver',
        });
        getProjects();
        handleCloseModal();
      })
      .catch((error) => {
        addAlert({
          type: 'danger',
          title: 'Erro ao desvincular projeto',
          message: error.response.data.message,
        });
      });
  }, [projectFields, getProjects, addAlert]);

  const handleOpenModal = (isEdit?: boolean, project?: IProject) => {
    if (isEdit && project) {
      setIsEditProject(true);
      setProjectFields({ ...projectFields, ...project });
      setOpenModal(true);
    } else {
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setIsEditProject(false);
    setProjectFields({
      id: 0,
      name: '',
      startDate: '',
      description: '',
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEditProject) {
      editProject();
    } else {
      createProject();
    }
  };
  return (
    <C.ProjectListWrapper>
      <C.DivHeader>
        <Button
          color="primary"
          onClick={() => handleOpenModal()}
          startIcon={<FiPlus />}
        >
          Novo Projeto
        </Button>
      </C.DivHeader>
      {isLoading ? (
        <ClipLoader />
      ) : projects.length === 0 ? (
        <C.NoProjectsText>Nenhum projeto no momento</C.NoProjectsText>
      ) : (
        projects.map((project) => (
          <Project
            key={project.id}
            project={project}
            deleteProject={deleteProject}
            editProject={(project: IProject) => handleOpenModal(true, project)}
            linkProject={linkProjectUser}
            unlinkProject={unlinkProjectUser}
            linkedUser={linkedUser}
          />
        ))
      )}
      <Modal
        isOpen={openModal}
        onClose={handleCloseModal}
        titleHeader={
          isEditProject
            ? `Editar Projeto - ${projectFields.id}`
            : 'Adicionar Projeto'
        }
      >
        <C.Form onSubmit={handleSubmit}>
          <C.FormGroup>
            <Input
              id="name"
              label="Nome"
              placeholder="Nome do projeto"
              required
              value={projectFields.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setProjectFields(prev => ({ ...prev, name: e.target.value }))
              }
            />
            <Input
              id="startDate"
              label="Data de Início"
              type="date"
              name="dueDate"
              required
              value={moment(projectFields.startDate).utc().format('YYYY-MM-DD')}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setProjectFields(prev => ({ ...prev, startDate: e.target.value }))
              }
            />
          </C.FormGroup>
          <C.FormGroup>
          </C.FormGroup>
          <C.FormGroup>
            <TextBox
              id="description"
              label="Descrição"
              placeholder="Descrição do projeto"
              required
              value={projectFields.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setProjectFields(prev =>({
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
            <Button type="submit">
              {isEditProject ? 'Editar' : 'Adicionar'}
            </Button>
          </ModalFooter>
        </C.Form>
      </Modal>
    </C.ProjectListWrapper>
  );
};

export default ProjectList;
