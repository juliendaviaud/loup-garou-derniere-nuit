import React, { useRef } from "react";
import "./RoleDetails.css";
import cross from "../../assets/images/cross.svg";
import topImage from "../../assets/images/card-details-top-image.png";
import villageois from "../../assets/images/village/villageois.png";
import werewolf from "../../assets/images/village/werewolf.png";

const RoleDetails = ({ roleName, roleImage, roleObjectives, rolePowers, roleDescription, onClose }) => {
  const detailsCardRef = useRef();

  const closeDetailedCard = (e) => {
    if (detailsCardRef.current === e.target) {
      onClose();
    }
  };

  return (
    <div
      className="roleDetails"
      ref={detailsCardRef}
      onClick={(e) => closeDetailedCard(e)}
    >
      <div className="roleDetailsCard">
        <div className="roleDetailsCardContent">
          <div className="topCardImageContainer">
            {/* <img className="topCardImage" src={topImage} alt="" /> */}
          </div>
          <img className="roleDetailsRoleImage" src={roleImage} alt="" />
          <h3 className="roleDetailsRoleName">{roleName}</h3>
          <div className="roleDetailsTextContainer">
            <h4>Objectif</h4>
            <p>
              {roleObjectives}
            </p>
            <h4>Pouvoirs</h4>
            <p>
              {rolePowers}
            </p>
            <h4>Description</h4>
            <p>
              Les loups-garous se réveillent ensemble la nuit lorsque le maitre
              du jeu les appelle à se réveiller. Ils votent ensuite ensemble
              afin de désigner la victime qu’ils souhaitent dévorer cette nuit.
              Important, les loups-garous doivent être silencieux lorsqu’ils
              agissent et votent pour ne pas être repéré par ceux qui dorment.
            </p>
            <p className="roleDetailsText"></p>
          </div>
        </div>
        <div className="roleDetailsCardFooter">
          <img
            className="closeCross"
            onClick={() => onClose()}
            src={cross}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default RoleDetails;
