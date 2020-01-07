import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";

import Header from "./components/Global-Components/Header.js";

import Modal from "./components/Global-Components/Modal.js";

import Home from "./containers/Home/Home.js";
import Offer from "./containers/Offer/Offer.js";
import SignUp from "./containers/SignUp/SignUp.js";
import Publish from "./containers/Publish/Publish.js";

import Footer from "./components/Global-Components/Footer.js";

const App = () => {
  const userCookie = Cookies.get("user");
  const token = Cookies.get("token");
  const [user, setUser] = useState(userCookie);

  const [showModal, setShowModal] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSamePassword, setIsSamePassword] = useState("");
  const [username, setUsername] = useState("");

  const handleChange = (event, str) => {
    const value = event.target.value;
    if (str === "email") {
      setEmail(value);
    } else if (str === "password") {
      setPassword(value);
    } else if (str === "passwordBis") {
      setIsSamePassword(value);
    } else {
      setUsername(value);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
  };

  const logIn = object => {
    Cookies.set("token", object.token);
    Cookies.set("user", object.account.username);
    setUser(object.account.username);
  };

  const logOut = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setUser(null);
  };

  return (
    <div className="homepage">
      <Router>
        <Modal
          email={email}
          setEmail={setEmail}
          handleEmailChange={handleChange}
          password={password}
          setPassword={setPassword}
          handlePasswordChange={handleChange}
          handleSubmit={handleSubmit}
          showModal={showModal}
          setShowModal={setShowModal}
          logIn={logIn}
        />
        <Header user={user} logOut={logOut} setShowModal={setShowModal} />

        <Switch>
          <Route path="/offer/:id">
            <Offer user={user} />
          </Route>
          <Route path="/sign_up/">
            <SignUp
              user={user}
              logIn={logIn}
              email={email}
              setEmail={setEmail}
              handleEmailChange={handleChange}
              password={password}
              setPassword={setPassword}
              handlePasswordChange={handleChange}
              isSamePassword={isSamePassword}
              setIsSamePassword={setIsSamePassword}
              handlePasswordBisChange={handleChange}
              username={username}
              setUsername={setUsername}
              handleUsernameChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </Route>
          <Route path="/publish">
            <Publish user={user} handleSubmit={handleSubmit} token={token} />
          </Route>
          <Route path="/">
            <Home user={user} />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
