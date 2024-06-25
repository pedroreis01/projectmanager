import { IconType } from 'react-icons';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';

interface IRouteLinks {
  name: string;
  path: string;
  icon: IconType;
}

export const routesLinks: IRouteLinks[] = [
  {
    name: 'Meus Projetos',
    path: '/meus-projetos',
    icon: HiOutlineClipboardDocumentList,
  },
  {
    name: 'Projetos',
    path: '/projetos',
    icon: HiOutlineClipboardDocumentList,
  },
  {
    name: 'Tarefas',
    path: '/tarefas',
    icon: HiOutlineClipboardDocumentList,
  },
];
