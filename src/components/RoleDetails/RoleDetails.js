import React, { useRef } from "react";
import "./RoleDetails.css";
import cross from "../../assets/images/cross.svg";
import parse from "html-react-parser";
import topImage from "../../assets/images/card-details-top-image.png";
import villageois from "../../assets/images/village/villageois.png";
import werewolf from "../../assets/images/village/werewolf.png";

const RoleDetails = ({
  roleName,
  roleImage,
  roleObjectives,
  rolePower1,
  rolePower2,
  rolePower3,
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
          <div className="roleDetailsRoleImageContainer">
            <img className="roleDetailsRoleImage" src={roleImage} alt="" />
          </div>
          <h3 className="roleDetailsRoleName">{roleName}</h3>
          <div className="roleDetailsTextContainer">
          <h4>Objectif</h4>
                <p>{parse(roleObjectives)}</p>
                <h4>Pouvoirs</h4>
                <ul>
                  {(rolePower1 != "") && <li>
                    {parse(rolePower1)}
                  </li>}
                  {(rolePower2 != "") && <li>
                    {parse(rolePower2)}
                  </li>}
                  {(rolePower3 != "") && <li>
                    {parse(rolePower3)}
                  </li>}
                </ul>
                <h4>Description</h4>
                <p>
                  {parse(roleDescription)}
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
