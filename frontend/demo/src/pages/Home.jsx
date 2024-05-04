var assets_path = "../assets/bright/"
if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  assets_path = "../assets/dark/"
}

import React from "react";
import phoneImage from assets_path+"logo.png";

function Home() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h6 className="text-secondary">New Launch</h6>
          <h2>Latest Phone</h2>
          <p className="text-secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <button className="btn btn-primary mt-5">Buy Now</button>
        </div>
        <div className="col-md-6">
          <img
            src={phoneImage}
            alt="Product"
            className="img-fluid product-image"
          />
          <div className="image-credits">
            Image by{" "}
            <a href="https://pixabay.com/users/openclipart-vectors-30363/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=153650">
              OpenClipart-Vectors
            </a>{" "}
            from{" "}
            <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=153650">
              Pixabay
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
