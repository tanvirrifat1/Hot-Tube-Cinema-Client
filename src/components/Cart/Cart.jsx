import React from "react";
import "./Cart.scss";
import logo from "../../assets/img/hot.png";
import ContentWrapper from "../contentWrapper/ContentWrapper";

const Cart = () => {
  return (
    <div>
      <ContentWrapper>
        <div class="CardBody">
          <img src={logo} alt="Example Image" class="card-images" />
          <div class="card-content">
            <h2 class="card-title">Card Title</h2>
            <p class="card-text">This is a simple card with an image.</p>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Cart;
