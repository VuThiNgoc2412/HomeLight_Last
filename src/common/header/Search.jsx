import React from "react";
import logo from "../../components/assets/images/logo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

const Search = ({ CartItem }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  return (
    <>
      <section className="search">
        <div className="container c_flex">
          <div className="logo width ">
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </div>
          <div class="">
            <form class="d-flex">
              <input
                class="form-control me-1"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={handleInputChange}
              />
              <Link to={`/search/${inputValue}`}>
                <button class="btn btn-outline-primary" type="submit">
                  <i class="fa-solid fa-magnifying-glass"></i>
                </button>
              </Link>
            </form>
          </div>
          <div className="icon f_flex width">
            <div className="contact_phone">
              {/* <img src="https://www.emojiall.com/images/240/microsoft-teams/1f4de.png" alt="" className="contact_img" />
               */}
              <div className="contact_img">
                <i class="ri-phone-fill"></i>
              </div>
              <div className="contact_form">
                <div className="contact_title">Hotline hỗ trợ</div>
                <div className="contact_number">086.999.5698</div>
              </div>
            </div>
            <div className="cart">
              <Link to="/cart">
                <i className="fa fa-shopping-bag icon-circle"></i>
                <span>{CartItem.length === 0 ? "" : CartItem.length}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Search;