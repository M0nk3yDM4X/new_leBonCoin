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

  const sortArray = ["price-desc", "price-asc", "date-desc", "date-asc"];
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

  // console.log(pageNumbers);
  // console.log(dataLength);

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

  useEffect(() => {
    fetchData();
  }, [page]);
  useEffect(() => {
    console.log(products);
  }, [products]);

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
                  if (page > 1) {
                    setPage(page - 1);
                  }
                }}
              >
                ⇤
              </button>

              {numberOfPages.map((number, index) => {
                // console.log(number, index);

                return (
                  <button
                    className="buttons-css"
                    key={index}
                    onClick={() => {
                      setPage(number);
                    }}
                  >
                    {number}
                  </button>
                );
              })}

              <button
                className="buttons-css"
                onClick={() => {
                  console.log("ceci est le numéro de page >>>", page);
                  console.log(
                    "ceci est la limite du nombre de pages >>> ",
                    dataLength - limit
                  );
                  if (page < dataLength - limit - 1) {
                    setPage(page + 1);
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
