import { IconType } from 'react-icons';
import { GrTask } from 'react-icons/gr';
import {
  HiOutlineClipboardDocumentCheck,
  HiOutlineClipboardDocumentList,
} from 'react-icons/hi2';

interface IRouteLinks {
  name: string;
  path: string;
  icon: IconType;
}

export const routesLinks: IRouteLinks[] = [
  {
    name: 'Meus Projetos',
    path: '/meus-projetos',
    icon: HiOutlineClipboardDocumentCheck,
  },
  {
    name: 'Minhas Tarefas',
    path: '/minhas-tarefas',
    icon: GrTask,
  },
  {
    name: 'Novos Projetos',
    path: '/novos-projetos',
    icon: HiOutlineClipboardDocumentList,
  },
];
