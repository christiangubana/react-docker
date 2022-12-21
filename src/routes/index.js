import React from "react";
import { useRoutes } from "react-router-dom";
import { lazy } from "react";

const NavBar = lazy(() => import("../components/Layout/NavBar"));
const RaceResult = lazy(() => import('../components/RaceResult'));
const Races = lazy(() => import("../components/Races"));

const AppRoutes = () => {
  const routes = [
    { path: "/", element: <Races /> },
    { path: 'results/:season/:round', element: <RaceResult /> },
  ];

  const element = useRoutes([...routes]);

  return (
    <>
      <NavBar />
      {!element ? <h1 style={{textAlign: 'center'}}>Loading...</h1> : 
      <div className="pages-content">{element}</div>
      }
    </>
  );
};

export default AppRoutes;
