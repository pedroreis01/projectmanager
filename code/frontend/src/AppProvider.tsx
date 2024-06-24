import { FC, ReactNode } from 'react';
import { AlertProvider } from './hooks/useAlert';

interface AppProviderProps {
  children?: ReactNode;
}

const AppProvider: FC<AppProviderProps> = ({ children }) => {
  return (
    <AlertProvider>{children}</AlertProvider>
  );
};

export default AppProvider;
