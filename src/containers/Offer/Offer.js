import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import OfferInfos from "../../components/Offer-Components/OfferInfos.js";
import Aside from "../../components/Offer-Components/Aside.js";

import url from "../../url.js";

const Offer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [offer, setOffer] = useState({});

  let { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(url.url + "/offer/?id=" + id);
      setOffer(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log("vous êtes nul");
    }
  };

  console.log(offer);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {isLoading === true ? (
        "Loading in progress"
      ) : (
        <section className="offer">
          <div className="container">
            <OfferInfos offer={offer} />
            <Aside offer={offer} />
          </div>
        </section>
      )}
    </>
  );
};

export default Offer;
