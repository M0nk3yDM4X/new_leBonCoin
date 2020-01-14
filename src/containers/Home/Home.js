import React, { useState, useEffect } from "react";
import axios from "axios";

import url from "../../url.js";

import Hero from "../../components/Home-Components/Hero.js";
import ProductList from "../../components/Home-Components/ProductList.js";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Liste de produits
  const [products, setProducts] = useState({});

  // Nombre de produits
  const [page, setPage] = useState();

  // Compteur
  const [counter, setCounter] = useState(0);

  // Filtres
  const [title, setTitle] = useState("");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);
  const [sort, setSort] = useState("");

  const sortArray = ["price-desc", "price-asc", "date-desc", "date-asc"];
  const arraySelected = [];

  for (let i = 0; i < sortArray.length; i++) {
    arraySelected.push(
      <option key={sortArray[i]} value={sortArray[i]}>
        {sortArray[i]}
      </option>
    );
  }

  const array = [];
  let limit = 10;
  for (let i = 0; i < page / limit; i++) {
    array.push(i + 1);
  }

  let link = url.url + "/offers/?" + counter + "&limit=" + limit;

  if (title && title.length > 0) {
    link = link + "&title=" + title;
  }
  if (priceMin > 0) {
    link = link + "&priceMin=" + priceMin;
  }
  if (priceMax > 0) {
    link = link + "&priceMax=" + priceMax;
  }

  if (sort) {
    link = link + "&sort=" + sort;
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(link);
      console.log(response.data);
      setProducts(response.data.offers);
      setPage(response.data.count);
      setIsLoading(false);
    } catch (error) {
      console.log("vous êtes nul");
    }
  };

  useEffect(() => {
    fetchData();
  }, [counter]);

  return (
    <div className="homepage">
      <Hero
        fetchData={fetchData}
        title={title}
        setTitle={setTitle}
        priceMin={priceMin}
        setPriceMin={setPriceMin}
        priceMax={priceMax}
        setPriceMax={setPriceMax}
        sort={sort}
        setSort={setSort}
        arraySelected={arraySelected}
      />
      {isLoading === true ? (
        <p>LOADING</p>
      ) : (
        <>
          <ProductList products={products} />
          <div className="wrapper-buttons">
            <div className="buttons">
              <button
                className="buttons-css"
                onClick={() => {
                  if (counter > 0) {
                    setCounter(counter - limit);
                  }
                }}
              >
                ⇤
              </button>

              {array.map((number, index) => {
                return (
                  <button
                    className="buttons-css"
                    key={index}
                    onClick={() => {
                      setCounter(number * limit - limit);
                    }}
                  >
                    {number}
                  </button>
                );
              })}

              <button
                className="buttons-css"
                onClick={() => {
                  if (counter < page - limit) {
                    setCounter(counter + limit);
                  }
                }}
              >
                ⇥
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
