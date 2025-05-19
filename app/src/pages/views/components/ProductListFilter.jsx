import React, { useState } from "react";
import "./styles/productListFilter.css";
import List from "./List";
import { IconContext } from "react-icons";
import { FaQrcode } from "react-icons/fa";

function ProductListFilter({
  products = [],
  chargeQR = false,
  QRfunction = () => {},
  funFill = () => true,
  productClick = () => {},
}) {
  const [filteredProducts, setFilteredProducts] = useState(
    products.filter(funFill)
  );

  const chargeQRbutton = () => {
    if (chargeQR) {
      return (
        <button onClick={QRfunction}>
          <IconContext.Provider value={{ size: "0.5em" }}>
            <FaQrcode />
          </IconContext.Provider>
        </button>
      );
    }

    return "";
  };

  const inputHasChanged = (e) => {
    const search = e.target.value.trim().toLowerCase();
    setFilteredProducts(products.filter((pr) => pr.name.includes(search)));
  };

  return (
    <div className="productListFilter_container">
      <div className="productListFilter_inputSearch">
        <input
          onChange={inputHasChanged}
          type="text"
          placeholder="Nombre del producto"
        />
        {chargeQRbutton()}
      </div>

      <List
        list={filteredProducts.map((pr) => pr.name)}
        onClick={productClick}
      />
    </div>
  );
}

export default ProductListFilter;
