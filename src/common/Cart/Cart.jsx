import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Cart = ({ CartItem, addToCart, decreaseQty }) => {
  // Stpe: 7   calucate total of items
  const totalPrice = CartItem.reduce(
    (price, item) => price + item.quantity * item.originPrice,
    0
  );

  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [arrived, setArrived] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleArrivedChange = (event) => {
    setArrived(event.target.value);
  };

  const navigate = useHistory();
  const handleBuy = () => {
    var tokenn = localStorage.getItem("token");
    const newErrors = {};
    if (email === "") {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (phone === "") {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^[0-9]+$/.test(phone)) {
      newErrors.phone = "Số điện thoại chỉ được chứa chữ số";
    }

    if (arrived === "") {
      newErrors.arrived = "Vui lòng nhập nơi bạn muốn giao đến";
    } else if (!/^[\p{L}\s]+$/u.test(arrived)) {
      newErrors.arrived = "Số điện thoại chỉ được chứa chữ số";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      axios
        .post(
          "http://26.30.1.50:8080/api/v1.0/Order",
          {
            email: email,
            productList: CartItem,
            arrived: arrived,
            phone: phone,
          },
          {
            headers: {
              Authorization: "Bearer " + tokenn,
            },
          }
        )
        .then((response) => {
          alert("Do you want to buy them?");
          navigate.push(`/account`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // prodcut qty total
  return (
    <>
      <section className="cart-items">
        <div className="container d_flex container_mobile">
          <div className="cart-details">
            {CartItem.length === 0 && (
              <h1 className="no-items product">No Items are add in Cart</h1>
            )}

            {/* yasma hami le cart item lai display garaaxa */}
            {CartItem.map((item) => {
              const productQty = item.originPrice * item.quantity;

              return (
                <div className="cart-list product d_flex" key={item.id}>
                  <div className="img">
                    <img src={item.image} alt="" />
                  </div>
                  <div className="cart-details">
                    <h3>{item.productName}</h3>
                    <h4>
                      {item.originPrice}.000 đ* {item.quantity}
                      <span>{productQty}.000 đ</span>
                    </h4>
                  </div>
                  <div className="cart-items-function">
                    <div className="removeCart">
                      <button className="removeCart">
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                    <div className="cartControl d_flex">
                      <button
                        className="desCart"
                        onClick={() => decreaseQty(item)}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                      <button
                        className="incCart"
                        onClick={() => addToCart(item)}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-price"></div>
                </div>
              );
            })}
          </div>

          <div className="cart-total product">
            <h2>Hóa đơn</h2>
            <Form>
              <Form.Group
                className="mb-3 cart_input"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  onChange={handleEmailChange}
                />
                {errors.email && <p>{errors.email}</p>}
              </Form.Group>
              <Form.Group
                className="mb-3 cart_input"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập số điện thoại của bạn..."
                  onChange={handlePhoneChange}
                />
                {errors.phone && <p>{errors.phone}</p>}
              </Form.Group>
              <Form.Group
                className="mb-3 cart_input"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Người nhận</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập tên của bạn..."
                  onChange={handleArrivedChange}
                />
                {errors.arrived && <p>{errors.arrived}</p>}
              </Form.Group>
            </Form>
            <div className=" d_flex total_price">
              <h4>Tổng tiền :</h4>
              <h3>{totalPrice}.000 đ</h3>
            </div>
            <Button
              className="button_max button_mobile"
              variant="danger"
              onClick={handleBuy}
            >
              Mua ngay
            </Button>{" "}
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
