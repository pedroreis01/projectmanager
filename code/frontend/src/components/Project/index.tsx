import React, { useState } from 'react';
import Text from '../Text';
import * as C from './style';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { ITask } from '../Task';

interface IProject {
  id: number;
  name: string;
  description: string;
  startDate: string;
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
  project: IProject;
  children: React.ReactNode;
}

const Project: React.FC<ProjectProps> = ({ project, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleProject = () => {
    setIsOpen(!isOpen);
  };

  return (
    <C.ProjectContainer>
      <C.ProjectHeader>
        <C.Title $isOpen={isOpen}>{project.name}</C.Title>
        <C.NumberOfDocs $isOpen={isOpen}>
          <C.NumberTasksDesktop>
            <Text fontSize="titleh3" color="light" fontWeight="semiBold">
              {project.tasks.length} {project.tasks.length == 1 ? 'Tarefa' : 'Tarefas'}
            </Text>
          </C.NumberTasksDesktop>
          <C.NumberTasksMobile>
            <Text fontSize="small" color="light" fontWeight="semiBold">
            {project.tasks.length} {project.tasks.length == 1 ? 'Tarefa' : 'Tarefas'}
            </Text>
          </C.NumberTasksMobile>
        </C.NumberOfDocs>
        <C.IsExpanded
          onClick={toggleProject}
          $isOpen={isOpen}
          endIcon={isOpen ? <FaChevronUp /> : <FaChevronDown />}
        >
          {isOpen ? 'Esconder' : 'Expandir'}
        </C.IsExpanded>
      </C.ProjectHeader>

      <C.ProjectContent $isOpen={isOpen}>{children}</C.ProjectContent>
    </C.ProjectContainer>
  );
};

export default Project;
