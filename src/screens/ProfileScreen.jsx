import React, { useState } from "react";
import "./ProfileScreen.css";
import Nav from "../components/Nav";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { getAuth, signOut } from "firebase/auth";
import PlansScreen from "./PlansScreen";

function ProfileScreen() {
  const user = useSelector(selectUser);
  const auth = getAuth();
  const [currentPlan, setCurrentPlan] = useState(null); // <-- new state

  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log("User signed out"))
      .catch((error) => console.log("Error signing out:", error));
  };

  return (
    <div className="profileScreen">
      <Nav />
      <div className="profileScreen__body">
        <h1>Edit Profile</h1>
        <div className="profileScreen__info">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt=""
          />
          <div className="profileScreen__details">
            <h2>{user.email}</h2>
            <div className="profileScreen__plans">
              {/* Display current plan next to Plans header */}
              <h3>
                Current Plan: {currentPlan && <span>{currentPlan}</span>}
              </h3>

              {/* Pass setter to child */}
              <PlansScreen onCurrentPlan={setCurrentPlan} />

              <button
                onClick={handleSignOut}
                className="profileScreen__signOut"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
