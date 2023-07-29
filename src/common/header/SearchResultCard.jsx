import React, { useState } from "react";
import { Link } from "react-router-dom";

const SearchResultCard = ({ shopItems, addToCart }) => {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };

  const handleLinkClick = () => {
    window.scrollTo(0, 0); // Scroll to the top of the page when the link is clicked
  };

  // if (shopItems.sale) {
  return (
    <>
      <div className="box">
        <Link to={`/productdetail/${shopItems.id}`} onClick={handleLinkClick}>
          <div className="product mtop">
            <div className="img">
              {/* <span className="discount">% Off</span> */}
              <img src={shopItems.image} alt="" />
              <div className="product-like">
                <label>{count}</label> <br />
                <i className="fa-regular fa-heart" onClick={increment}></i>
              </div>
            </div>
            <div className="product-details">
              <h3>{shopItems.productName}</h3>
              <div className="price">
                <h4>${shopItems.originPrice}.00 </h4>
                <button onClick={() => addToCart(shopItems)}>
                  <i className="fa fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
  // } else {
  //   return (
  //     <>
  //       <div className="box">
  //         <Link to={`/productdetail/${shopItems.id}`} onClick={handleLinkClick}>
  //           <div className="product mtop">
  //             <div className="img">
  //               <img src={shopItems.image} alt="" />
  //               <div className="product-like">
  //                 <label>{count}</label> <br />
  //                 <i className="fa-regular fa-heart" onClick={increment}></i>
  //               </div>
  //             </div>
  //             <div className="product-details">
  //               <h3>{shopItems.productName}</h3>
  //               <div className="price">
  //                 <h4>${shopItems.originPrice}.00 </h4>
  //                 <button onClick={() => addToCart(shopItems)}>
  //                   <i className="fa fa-plus"></i>
  //                 </button>
  //               </div>
  //             </div>
  //           </div>
  //         </Link>
  //       </div>
  //     </>
  //   );
  // }
};

export default SearchResultCard;