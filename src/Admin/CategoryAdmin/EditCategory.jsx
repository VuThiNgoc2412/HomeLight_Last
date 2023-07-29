import React from "react";
import Form from "react-bootstrap/Form";
import "./style.css";
import { useEffect, useState } from "react";
import axios from "axios";
import CategoryForm from "../ProductAdmin/CategoryForm";
import { useHistory } from "react-router-dom";

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

  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const handleSelectChange = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedLanguages(selectedOptions);
    console.log(selectedOptions);
  };

  const [errors, setErrors] = useState({});

  const [CategoryName, setCategoryName] = useState("");
  // const [image, setImage] = useState(null);

  const handleCategoryName = (event) => {
    setCategoryName(event.target.value);
  };

  const click = () => {
    const newErrors = {};
    if (CategoryName === "") {
      newErrors.CategoryName = "Vui lòng nhập thể loại sản phẩm";
    } else if (!/^[\p{L}\s]+$/u.test(CategoryName)) {
      newErrors.CategoryName = "Tên thể loại sản phẩm không hợp lệ";
    }

    if (selectedLanguages.length === 0) {
      newErrors.selectedLanguages = "Vui lòng nhập chọn category thay thế";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const formData = new FormData();
      formData.append("categoryName", CategoryName);
      formData.append("parent", selectedLanguages);
      var tokenn = localStorage.getItem("token");
      var id = window.location.pathname.substring(14);
      axios
        .put("http://26.30.1.50:8080/api/v1.0/Category/"+id, formData, {
          headers: {
            Authorization: "Bearer " + tokenn,
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
        <select id="Category" onChange={handleSelectChange}>
          {cate.map((item, index) => (
            <CategoryForm key={index} item={item} />
          ))}
        </select>
        {errors.selectedLanguages && <p>{errors.selectedLanguages}</p>}
      </div>
      <button onClick={click}>Update</button>
    </div>
  );
};
export default EditCategory;