import React, { useState, useEffect } from "react";
import axios from "axios";

import url from "../../url.js";

import Hero from "../../components/Home-Components/Hero.js";
import ProductList from "../../components/Home-Components/ProductList.js";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Liste de produits
  const [products, setProducts] = useState({});

  // Nombre de produits --> longueur du tableau de la data réceptionnée
  const [dataLength, setDataLength] = useState(0);

  // Compteur
  const [page, setPage] = useState(1);

  // Filtres
  const [title, setTitle] = useState("");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);
  const [sort, setSort] = useState("");

  const sortArray = [
    "prix-décroissant",
    "prix-croissant",
    "date-décroissant",
    "date-croissant"
  ];
  const arraySelected = [];

  for (let i = 0; i < sortArray.length; i++) {
    arraySelected.push(
      <option key={sortArray[i]} value={sortArray[i]}>
        {sortArray[i]}
      </option>
    );
  }

  const numberOfPages = [];
  let limit = 3;
  for (let i = 0; i < dataLength / limit; i++) {
    numberOfPages.push(i + 1);
  }

  let link = url.url + "/offers" + "?page=" + page;

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
      setProducts(response.data.offers);
      setDataLength(response.data.count);
      setIsLoading(false);
    } catch (error) {
      console.log("vous êtes nul");
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const nextPage = () => {
    if (page < dataLength - limit) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

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
              <button className="buttons-css" onClick={prevPage}>
                ⇤
              </button>

              {numberOfPages.map((number, index) => {
                const actualPage = () => {
                  setPage(number);
                };

                return (
                  <button
                    className="buttons-css"
                    key={index}
                    onClick={actualPage}
                  >
                    {number}
                  </button>
                );
              })}

              <button className="buttons-css" onClick={nextPage}>
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
