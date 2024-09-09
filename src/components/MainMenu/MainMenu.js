import React from "react";
import "./MainMenu.css";
import village from "../../assets/images/village-menu-icon-outlined.svg";
import villageActivated from "../../assets/images/village-menu-icon-outlined-activated.svg";
import enemies from "../../assets/images/enemies-menu-icon-outlined.svg";
import enemiesActivated from "../../assets/images/enemies-menu-icon-outlined-activated.svg";
import solitary from "../../assets/images/solitary-role-menu-icon-outlined.svg";
import solitaryActivated from "../../assets/images/solitary-role-menu-icon-outlined-activated.svg";
import lore from "../../assets/images/lore-menu-icon-outlined.svg";
import loreActivated from "../../assets/images/lore-menu-icon-outlined-activated.svg";
import silhouette from "../../assets/images/main-menu-background.png";
import { Link, useLocation } from "react-router-dom";

const MainMenu = () => {

  const location = useLocation();

  const { pathname } = location;

  const splitLocation = pathname.split("/");

  return (
    <div className="mainMenuContainer">
      <div className="menuItemsContainer">
        <div className="menuItems">
          <Link to="/">
            <div className="menuItem">
              <img src={splitLocation[1] === "" ? villageActivated : village} alt="" />
              <p className={"menuLink" + (splitLocation[1] === "" ? " menuLinkActivated" : "")}>Village</p>
            </div>
          </Link>
          <Link to="/enemies">
            <div className="menuItem">
              <img src={splitLocation[1] === "enemies" ? enemiesActivated : enemies} alt="" />
              <p className={"menuLink" + (splitLocation[1] === "enemies" ? " menuLinkActivated" : "")}>Ennemies</p>
            </div>
          </Link>
          <Link to="/solitary">
            <div className="menuItem">
              <img src={splitLocation[1] === "solitary" ? solitaryActivated : solitary} alt="" />
              <Link className={"menuLink" + (splitLocation[1] === "solitary" ? " menuLinkActivated" : "")}>Solitaires</Link>
            </div>
          </Link>
          <Link to="/story">
            <div className="menuItem">
              <img src={splitLocation[1] === "story" ? loreActivated : lore} alt="" />
              <p className={"menuLink" + (splitLocation[1] === "story" ? " menuLinkActivated" : "")}>Histoire</p>
            </div>
          </Link>
        </div>
      </div>
      <img className="mainMenuBackground" src={silhouette} alt="" />
    </div>
  );
};

export default MainMenu;
