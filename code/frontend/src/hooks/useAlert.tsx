import React, { createContext, useCallback, useContext, useState } from 'react';
import { v4 } from 'uuid';

import AlertPopUp, { AlertConfigData, AlertType } from '../components/Alert';
import { ContentAlerts } from '../components/Alert/style';

interface AlertContextData {
  addAlert(message: Omit<AlertConfigData, 'id'>): void;
  removeAlert(id: string): void;
}

interface IAlert {
  children: React.ReactNode;
}

const AlertContext = createContext<AlertContextData>({} as AlertContextData);

const AlertProvider: React.FC<IAlert> = ({ children }) => {
  const [messages, setMessages] = useState<AlertConfigData[]>([]);

  const addAlert = useCallback((config: Omit<AlertConfigData, 'id'>) => {
    const alert: AlertConfigData = {
      ...config,
      id: v4()
    };

    setMessages((state) => [...state, alert]);
  }, []);

  const removeAlert = useCallback((id: string) => {
    setMessages((state) => state.filter((text) => text.id !== id));
  }, []);

  return (
    <AlertContext.Provider value={{ addAlert, removeAlert }}>
      {children}
      <ContentAlerts>
        {messages.map((message) => (
          <AlertPopUp key={`alert-${message.id}`} {...message} />
        ))}
      </ContentAlerts>
    </AlertContext.Provider>
  );
};

function useAlert(): AlertContextData {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error('useAlert must be used within a AlertProvider');
  }

  return context;
}

export type { AlertType };
export { AlertProvider };
export default useAlert;
