import {Fragment } from "react";
import NavBar from "../../features/nav/navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import Librat from "../../features/librat/dashboard/Librat";
import Kategorite from "../../features/kategorite/dashboard/Kategorite";

const App = () => {
  return (
    <Fragment>
      <NavBar />
      <Routes>
        <Route path='/' Component={HomePage} />
        <Route path='/librat' Component={Librat} />
        <Route path='/kategorite' Component={Kategorite}></Route>
      </Routes>
    </Fragment>
  );
};

export default App;
