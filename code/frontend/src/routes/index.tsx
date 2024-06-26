import React, { useCallback } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Identification from '../pages/Identification';
import { useAuth } from '../hooks/useAuth';
import MyProjects from '../pages/MyProjects';
import MyTasks from '../pages/MyTasks';
import NewProjects from '../pages/NewProjects';

const Navigation: React.FC = () => {
  const {user} = useAuth();

  const PrivateRoutes = useCallback(() => {
    if (user && user.accessToken.length > 0) {
      return <Outlet />
    }else {
      return <Navigate to="/" />
    }
  }, [user])


  return (
    <Routes>
        {/* Rotas privadas internas */}
      <Route element={<PrivateRoutes />}>
        <Route path="/meus-projetos" element={<MyProjects />} />
        <Route path="/novos-projetos" element={<NewProjects />} />
        <Route path="/minhas-tarefas" element={<MyTasks />} />
      </Route>

      <Route path="/" element={<Identification />} />
    </Routes>
  );
};

export default Navigation;
