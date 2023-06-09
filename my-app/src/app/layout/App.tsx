import { Fragment, useEffect, useState } from "react";
import NavBar from "../../features/nav/navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import Librat from "../../features/librat/dashboard/Librat";
import Kategorite from "../../features/kategorite/dashboard/Kategorite";
import Autoret from "../../features/autoret/dashboard/Autoret";
import Login from "../../features/registration/Login";
import Registration from "../../features/registration/Register";


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
        {isLoggedIn && <NavBar />}
        <Routes>
          {isLoggedIn ? (
            <>
            <Route path="/home" element={<HomePage />} />
            <Route path="/librat" element={<Librat />} />
            <Route path="/kategorite" element={<Kategorite />} />
            <Route path="/autoret" element={<Autoret />} />
            </>
          ) : (
            <>
              <Route path="/register" element={<Registration />} />
              <Route path="/" element={<Login />} />
            </>
          )}
        </Routes>
      </Fragment>
  );
};

export default App;
