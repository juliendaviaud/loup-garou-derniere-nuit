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
import silhouetteExtended from "../../assets/images/main-menu-background-extended-small-height.png";

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
          <Link to="/ennemies">
            <div className="menuItem">
              <img src={splitLocation[1] === "ennemies" ? enemiesActivated : enemies} alt="" />
              <p className={"menuLink" + (splitLocation[1] === "ennemies" ? " menuLinkActivated" : "")}>Ennemies</p>
            </div>
          </Link>
          <Link to="/solitaires">
            <div className="menuItem">
              <img src={splitLocation[1] === "solitaires" ? solitaryActivated : solitary} alt="" />
              <Link className={"menuLink" + (splitLocation[1] === "solitaires" ? " menuLinkActivated" : "")}>Solitaires</Link>
            </div>
          </Link>
          <Link to="/histoire">
            <div className="menuItem">
              <img src={splitLocation[1] === "histoire" ? loreActivated : lore} alt="" />
              <p className={"menuLink" + (splitLocation[1] === "histoire" ? " menuLinkActivated" : "")}>Histoire</p>
            </div>
          </Link>
        </div>
      </div>
      <img className="mainMenuBackground" src={silhouetteExtended} alt="" />
    </div>
  );
};

export default MainMenu;
