import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/layout/Header";
import SignUp from "./components/layout/inputs/SignUp";
import LogIn from "./components/layout/inputs/LogIn";
import Home from "./components/layout/Home";
import Mails from "./components/layout/Mails";
import Sent from "./components/layout/mails/Sent";
import Draft from "./components/layout/mails/Draft";
import { authActions } from "./store/auth-slice";

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");

    if (email && token) {
      dispatch(authActions.login({ email, token }));
    }
  }, []);

  return (
    <React.Fragment>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <SignUp />} />
          <Route path="/login" element={!isLoggedIn ? <LogIn /> : <Navigate to="/home" />} />
          <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/" />} />
          <Route path="/mails/inbox" element={isLoggedIn ? <Mails /> : <Navigate to="/" />} />
          <Route path="/mails/sent" element={!isLoggedIn ? <Navigate to="/" /> : <Sent/> } />
          <Route path="/mails/drafts" element={!isLoggedIn ? <Navigate to="/" /> : <Draft/>} />
          <Route path="*" element={<Navigate to="/" />} />      
        </Routes>
     
      </main>
    </React.Fragment>
  );
};

export default App;





