import React, { useState } from 'react';
import Text from '../Text';
import * as C from './style';
import { FaChevronDown, FaChevronUp, FaRegCalendarAlt } from 'react-icons/fa';
import { ITask } from '../Task';
import TaskList from '../TaskList';
import { HiOutlineTrash, HiOutlineUsers } from 'react-icons/hi2';
import { GoTasklist } from 'react-icons/go';
import Button from '../Button';
import { FiEdit } from 'react-icons/fi';
import moment from 'moment';
import Modal from '../Modal';
import { FaCircleUser } from 'react-icons/fa6';
import { BsClipboardMinus, BsClipboardPlus } from 'react-icons/bs';

export interface IProject {
  id: number;
  name: string;
  description: string;
  startDate: string;
}

export interface IProjectUserTask extends IProject {
  users: IUser[];
  tasks: ITask[];
}

interface IUser {
  id: number;
  name: string;
  email: string;
  login: string;
}
interface ProjectProps {
  project: IProjectUserTask;
  deleteProject: (id: number) => void;
  editProject: (project: IProject) => void;
  linkProject: (id: number) => void;
  unlinkProject: (id: number) => void;
  linkedUser: boolean;
}

const Project: React.FC<ProjectProps> = ({
  project,
  deleteProject,
  editProject,
  linkProject,
  unlinkProject,
  linkedUser,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const toggleProject = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <C.ProjectContainer>
        <C.ProjectHeader>
          <C.Title>
            <Text fontSize="paragraph" fontWeight="semiBold">
              {`${project.id} - ${project.name}`}
            </Text>
            <C.ProjectDate>
              <FaRegCalendarAlt />{' '}
              {moment(project.startDate).format('DD/MM/YYYY')}
            </C.ProjectDate>
          </C.Title>
          <C.ProjectDetailsPreview>
            {project.users.length}
            <HiOutlineUsers size={20} />
          </C.ProjectDetailsPreview>
          <C.ProjectDetailsPreview>
            {project.tasks.length}
            <GoTasklist size={20} />
          </C.ProjectDetailsPreview>
          <C.IsExpanded $isOpen={isOpen}>
            <C.ProjectActions>
              {linkedUser ? (
                <Button
                  className="btn-unlink"
                  color="white"
                  onClick={() => unlinkProject(project.id)}
                  onlyIcon
                  isRound
                >
                  <BsClipboardMinus />
                </Button>
              ) : (
                <Button
                  className="btn-link"
                  color="white"
                  onClick={() => linkProject(project.id)}
                  onlyIcon
                  isRound
                >
                  <BsClipboardPlus />
                </Button>
              )}
              {linkedUser && (
                <>
                  <Button
                    className="btn-edit"
                    color="white"
                    onClick={() => editProject(project)}
                    onlyIcon
                    isRound
                  >
                    <FiEdit />
                  </Button>
                  <Button
                    className="btn-delete"
                    color="white"
                    onClick={() => deleteProject(project.id)}
                    onlyIcon
                    isRound
                  >
                    <HiOutlineTrash />
                  </Button>
                </>
              )}
              <Button color="white" onClick={toggleProject} onlyIcon isRound>
                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
              </Button>
            </C.ProjectActions>
          </C.IsExpanded>
        </C.ProjectHeader>

        <C.ProjectContent $isOpen={isOpen}>
          <C.ProjectDescription>
            <Text fontSize="paragraph">
              <b>Data de Início: </b>
              {`${moment(project.startDate).format('DD/MM/yyyy')}`}
            </Text>
          </C.ProjectDescription>
          <C.ProjectDescription>
            <Text fontSize="paragraph">
              <b>Descrição: </b>
              {`${project.description}`}
            </Text>
          </C.ProjectDescription>
          <C.ProjectDescription>
            <Button
              className="btn-users"
              color="white"
              startIcon={<HiOutlineUsers />}
              onClick={() => setOpenModal(true)}
            >
              Ver participantes
            </Button>
          </C.ProjectDescription>
          <TaskList projectId={project.id} justList={!linkedUser} />
        </C.ProjectContent>
      </C.ProjectContainer>
      <Modal
        isOpen={openModal}
        onClose={handleCloseModal}
        titleHeader="Participantes"
      >
        <C.ModalUserContent>
          {project.users.length > 0 && project.users.map((user) => (
            <C.UserContainer key={'user-' + user.id}>
              <C.UserIcon>
                <FaCircleUser size={45} />
              </C.UserIcon>
              <C.UserDescription>
                <Text fontSize="paragraph">{user.name}</Text>
                <Text fontSize="small">{user.login}</Text>
              </C.UserDescription>
            </C.UserContainer>
          ))}
          {project.users.length === 0 && <Text fontSize="paragraph">Sem participantes</Text>}
        </C.ModalUserContent>
      </Modal>
    </>
  );
};

export default Project;
