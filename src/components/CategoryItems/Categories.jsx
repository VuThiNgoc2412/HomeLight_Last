import React from "react";
import CategoryItem from "./CategoryItem";
import "./style.css";
import { useState, useEffect } from "react";
import axios from "axios";

const Categories = () => {
  const [Categorys, setCategorys] = useState([]);
  useEffect(() => {
    axios
      .get("http://26.30.1.50:8080/api/v1.0/Categories")
      .then((response) => {
        // Lưu dữ liệu trả về vào state
        setCategorys(response.data);
      })
      .catch((error) => {});
  }, []);
  return (
    <div className="category category_container">
      {Categorys.map((item) => (
        <CategoryItem item={item} />
      ))}
    </div>
  );
};

export default Categories;
