import React from "react";
import SearchResultCard from "./SearchResultCard";
import "./style.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const SearchResult = ({ addToCart, shopItems }) => {
  const [products, setProducts] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [idcategory, setIdcategory] = useState(1);

  useEffect(() => {
    axios
      .get("http://26.30.1.50:8080/api/v1.0/Categories")
      .then((response) => {
        // Lưu dữ liệu trả về vào state
        setCategorys(response.data);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    axios
      .get(
        "http://26.30.1.50:8080/api/v1.0/ProductByName/" +
          window.location.pathname.substring(8)
      )
      .then((response) => {
        // Lưu dữ liệu trả về vào state
        setProducts(response.data);
      })
      .catch((error) => {});
  }, [idcategory]);
  return (
    <section className="shop background">
      <div className="container d_flex container_item">
        {/* <Catg /> */}
        <div className="contentWidth content__items">
          <div className="product-content  grid1">
            {products.map((product, index) => {
              return (
                <SearchResultCard
                  key={index}
                  addToCart={addToCart}
                  shopItems={product}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchResult;
