import React from "react";
import "./StoryPage.css";
import storyImage from "../../assets/images/story-image.png";
import storyIcon from "../../assets/images/lore-menu-icon-outlined-activated.svg";

const StoryPage = () => {
  return (
    <div className="storyContainer">
      <div className="storyImageContainer">
        <img src={storyImage} alt="" />
      </div>
      <div className="storyTextAndTitleContainer">
        <div className="storyTitleAndIcon">
          <img className="storyImg" src={storyIcon} alt="" />
          <h2 className="storyTitle">Histoire</h2>
        </div>
        <div className="storyTextContainer">
          <p className="storyParagraph">
            Rapprochez-vous, car l'histoire que vous allez lire pourrait bien
            décider de votre sort ce soir...
            <br />
            <br />
            Dans une vallée reculée, perdue au milieu d'une forêt ancienne et
            sauvage, se trouve un village nommé Thiercelieux.
            <br />
            <br />
            Autrefois prospère, ce lieu était connu pour la chaleur de ses
            foyers et la générosité de ses habitants.
            <br />
            <br /> Mais ces temps de paix sont révolus, et aujourd'hui, une
            malédiction hante ce village.
            <br />
            <br /> Tout a commencé par des murmures dans les bois, des
            hurlements à la pleine lune, des ombres furtives qui rôdent entre
            les arbres.
            <br />
            <br /> Puis, les disparitions ont commencé. Des villageois qu'on
            retrouvait déchirés par des griffes invisibles, leurs maisons vidées
            de toute vie.
            <br />
            <br /> Le bruit court qu'une ancienne malédiction se serait
            réveillée, et que parmi vous, chers villageois, se cachent des
            loups-garous, des créatures infernales capables de se transformer en
            bêtes féroces dès que la nuit tombe.
            <br />
            <br /> Chaque nuit, les loups-garous sortent de leurs tanières,
            choisissant l'un d'entre vous pour en faire leur victime.
            <br />
            <br /> Chaque jour, les survivants se rassemblent sur la place du
            village, cherchant à découvrir qui, parmi eux, est un monstre
            déguisé en homme.
            <br />
            <br /> Les regards se font méfiants, les voix s'élèvent, les
            accusations volent, car ici, à Thiercelieux, personne n'est à
            l'abri.
            <br />
            <br /> Serez-vous capable de démasquer les loups-garous avant qu'ils
            ne vous dévorent tous, ou tomberez-vous sous le poids de la
            suspicion et de la peur ?<br />
            <br /> Seul le temps le dira...
            <br />
            <br /> Ce soir, le sort du village est entre vos mains. Que la
            bataille de Thiercelieux commence !
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoryPage;
