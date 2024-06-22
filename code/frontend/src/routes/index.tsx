import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Identification from '../pages/Identification';

const Navigation: React.FC = () => {

//   const PrivateRoutes = useCallback(() => {
//     if (user.logado && getStatusLoan() !== "PROPOSTA SOLICITADA") {
//       return <Outlet />
//     }
//     else if (user.logado && getStatusLoan() === "PROPOSTA SOLICITADA") {
//       return <Navigate to="/proposta" />
//     }
//     else {
//       return <Navigate to="/" />
//     }
//   }, [user, getStatusLoan])


  return (
    <Routes>
        {/* Rotas privadas internas*/}
      {/* <Route element={<PrivateRoutes />}>
        <Route path="/perfil" element={<Profile />} />
        <Route path="/meus-emprestimos" element={<MyLoans />} />
      </Route> */}

      <Route path="/" element={<Identification />} />
    </Routes>
  );
};

export default Navigation;
