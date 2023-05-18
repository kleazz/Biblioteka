import {Fragment } from "react";
import NavBar from "../../features/nav/navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import Librat from "../../features/librat/dashboard/Librat";
import Kategorite from "../../features/kategorite/dashboard/Kategorite";
import Autoret from "../../features/autoret/dashboard/Autoret";

const App = () => {
  return (
    <Fragment>
      <NavBar />
      <Routes>
        <Route path='/' Component={HomePage} />
        <Route path='/librat' Component={Librat} />
        <Route path='/kategorite' Component={Kategorite}></Route>
        <Route path='/autoret' Component={Autoret}></Route>
      </Routes>
    </Fragment>
  );
};

export default App;
