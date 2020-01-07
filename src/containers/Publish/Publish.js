import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import url from "../../url.js";

const Publish = props => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState("");

  let history = useHistory();

  const handleTitleChange = event => {
    const value = event.target.value;
    setTitle(value);
  };
  const handleDescriptionChange = event => {
    const value = event.target.value;
    setDescription(value);
  };
  const handlePriceChange = event => {
    const value = event.target.value;
    setPrice(value);
  };
  const handleFileChange = event => {
    const value = event.target.files[0];
    setFile(value);
  };

  const req = async () => {
    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("price", price);
    data.append("files", file);

    try {
      const response = await axios.post(url.url + "/offer/publish", data, {
        headers: { Authorization: "Bearer " + props.token }
      });
      history.push("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className="container-publish ">
        <div className="announce-depot box-shadow">
          <div className="title-publish">
            <h2>Deposer une annonce</h2>
          </div>
          <form onSubmit={props.handleSubmit}>
            <div>
              <p>Titre de l'annonce*</p>
              <input type="text" value={title} onChange={handleTitleChange} />
              <p>Texte de l'annonce*</p>
              <textarea
                className="publish-input-description"
                type="text"
                value={description}
                onChange={handleDescriptionChange}
                style={{ resize: "none" }}
              />
              <p>Prix*</p>
              <input
                className="publish-input-price"
                type="Number"
                value={price}
                onChange={handlePriceChange}
              />
              <span>€</span>
            </div>
            <div>
              <p>Photo*</p>
              <input
                className="publish-input-photo"
                type="file"
                onChange={handleFileChange}
              />
            </div>
            <button onClick={req}>Valider</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Publish;
