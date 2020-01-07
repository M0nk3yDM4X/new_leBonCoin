import React from "react";
import {
  Schedule,
  NotificationsNone,
  RemoveRedEyeOutlined
} from "@material-ui/icons";

const SignUpInfos = () => {
  return (
    <div className="why">
      <h2>Pouquoi créer un compte ?</h2>
      <div className="infos">
        <div className="time">
          <Schedule style={{ fontSize: 50, color: "#4282D7" }} />
        </div>
        <div>
          <h3>Gagnez du temps</h3>
          <p>
            Publiez vos annonces rapidement, avec vos informations pré-remplies
            chaque fois que vous souhaitez déposer une nouvelle annonce.
          </p>
        </div>
      </div>
      <div className="infos">
        <div className="time">
          <NotificationsNone style={{ fontSize: 50, color: "#4282D7" }} />
        </div>
        <div>
          <h3>Soyez les premiers informés</h3>
          <p>
            Créez des alertes Immo ou Emploi et ne manquez jamais l’annonce qui
            vous intéresse.
          </p>
        </div>
      </div>
      <div className="infos">
        <div>
          <RemoveRedEyeOutlined
            className="time"
            style={{ fontSize: 50, color: "#4282D7" }}
          />
        </div>
        <div>
          <h3>Visibilité</h3>
          <p>
            Suivez les statistiques de vos annonces (nombre de fois où votre
            annonce a été vue, nombre de contacts reçus).
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpInfos;
