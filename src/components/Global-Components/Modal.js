import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import url from "../../url.js";

const Modal = props => {
  const req = async () => {
    const response = await axios.post(url.url + "/user/log_in", {
      email: props.email,
      password: props.password
    });

    props.logIn(response.data);
    props.setShowModal(false);
    props.setEmail("");
    props.setPassword("");
  };

  return (
    <>
      {props.showModal === true && (
        <div className="modal">
          <div
            className="cross"
            onClick={() => {
              props.setShowModal(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#346699"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 3h18v18H3zM15 9l-6 6m0-6l6 6" />
            </svg>
          </div>
          <form className="modal-connection" onSubmit={props.handleSubmit}>
            <h2>Connexion</h2>
            <div className="modal-input">
              <p>Adresse email</p>
              <input
                type="text"
                placeholder=""
                name="email"
                value={props.email}
                onChange={event => {
                  props.handleEmailChange(event, "email");
                }}
              />

              <p>Mot de passe</p>
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

            <button
              type="submit"
              value="Submit"
              className="to-connect"
              onClick={req}
            >
              Se connecter
            </button>

            <p>Vous n'avez pas de compte ?</p>
            <Link to={"/sign_up/"}>
              <button
                onClick={() => {
                  props.setShowModal(false);
                }}
                className="to-create"
              >
                Créer un compte
              </button>
            </Link>
            <br />
          </form>
        </div>
      )}
    </>
  );
};

export default Modal;
