import React from "react";
import "./styles.css";
import { ReactComponent as Arrow } from "../../Assets/arrow.svg";
import { ReactComponent as Gamer } from "../../Assets/gamer.svg";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-text">
        <h1 className="home-text-title">Quais os jogos favoritos da galera?</h1>
        <h3 className="home-text-subtitle">
          Clique no botão abaixo e descubra quais são os jogos mais jogados
          pelos gamers!
        </h3>
        <div className="home-actions">
          <button className="home-btn">Quero saber quais são</button>
          <div className="home-btn-icon">
            <Arrow />
          </div>
        </div>
      </div>
      <Gamer className="home-image"></Gamer>
    </div>
  );
};

export default Home;
