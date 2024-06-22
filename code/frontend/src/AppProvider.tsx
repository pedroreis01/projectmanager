import { FC, ReactNode } from 'react';

interface AppProviderProps {
  children?: ReactNode;
}

const AppProvider: FC<AppProviderProps> = ({ children }) => {
  return (
    <>{children}</>
  );
};

export default AppProvider;
