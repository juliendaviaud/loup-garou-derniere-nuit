import React, { useEffect, useState } from "react";
import { getDocs, collection, orderBy, query } from "firebase/firestore";
import { db } from "../../config/firebase";
import "./RoleList.css";
import village from "../../assets/images/village-menu-icon-outlined-activated.svg";
import enemies from "../../assets/images/enemies-menu-icon-outlined-activated.svg";
import solitary from "../../assets/images/solitary-role-menu-icon-outlined-activated.svg";
/* import villager from "../../assets/images/village/villageois.png"; */
/* import werewolf from "../../assets/images/village/werewolf.png"; */
import RoleDetails from "../RoleDetails/RoleDetails";

const RoleList = ({ roleListName }) => {
  const [roleList, setRoleList] = useState([]);
  const [showDetailsCard, setShowDetailsCard] = useState(false);
  const [collectionName, setCollectionName] = useState(
    "roles_list_" + roleListName
  );

  const roleCollectionRef = collection(db, collectionName);
  const [roleName, setRoleName] = useState("");
  const [roleImage, setRoleImage] = useState("");
  const [roleObjectives, setRoleObjectives] = useState("");
  const [rolePowers, setRolePowers] = useState("");
  const [roleDescription, setRoleDescription] = useState("");

  /* const [imageLoaded, setImageLoaded] = useState({});
    const handleLoadImage = (image) => {
        setImageLoaded(prev => {[...prev, {loaded: true}]});
    }
    const isLoading = useMemo(
        () => !(imageLoaded.every(loaded))
        , [imageLoaded]
    ) */

  useEffect(() => {
    /* console.log("useEffect roleListName " + roleListName);
    console.log("useEffect collectionName " + collectionName); */
    const getRoleList = async () => {
      // READ THE DATA
      // SET THE ROLE LIST
      try {
        const data = await getDocs(query(roleCollectionRef, orderBy("order")));
        /* console.log(data);
        console.log(collectionName); */
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setRoleList(filteredData);
        /* console.log(filteredData); */
      } catch (error) {
        console.error(error);
      }
    };

    getRoleList();
  }, [roleListName]);

  const loadPopup = (name, image, objectives, powers, description) => {
    setRoleName(name);
    setRoleImage(image);
    setRoleObjectives(objectives);
    setRolePowers(powers);
    setRoleDescription(description);
    setShowDetailsCard(true);
  };

  return (
    <div className="roleListContainerAndTitle">
      {showDetailsCard && (
        <RoleDetails
          roleName={roleName}
          roleImage={roleImage}
          roleObjectives={roleObjectives}
          rolePowers={rolePowers}
          roleDescription={roleDescription}
          onClose={() => setShowDetailsCard(false)}
        />
      )}
      <h2 className="pageTitle">Liste des rôles</h2>
      <div className="roleListNameAndIcon">
        <img
          className="roleListIcon"
          src={
            roleListName === "village"
              ? village
              : roleListName === "enemies"
              ? enemies
              : solitary
          }
          alt=""
        />
        <h3 className="roleListName">
          {roleListName.charAt(0).toUpperCase() + roleListName.slice(1)}
        </h3>
      </div>

      <div className="roleListContainer">
        {roleList.map((role) => (
          <div
            key={role.id}
            className="role"
            onClick={() =>
              loadPopup(
                role.name,
                window.location.origin +
                  "/images/" +
                  roleListName +
                  "/" +
                  role.image +
                  ".png",
                role.win_condition,
                role.powers,
                role.description
              )
            }
          >
            <img
              className="roleImg"
              src={
                window.location.origin +
                "/images/" +
                roleListName +
                "/" +
                role.image +
                ".png"
        }
              alt=""
            />
            <p className="roleName">{role.name}</p>
          </div>
        ))}

        {/* <div className="role">
          <img className="roleImg" src={villageois} alt="" />
          <p className="roleName">Villageois</p>
        </div>
        <div className="role">
          <img className="roleImg" src={villageois} alt="" />
          <p className="roleName">Villageois</p>
        </div>
        <div className="role">
          <img className="roleImg" src={villageois} alt="" />
          <p className="roleName">Villageois</p>
        </div>
        <div className="role">
          <img className="roleImg" src={villageois} alt="" />
          <p className="roleName">Villageois</p>
        </div>
        <div className="role">
          <img className="roleImg" src={villageois} alt="" />
          <p className="roleName">Villageois</p>
        </div>
        <div className="role">
          <img className="roleImg" src={villageois} alt="" />
          <p className="roleName">Villageois</p>
        </div>
        <div className="role">
          <img className="roleImg" src={villageois} alt="" />
          <p className="roleName">Villageois</p>
        </div> */}
      </div>
    </div>
  );
};

export default RoleList;
