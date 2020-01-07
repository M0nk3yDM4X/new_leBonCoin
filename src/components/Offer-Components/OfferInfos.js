import React from "react";
import format from "date-fns/format";

const OfferInfos = props => {
  const result = format(new Date(props.offer.created), "Pp");
  return (
    <>
      <article>
        <div className="back-image">
          <img src={props.offer.pictures[0]} alt="product" />
        </div>
        <div className="offer-infos  box-shadow">
          <div>
            <span className="offer-title">{props.offer.title}</span>
            <span className="offer-price">{props.offer.price} €</span>
          </div>
          <span> {result} </span>
        </div>
        <div>
          <h3>Description</h3>
          <div className="offer-description">
            <p>{props.offer.description}</p>
          </div>
        </div>
      </article>
    </>
  );
};

export default OfferInfos;
