import { Fragment, useEffect, useState } from "react";
import NavBar from "../../features/nav/navbar";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import Librat from "../../features/librat/dashboard/Librat";
import Kategorite from "../../features/kategorite/dashboard/Kategorite";
import Autoret from "../../features/autoret/dashboard/Autoret";
import Login from "../../features/registration/Login";
import Registration from "../../features/registration/Register";
import LibriDetails from "../../features/libridetails/LibriDetails";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let u = localStorage.getItem("token");
    if (u) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    let u = localStorage.getItem("role");
    if (u === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn, navigate]);

  return (
    <Fragment>
      {isLoggedIn && <NavBar />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/home" element={<HomePage />} />
            <Route path="/details/:libriIsbn" element={<LibriDetails />} />
            {isAdmin ? (
              <>
                <Route path="/librat" element={<Librat />} />
                <Route path="/kategorite" element={<Kategorite />} />
                <Route path="/autoret" element={<Autoret />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/home" />} />
            )}
            <Route path="*" element={<HomePage />} />
          </>
        ) : (
          <>
            <Route path="/register" element={<Registration />} />
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Login />} />
          </>
        )}
      </Routes>
    </Fragment>
  );
};

export default App;
