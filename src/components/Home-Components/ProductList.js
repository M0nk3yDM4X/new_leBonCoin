import React from "react";
import { Link } from "react-router-dom";
import format from "date-fns/format";

const ProductList = props => {
  const products = props.products;
  const length = products.length;
  return (
    <section className={length < 3 ? "productListUnfill" : "product-list"}>
      <div className="wrapper-products">
        {props.products.map((product, index) => {
          const result = format(new Date(product.created), "Pp");
          return (
            <div key={product._id} className="product-card">
              <div className="picture-product">
                {product.pictures.length < 1 ? (
                  <img
                    className="image-product"
                    src="https://www.quantabiodesign.com/wp-content/uploads/No-Photo-Available.jpg"
                    alt="nothing to show"
                  />
                ) : (
                  <img
                    className="image-product"
                    src={product.pictures[0]}
                    alt="product"
                  />
                )}
              </div>
              <div className="text-product">
                <div className="infos-product">
                  <Link className="title-product" to={"/offer/" + product._id}>
                    <span className="title-product">{product.title}</span>
                  </Link>
                  <br />
                  <span className="price-product">{product.price} €</span>
                </div>
                <p className="publication-product">{result}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductList;
