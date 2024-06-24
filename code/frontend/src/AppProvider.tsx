import { FC, ReactNode } from 'react';
import { AlertProvider } from './hooks/useAlert';
import { AuthProvider } from './hooks/useAuth';

interface AppProviderProps {
  children?: ReactNode;
}

const AppProvider: FC<AppProviderProps> = ({ children }) => {
  return (
    <AlertProvider>
      <AuthProvider>{children}</AuthProvider>
    </AlertProvider>
  );
};

export default AppProvider;
