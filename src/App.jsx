import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "./firebase";
import "./App.css";
import Nav from "./components/Nav";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import ProfileScreen from "./screens/ProfileScreen";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubsribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // Logged In 
      
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email,
        })
      );
      }else{
        // Logged Out
        dispatch(logout());
      
      }
    });

    return unsubsribe;
  }, [dispatch]);

  return (
    <div className="app">

      <Router>
        {!user ? (
          <LoginScreen />          
        ) : (        
        <Routes>
          <Route path="/profile" element={<ProfileScreen />} />
          <Route exact path="/" element={<HomeScreen />} />
        </Routes>        
        )}
        </Router>
    </div>
  );
}

export default App;
