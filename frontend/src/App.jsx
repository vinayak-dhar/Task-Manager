import React, { useEffect } from "react";
import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Alltask from "./pages/Alltask";
import Importanttask from "./pages/Importanttask";
import Completedtask from "./pages/Completedtask";
import Incompletetask from "./pages/Incompletetask";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(()=> {
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      dispatch(authActions.login());
    }
    else if (isLoggedIn === false) {
      navigate("/signup");
    }
  }, []);
  return (
    <div className="bg-gray-900 text-white h-screen p-2 relative">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Alltask />} />
          <Route path="/importantTasks" element={<Importanttask />} />
          <Route path="/completeTasks" element={<Completedtask />} />
          <Route path="/incompleteTasks" element={<Incompletetask />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
