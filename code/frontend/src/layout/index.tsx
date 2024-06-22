import React from "react";
import * as C from "./style";



interface ILayout {
  children: React.ReactNode;
}

//rotas que não possuem layout
// const routesWithoutHeaderFooter = ["/", "/"];

export const Layout: React.FC<ILayout> = ({ children }) => {
//   const location = useLocation();

//   return routesWithoutHeaderFooter.includes(location.pathname) || location.pathname.startsWith(routesWithoutHeaderFooter[1]) ? (
//     <C.ContentWithoutLayout>{children}</C.ContentWithoutLayout>
//   ) : (
//     <>
//       <C.LayoutWrapper id="div-layout">{children}</C.LayoutWrapper>
//     </>
//   );

  return <C.ContentWithoutLayout id="div-layout">{children}</C.ContentWithoutLayout>;
};
