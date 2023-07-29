import React from "react";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import axios from "axios";
import CategoryForm from "./CategoryForm";
import "react-dropdown-tree-select/dist/styles.css";
import DropdownHOC from "./DropdownHOC";
import { useHistory } from "react-router-dom";

const EditProduct = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [categorysTreeData, setCategorysTreeData] = useState([]);
  const [cate, setCate] = useState([]);

  const handleImageChange = (e) => {
    if (e.target.files.length) {
      const src = URL.createObjectURL(e.target.files[0]);
      setImageUrl(src);
    }
  };

  const transformToTreeData = (categories) => {
    return categories.map((category) => ({
      label: category.categoryName,
      value: category.id.toString(),
      ...(category.children && {
        children: transformToTreeData(category.children),
      }),
    }));
  };

  useEffect(() => {
    axios
      .get("http://26.30.1.50:8080/api/v1.0/Categories")
      .then((response) => {
        setCate(response.data);
        const treeData = transformToTreeData(response.data);
        setCategorysTreeData(treeData);
        console.log(treeData);
      })
      .catch((error) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [chaArray, setChaArray] = useState([]); // Step 1: Define the state variable

  function updateNodeValue(node, targetValue, newValue) {
    if (node.value === targetValue) {
      node.value = newValue;
      return;
    }

    for (const child of node.children) {
      updateNodeValue(child, targetValue, newValue);
    }
  }

  // Step 2: Create a function to update the state variable
  const updateChaArray = (cha) => {
    setChaArray(cha);
    console.log("hi");
  };

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

  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleProductCodeChange = (event) => {
    setProductCode(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const [errors, setErrors] = useState({});

  const click = () => {
    chaArray.forEach((parentNodes) => {
      var category = document.getElementById("Category").value;
      const lastParentNode = parentNodes[parentNodes.length - 1];
      updateNodeValue(lastParentNode, lastParentNode.value, category);
      console.log(lastParentNode);
    });

    const newErrors = {};
    if (productName === "") {
      newErrors.productName = "Vui lòng nhập tên sản phẩm";
    } else if (!/^[\p{L}\s]+$/u.test(productName)) {
      newErrors.productName = "Tên sản phẩm không hợp lệ";
    }

    if (productCode === "") {
      newErrors.productCode = "Vui lòng nhập mã sản phẩm";
    } else if (!/^[\p{L}\s]+$/u.test(productCode)) {
      newErrors.productCode = "Mã sản phẩm không hợp lệ";
    }

    if (price === "") {
      newErrors.price = "Vui lòng nhập giá tiền";
    } else if (!/^[0-9]+$/.test(price)) {
      newErrors.price = "Giá tiền chỉ được chứa chữ số";
    }

    if (description === "") {
      newErrors.description = "Vui lòng nhập mô tả sản phẩm";
    }

    if (selectedLanguages.length === 0) {
      newErrors.selectedLanguages = "Vui lòng nhập chọn category thay thế";
    }

    if (imageUrl === "") {
      newErrors.imageUrl = "Vui lòng nhập chọn ảnh";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("productCode", productCode);
      formData.append("originPrice", price);
      formData.append("description", description);
      formData.append("image", imageUrl);
      formData.append("categoryId", selectedLanguages);
      var tokenn = localStorage.getItem("token");
      var id = window.location.pathname.substring(13);
      alert(id);
      axios
        .put("http://26.30.1.50:8080/api/v1.0/ProductDetail/" + id, formData, {
          headers: {
            Authorization: "Bearer " + tokenn,
          },
        })
        .then((response) => {
          navigate.push(`/admin`);
          alert("d");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <h3 className="edit_title">Edit Product</h3>
      <div className="edit_product">
        <div className="edit_input">
          <Form.Label htmlFor="name">Product Name</Form.Label>
          <Form.Control
            type="text"
            id="name"
            aria-describedby="passwordHelpBlock"
            onChange={handleProductNameChange}
          />
          {errors.productName && <p>{errors.productName}</p>}
          <Form.Label htmlFor="code">Product Code</Form.Label>
          <Form.Control
            type="text"
            id="code"
            aria-describedby="passwordHelpBlock"
            onChange={handleProductCodeChange}
          />
          {errors.productCode && <p>{errors.productCode}</p>}
          <Form.Label htmlFor="price">Price</Form.Label>
          <Form.Control
            type="number"
            id="price"
            aria-describedby="passwordHelpBlock"
            onChange={handlePriceChange}
          />
          {errors.price && <p>{errors.price}</p>}
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              id="description"
              as="textarea"
              rows={3}
              onChange={handleDescriptionChange}
            />
            {errors.description && <p>{errors.description}</p>}
          </Form.Group>
          <h3>Chọn Category cần thay thế</h3>
          {categorysTreeData.length > 0 ? (
            <DropdownHOC
              data={categorysTreeData}
              updateChaArray={updateChaArray}
            />
          ) : (
            <p>Loading categories...</p>
          )}
          <h3>Chọn Category thay thế</h3>
          <select id="Category" multiple onChange={handleSelectChange}>
            {cate.map((item, index) => (
              <CategoryForm key={index} item={item} />
            ))}
          </select>
          {errors.selectedLanguages && <p>{errors.selectedLanguages}</p>}
          <button onClick={click}>Update</button>
        </div>
        <div class="image-upload">
          <label for="file-input">
            <img src={imageUrl} alt="Thêm ảnh" />
          </label>
          <input id="file-input" type="file" onChange={handleImageChange} />
          {errors.imageUrl && <p>{errors.imageUrl}</p>}
        </div>
      </div>
    </>
  );
};

export default EditProduct;