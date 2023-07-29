import React from "react";
import Form from "react-bootstrap/Form";
import "./style.css";
import { useEffect, useState } from "react";
import axios from "axios";
import CategoryForm from "../ProductAdmin/CategoryForm";
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const EditCategory = () => {
  const [cate, setCate] = useState([]);

  useEffect(() => {
    axios
      .get("http://26.30.1.50:8080/api/v1.0/Categories")
      .then((response) => {
        setCate(response.data);
      })
      .catch((error) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useHistory();
  const [errors, setErrors] = useState({});

  const [CategoryName, setCategoryName] = useState("");
  const [parent, setParent] = useState("");
  // const [image, setImage] = useState(null);

  const handleCategoryName = (event) => {
    setCategoryName(event.target.value);
  };

  const handleParent = (event) => {
    setParent(event.target.value);
  };

  const click = () => {
    const newErrors = {};
    if (CategoryName === "") {
      newErrors.CategoryName = "Vui lòng nhập thể loại sản phẩm";
    } else if (!/^[\p{L}\s]+$/u.test(CategoryName)) {
      newErrors.CategoryName = "Tên thể loại sản phẩm không hợp lệ";
    }

    if (parent === "") {
      newErrors.parent = "Vui lòng nhập chọn category cha";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log(CategoryName);
      console.log(parent);
      const data = {
        categoryName: CategoryName,
        parent: parent,
      };

      var tokenn = localStorage.getItem("token");
      var id = window.location.pathname.substring(14);
      axios
        .put("http://26.30.1.50:8080/api/v1.0/Category/" + id, data, {
          headers: {
            Authorization: "Bearer " + tokenn,
            "Content-Type": "application/json", // Đặt kiểu phương tiện là JSON
          },
        })
        .then((response) => {
          navigate.push(`/categoryadmin`);
          alert("d");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="addcate">
      <Form.Label htmlFor="catename">Category Name</Form.Label>
      <Form.Control
        type="text"
        id="catename"
        aria-describedby="passwordHelpBlock"
        onChange={handleCategoryName}
      />
      {errors.CategoryName && <p>{errors.CategoryName}</p>}
      <div>
        <h5>Chọn Category cha</h5>
        <select id="Category" onChange={handleParent}>
          {cate.map((item, index) => (
            <CategoryForm key={index} item={item} />
          ))}
        </select>
        {errors.parent && <p>{errors.parent}</p>}
      </div>
      <Button onClick={click} className="button_add" variant="danger">Update</Button>{' '}
    </div>
  );
};

export default EditCategory;