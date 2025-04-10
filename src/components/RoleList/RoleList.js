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
  const villageRoleList = [
    {
      id: 0,
      order: 0,
      name: "Sorcière",
      image: "/images/village/sorciere.png",
      objectives: "Faire gagner le village",
      power1:
        "1 potion de vie: <br /> permet une personne ayant été tuée cette nuit (obtenable après la cueillette sylvestre)",
      power2:
        "1 potion de mort: <br /> permet de tuer une personne cette nuit (obtenable après la cueillette sylvestre)",
      power3:
        "La cueillette sylvestre: <br /> la sorcière désigne 2 personnes qui vont venir l'aider à réunir les plantes nécessaires pour réaliser une potion. Ces 2 personnes et la sorcière, seront immunisés au pouvoir et des attaques de tout les rôles la nuit où elles partent faire la cueillette. Les 2 personnes sélectionnées et la sorcière ouvrent les yeux pour savoir avec qui elles partent réaliser la cueillette. Une fois la cueillette réalisée, la sorcière peut décider de confectionner soit une potion de vie, soit une potion de mort.",
      description:
        "La sorcière débute la partie sans potion. Elle a besoin de réaliser une cueillette sylvestre afin de confectionner soit une potion de vie, soit une potion de mort. Elle peut utiliser une seule potion de son choix par nuit.",
    },
    {
      id: 1,
      order: 1,
      name: "Voyante",
      image: "/images/village/voyante.png",
      objectives: "Faire gagner le village",
      power1:
        "Divination: <br />Une fois par nuit, si la voyante arrive à prédire quelle est la personne qui va mourir durant cette nuit, elle connaitra tous les participants du meurtre.",
      power2: "",
      power3: "",
      description:
        "Prédisant l'avenir, La voyante est un des personnages les plus puissants dans le camp du village. Elle pourra plus facilement identifier quelles sont les personnes qui ont agis sur une autre.",
    },
    {
      id: 2,
      order: 2,
      name: "Ancien",
      image: "/images/village/ancien.png",
      objectives: "Faire gagner le village",
      power1: "Il peut survivre à 2 attaques de n'importe quelle origine.",
      power2:
        "Designe une personne pour savoir si elle ment à la prochaine phase de jour. Elle aura cette information la nuit d'après.",
      power3:
        "Une fois par nuit, il peut désigner une personne, qui mourra en cas d'égalité.",
      description:
        "L’ancien peut survivre à 2 attaques durant la nuit. Par exemple, s'il devait être tué par les loups garous, il en perd une sans en être averti. Le matin, il se réveille avec les autres, mais dévoile sa carte (la seconde fois qu’il est attaqué par les loups garous alors il meurt normalement). Si l’ancien est chassé du village par le vote ou le pouvoir des villageois, il meurt directement et tous les rôles des villageois perdent leurs pouvoirs.",
    },
    {
      id: 3,
      order: 3,
      name: "Salvateur",
      image: "/images/village/salvateur.png",
      objectives: "Faire gagner le village",
      power1:
        "Chaque nuit, il peut sauver une personne qui ne mourra d'absolument aucune attaque (sauf exceptions: pyromane). Il ne peut pas viser deux fois d'affilé la même personne.",
      power2: "",
      power3: "",
      description:
        "Le salvateur est un rôle très important pour le village donc protégez dès que vous en avez l'occasion. N'oubliez pas que vous ne pouvez donner votre protection deux fois de suite au même joueur.",
    },
    {
      id: 4,
      order: 4,
      name: "Ange",
      image: "/images/village/ange.png",
      objectives: "Faire gagner le village",
      power1:
        "Une fois par nuit, il peut désigner une personne qui ne mourra pas en cas de vote majoritaire. Il ne peut pas viser deux fois d'affilé la même personne.",
      power2: "",
      power3: "",
      description:
        "L'ange est un rôle très important pour le village donc protégez dès que vous en avez l'occasion. N'oubliez pas que vous ne pouvez donner votre protection deux fois de suite au même joueur.",
    },
    {
      id: 5,
      order: 5,
      name: "Chasseur",
      image: "/images/village/chasseur.png",
      objectives: "Faire gagner le village",
      power1:
        "Le chasseur possède 2 balles. Chaque nuit, le chasseur se réveille et s'il possède 1 balle, il peut décider d'éliminer quelqu'un.Le village est séparé en 3 ou 4 groupes. Lorsque le chasseur tire sur une personne, cela alerte ainsi n'importe quel loups-garous présent dans le groupe de la personne sur laquelle il a tiré. Après le tour des loups-garous, si le chasseur n'a pas été tué, le MJ lui indique la position du loup-garou le plus proche.",
      power2: "",
      power3: "",
      description:
        "Le chasseur est avec le village, il peut choisir de tirer sur une personne pour l'éliminer. Cette décision n'est donc pas à prendre à la légère.",
    },
    {
      id: 6,
      order: 6,
      name: "Renard",
      image: "/images/village/renard.png",
      objectives: "Faire gagner le village",
      power1:
        "Une fois par nuit, le renard désigne 2 personnes et sait s'ils sont dans le même camp ou non.",
      power2:
        "Si des personnes l'ont éliminé pendant la nuit, alors le renard les emporte à cause de la gale.",
      power3: "",
      description:
        "Le renard est avec le village. Il a un rôle très important, car une fois par nuit, il peut déterminer si 2 personnes sont dans le même camp ou non. C'est un rôle très important pour le village.",
    },
    {
      id: 7,
      order: 7,
      name: "Guerrier",
      image: "/images/village/chevalier-a-l-epee-rouillee.png",
      objectives: "Faire gagner le village",
      power1:
        "Au début de la nuit, le guerrier peut décider de faire une ronde. Ainsi, à la fin de la nuit, le maitre du jeu lui indique quelle personne qui a utilisé son pouvoir durand cette nuit.",
      power2:
        "Une fois par nuit, il peut décider d'éliminer une personne qui a utilisé son pouvoir cette nuit.",
      power3: "",
      description:
        "Le guerrier gagne avec le village. Lorsqu'il sort faire sa ronde, il est capable de savoir qui est sorti de chez lui cette nuit (qui a utilisé son pouvoir cette nuit). Et peut éliminer l'une d'entre elles. Il peut-être un atout très puissant pour le village. Cependant, il va devoir faire attention à quelle personne il décide d'éliminer. Car même les villageois doivent sortir de chez eux pour utiliser leur pouvoir...",
    },
    {
      id: 8,
      order: 8,
      name: "Ours",
      image: "/images/village/montreur-d-ours.png",
      objectives: "Faire gagner le village",
      power1:
        "Une fois par nuit, il peut se déplacer entre 2 personnes. Si l'une ou les des deux personnes sont aggréssives, alors il peut décider d'en éliminer une ou deux. Si une ou plusieurs personnes parmis celles désignées par l'ours ont éliminé l'ours, alors ces personnes sont également éliminées.",
      power2: "",
      power3: "",
      description:
        "L'ours est avec le village. Une fois par nuit, il est capable de se déplacer entre 2 personnes et si une ou plusieurs de ces personnes sont aggréssives, il le saura et pourra décider d'en éliminer une ou deux. Une personne aggréssive est une personne ayant utilisé son pouvoir pour tuer quelqu'un. Par exemple: les loups-garous, mais également le chasseur... Libre à lui de prendre le risque d'éliminer ces personnes ou non. Il doit bien réfléchir avant d'agir, afin de ne pas commettre une erreur dont il pourrait s'en mordre les griffes plus tard dans la partie...",
    },
  ];

  const enemiesRoleList = [
    {
      id: 0,
      order: 0,
      name: "Loup-garou",
      image: "/images/enemies/loup-garou.png",
      objectives: "Faire gagner les loups-garous",
      power1:
        "Les loups-garou se réveillent et votent pour éliminer une personne, celle avec le plus grand nombre meurt. Ils peuvent se tuer entre-eux.",
      power2: "",
      power3: "",
      description:
        "Il connaît l'identité des autres loups-garous et doit essayer de tuer tous les villageois sans se faire découvrir. Il se réunit chaque nuit avec les autres loups-garous pour décider de leur victime. Il gagne si tout le village est éliminé.",
    },
    {
      id: 1,
      order: 1,
      name: "Infecte père des loups",
      image: "/images/enemies/infecte-pere-des-loups.png",
      objectives: "Faire gagner les loups-garous",
      power1:
        "Infection: <br /> Une fois par partie, il peut transformer en loup-garou une personne ayant été tuée durant cette nuit. La personne conserve son rôle initiale, en plus de son nouveau rôle de loup-garou.",
      power2: "",
      power3: "",
      description:
        "Dans l'équipe des loups-garous, l'Infect Père des Loups joue un rôle crucial. En plus de participer aux décisions nocturnes pour éliminer les villageois, il possède un pouvoir particulier : celui de choisir un villageois à infecter. Ce villageois infecté se transformera en loup-garou lors de la prochaine nuit, sans le savoir. Cette capacité peut être utilisée avec subtilité pour manipuler les événements à venir.",
    },
    {
      id: 2,
      order: 2,
      name: "Corbeau",
      image: "/images/enemies/corbeau.png",
      objectives: "Faire gagner les loups-garous",
      power1: "Invulnérable aux attaques de n'importe quel rôle.",
      power2:
        "Il désigne une personne qui aura 2 votes contre-lui lors de la prochaine phase de vote.",
      power3: "",
      description:
        "Le corbeau est avec les loups-garous. Au début de la partie, le maitre du jeu demandera, lors du tour du corbeau, que les loups-garous lèvent le poing sans ouvrir les yeux. De cette façon, le corbeau saura qui sont les loups-garous, mais les loups-garous ne sauront pas qui est le corbeau.",
    },
  ];

  const solitaryRoleList = [
    {
      id: 0,
      order: 0,
      name: "Pyromane",
      image: "/images/village/pyromane.png",
      objectives: "Il doit gagner seul",
      power1:
        "Une fois par nuit, il peut mettre de l'essence sur 0, 1 ou 2 personnes",
      power2:
      "Le pyromane peut décider d'alumer la mèche et ainsi de brûler en même temps toutes les personnes qui ont de l'essence sur eux (utilisable seulement à partir de la nuit suivante après avoir versé de l’essence sur la première personne).",
      power3:
      "",
      description:
      "Le pyromane est un rôle solitaire. Son objectif est d'être le seul survivant à la fin de la partie. S'il fait partie des 3 derniers survivants à la fin de la partie, il gagne. Il peut une fois par nuit, désigner 0, 1 ou 2 personnes, qui recevront de l'essence sur eux. Il peut une fois par partie décider d'allumer la mèche pour brûler et donc tuer toutes les personnes possédant de l'essence sur eux.",
    },
    {
      id: 1,
      order: 1,
      name: "Loup blanc",
      image: "/images/solitary/loup-blanc.png",
      objectives: "Il doit gagner seul",
      power1:
      "Il se réveille en même temps que les loups-garous et vote avec eux.",
      power2:
      "Une nuit sur deux, le loup-blanc se réveille et peut éliminer un de ses compères loups-garous.",
      power3:
      "",
      description:
      "Le Loup Garou Blanc ou Loup Blanc, est un des rôles du jeu les plus difficiles à jouer, car il gagne seul, en ayant éliminé tout le village et les loups garous. Une nuit sur deux, il peut dévorer un loup garou juste après leur tour. <br /><br />Il se réveille et vote en même temps que les loups. La complexité de ce rôle le rend difficile d'accès auprès des joueurs inexpérimentés, mais dans les parties plus avancées, il est un véritable challenge en plus pour les joueurs. C'est un rôle très populaire. <br /><br />Le loup blanc est une priorité pour les loups qui cherchent à l'éliminer au plus vite. Cependant il peut se révéler l'allié du village durant les premiers temps de la partie.",
    },
    {
      id: 2,
      order: 2,
      name: "Inquisiteur",
      image: "/images/solitary/abominable-sectaire.png",
      objectives: "Il doit avoir éliminé la sorcière et l'infecte père des loups",
      power1:
      "Une fois par nuit, il peut transformer n'importe quel joueur éliminé en esprit. Le joueur éliminé sera considéré comme un esprit qu'à partir de la nuit d'après.",
      power2:
      "Une fois par nuit, lorsque l'inquisiteur se réveille, chaque esprit peut désigner une personne qu'elle souhaite voir éliminé. Il peut décider de suivre ou non la majorité des votes des esprits.",
      power3:
      "",
      description:
      "L'inquisiteur est un rôle solitaire. Son objectif pour gagner seul, est d'éliminer la sorcière et l'infecte père des loups. Il possède la capacité de parler aux esprits. Ce qui est représenté dans la partie par le fait qu'il peut demander aux joueurs éliminés, transformés en esprits, qui l'inquisiteur devrait éliminer pendant la nuit.",
    },
    {
      id: 3,
      order: 3,
      name: "Assassin",
      image: "/images/solitary/voleur.png",
      objectives: "Il doit avoir éliminé la sorcière et l'infecte père des loups",
      power1:
      "Une fois par nuit, l'assassin peut désigner un membre du village qui utilise son pouvoir cette nuit, et rentrer chez cette personne. Il connait son rôle et peut décider de le tuer ou de changer de maison.",
      power2:
      "L'assassin ne peut être tué uniquement au vote du village.",
      power3:
      "",
      description:
      "L'objectif de l'assassin est de terminer la partie seul. Pour cela, il peut rentrer chez une personne qui a utilisé sont pouvoir durant la nuit et décider de la tuer ou non. L'assassin doit user de stratégie afin d'éliminer toutes les personnes une par une qui pourrait représenter un danger pour lui ou pour sa victoire. L'assassin peut décider d'éliminer plus tard une personne qui pourrait agir d'une manière qui pourrait l'arranger.",
    },
  ];
  const [roleList, setRoleList] = useState([]);
  const [showDetailsCard, setShowDetailsCard] = useState(false);
  const [roleName, setRoleName] = useState("");
  const [roleImage, setRoleImage] = useState("");
  const [roleObjectives, setRoleObjectives] = useState("");
  const [rolePower1, setRolePower1] = useState("");
  const [rolePower2, setRolePower2] = useState("");
  const [rolePower3, setRolePower3] = useState("");
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
    if (roleListName === "village") {
      setRoleList(villageRoleList);
    } else {
      if (roleListName === "enemies") {
        setRoleList(enemiesRoleList);
      } else {
        setRoleList(solitaryRoleList);
      }
    }
    console.log(roleList);
    console.log(villageRoleList);
  }, [roleListName]);

  const loadPopup = (
    name,
    image,
    objectives,
    power1,
    power2,
    power3,
    description
  ) => {
    setRoleName(name);
    setRoleImage(image);
    setRoleObjectives(objectives);
    setRolePower1(power1);
    setRolePower2(power2);
    setRolePower3(power3);
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
          rolePower1={rolePower1}
          rolePower2={rolePower2}
          rolePower3={rolePower3}
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
          {roleListName === "village"
            ? "Village"
            : roleListName === "enemies"
            ? "Ennemies"
            : "Solitaires"}
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
                role.image,
                role.objectives,
                role.power1,
                role.power2,
                role.power3,
                role.description
              )
            }
          >
            <div className="roleImgContainer">
              <img className="roleImg" src={role.image} alt="" />
            </div>
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
