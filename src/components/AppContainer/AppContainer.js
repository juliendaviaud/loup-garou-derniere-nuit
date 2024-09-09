import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./AppContainer.css";
import MainMenu from "../MainMenu/MainMenu";
import RoleList from "../RoleList/RoleList";
import StoryPage from "../StoryPage/StoryPage";

const AppContainer = () => {
  const [isLoadingScreenVisible, setIsLoadingScreenVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingScreenVisible(false);
    }, 3000);
  }, []);

  return (
    <div className="appContainer">
      { isLoadingScreenVisible && (<div className="loadingScreen"></div>)}
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={<RoleList roleListName="village" key="village" />}
          />
          <Route
            path="/enemies"
            element={<RoleList roleListName="enemies" key="enemies" />}
          />
          <Route
            path="/solitary"
            element={<RoleList roleListName="solitary" key="solitary" />}
          />
          <Route
            path="/story"
            element={<StoryPage />}
          />
          {/* <Route path="/story" element={<StoryPage />} /> */}
        {/* <Route path="/signup" element={<Signup />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="*" element={<ErrorPage />} /> */}
        </Routes>
        <MainMenu />
      </Router>
    </div>
  );
};

export default AppContainer;
