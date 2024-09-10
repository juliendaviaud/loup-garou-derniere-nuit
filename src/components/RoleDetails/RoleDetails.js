import React, { useRef } from "react";
import "./RoleDetails.css";
import cross from "../../assets/images/cross.svg";
import topImage from "../../assets/images/card-details-top-image.png";
import villageois from "../../assets/images/village/villageois.png";
import werewolf from "../../assets/images/village/werewolf.png";

const RoleDetails = ({
  roleName,
  roleImage,
  roleObjectives,
  rolePowers,
  roleDescription,
  onClose,
}) => {
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
            <div className="topCardImageContent"></div>
          </div>
          <img className="roleDetailsRoleImage" src={roleImage} alt="" />
          <h3 className="roleDetailsRoleName">{roleName}</h3>
          <div className="roleDetailsTextContainer">
            <h4>Objectif</h4>
            <p>{roleObjectives}</p>
            <h4>Pouvoirs</h4>
            <p>{rolePowers}</p>
            <h4>Description</h4>
            <p>{roleDescription}</p>
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
