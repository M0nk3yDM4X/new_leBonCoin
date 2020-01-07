import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import url from "../../url.js";

import SignUpInfos from "../../components/SignUp-Components/SignUpInfos.js";

const SignUp = props => {
  let history = useHistory();

  const [isMessageErrorDisplayed, setIsMessageErrorDisplayed] = useState(false);
  const [cgv, setCGV] = useState(false);

  let isEnable = false;

  if (
    props.username !== "" &&
    props.email !== "" &&
    props.password !== "" &&
    props.isSamePassword !== "" &&
    props.isSamePassword === props.password &&
    cgv === true
  ) {
    isEnable = true;
  }

  const req = async () => {
    const response = await axios.post(url.url + "/user/sign_up", {
      email: props.email,
      username: props.username,
      password: props.password
    });

    props.logIn(response.data);
    history.push("/");
    props.setEmail("");
    props.setUsername("");
    props.setPassword("");
    props.setIsSamePassword("");
  };

  return (
    <div className="create-account container box-shadow">
      <SignUpInfos />
      <form className="form" onSubmit={props.handleSubmit}>
        <h2>Créez un compte</h2>
        <div className="username-and-mail">
          <p>Pseudo*</p>
          <input
            type="text"
            placeholder=""
            name="username"
            value={props.username}
            onChange={event => {
              props.handleUsernameChange(event);
            }}
          />

          <p>Adresse email*</p>
          <input
            type="text"
            placeholder=""
            name="email"
            value={props.email}
            onChange={event => {
              props.handleEmailChange(event, "email");
            }}
          />
        </div>

        <div className="password">
          <div>
            <p>Mot de passe*</p>
            <input
              type="password"
              placeholder=""
              name="password"
              value={props.password}
              onChange={event => {
                props.handlePasswordChange(event, "password");
              }}
            />
          </div>
          <div>
            <p>Confirmer le mot de passe*</p>
            <input
              type="password"
              placeholder=""
              name="password"
              value={props.isSamePassword}
              onBlur={() => {
                setIsMessageErrorDisplayed(true);
              }}
              onChange={event => {
                props.handlePasswordBisChange(event, "passwordBis");
              }}
            />
          </div>
        </div>
        <div>
          {props.password.length > 8 ||
          props.isSamePassword.length > 8 ? null : (
            <p
              style={{
                marginBottom: "1rem",
                fontSize: "12px",
                fontWeight: "bold",
                color: "#F56A29"
              }}
            >
              Information: Vous devez renseignez un password de 8 caractères
              minimum
            </p>
          )}
          {isMessageErrorDisplayed === true &&
            props.password !== props.isSamePassword && (
              <p
                style={{
                  marginBottom: "1rem",
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#F56A29"
                }}
              >
                Les mots de passe saisis sont différents. Veuillez réessayer.
              </p>
            )}
        </div>
        <div className="cgu">
          <input
            type="checkbox"
            checked={cgv}
            onChange={event => {
              console.log(event.target.checked);
              setCGV(event.target.checked);
            }}
            style={{ width: "auto" }}
          />
          <span>
            «J'accèpte les <a>Conditions Générales de Vente</a> et les
            <a>Conditions Générales d'Utilisation</a>»
          </span>
        </div>
        {isEnable === true ? (
          <button
            type="submit"
            value="Submit"
            onClick={req}
            style={{ cursor: "pointer" }}
          >
            Créer mon compte personnel
          </button>
        ) : (
          <button
            type="submit"
            value="Submit"
            style={{ cursor: "not-allowed" }}
          >
            Créer mon compte personnel
          </button>
        )}
      </form>
    </div>
  );
};

export default SignUp;
