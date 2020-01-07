import React, { useState, useEffect } from "react";
import axios from "axios";

import url from "../../url.js";

import Hero from "../../components/Home-Components/Hero.js";
import ProductList from "../../components/Home-Components/ProductList.js";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState();
  const [counter, setCounter] = useState(0);
  const [title, setTitle] = useState("");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);
  const [sort, setSort] = useState("");

  const sortArray = ["price-desc", "price-asc", "date-desc", "date-asc"];
  const arraySelected = [];

  for (let i = 0; i < sortArray.length; i++) {
    arraySelected.push(<option value={sortArray[i]}> {sortArray[i]}</option>);
  }

  // HELLO WORLD

  // const array = [];
  // let limit = 10;
  // for (let i = 0; i < pageNumber / limit; i++) {
  //   array.push(i + 1);
  // }

  let link = url.url + "/offer/with-count";

  // + counter + "&limit=" + limit;

  if (title && title.length > 0) {
    url = url + "&title=" + title;
  }
  if (priceMin > 0) {
    url = url + "&priceMin=" + priceMin;
  }
  if (priceMax > 0) {
    url = url + "&priceMax=" + priceMax;
  }

  if (sort) {
    url = url + "&sort=" + sort;
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(link);
      setProducts(response.data.offers);
      setPageNumber(response.data.count);
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
          {/* <div className="wrapper-buttons">
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
                  if (counter < pageNumber - limit) {
                    setCounter(counter + limit);
                    console.log(counter);
                  }
                }}
              >
                ⇥
              </button>
            </div>
          </div> */}
        </>
      )}
    </div>
  );
};

export default Home;
