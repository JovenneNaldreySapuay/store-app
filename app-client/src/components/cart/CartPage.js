import React from "react";

import CartItemTable from "./CartItemTable";

const CartPage = () => {
  return (
    <div
      className="container mx-auto w-full bg-white pt-3"
      style={{ minHeight: "100vh" }}
    >
      <div className="p-5 mt-2">
        <h1 className="text-center uppercase font-bold text-xl tracking-wide">
          Shopping Cart
        </h1>
      </div>

      <CartItemTable />
    </div>
  );
};

export default CartPage;
