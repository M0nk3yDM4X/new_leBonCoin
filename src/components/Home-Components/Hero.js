import React from "react";

const Hero = props => {
  const handleChange = (event, str) => {
    const value = event.target.value;
    if (str === "title") {
      props.setTitle(value);
    } else if (str === "priceMin") {
      props.setPriceMin(value);
    } else if (str === "priceMax") {
      props.setPriceMax(value);
    } else if (str === "sort") {
      props.setSort(value);
    }
  };

  return (
    <div className="hero">
      <div className="wrapper-hero">
        <div className="search-product">
          <input
            className="input-product"
            placeholder="🔍 Que recherchez-vous ?"
            value={props.title}
            onChange={event => {
              handleChange(event, "title");
            }}
          />

          <input
            type="number"
            placeholder="tri par prix minimum"
            value={props.priceMin}
            onChange={event => {
              handleChange(event, "priceMin");
            }}
          />

          <input
            type="number"
            placeholder="tri par prix maximum"
            value={props.priceMax}
            onChange={event => {
              handleChange(event, "priceMax");
            }}
          />

          <select
            value={props.sort}
            onChange={event => {
              handleChange(event, "sort");
            }}
          >
            {props.arraySelected}
          </select>

          <button
            className="search-product-button"
            onClick={() => {
              props.fetchData();
            }}
          >
            Rechercher
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
