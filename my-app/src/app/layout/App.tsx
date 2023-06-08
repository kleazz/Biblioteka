import { Fragment, useEffect, useState } from "react";
import NavBar from "../../features/nav/navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import Librat from "../../features/librat/dashboard/Librat";
import Kategorite from "../../features/kategorite/dashboard/Kategorite";
import Autoret from "../../features/autoret/dashboard/Autoret";
import Login from "../../features/registration/Login";
import { ILogin } from "./models/login";
import Registration from "../../features/registration/Register";
import { IRegistration } from "./models/registration";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    let u = localStorage.getItem("token");
    if (u) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  console.log(isLoggedIn);

  return (
      <Fragment>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {isLoggedIn ? (
            <>
      
              
              <Route path="/autoret" element={<Autoret />} />
            </>
          ) : (
            <>
            <Route path="/librat" element={<Librat />} />
            <Route path="/kategorite" element={<Kategorite />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />
            </>
          )}
        </Routes>
      </Fragment>
  );
};

export default App;
