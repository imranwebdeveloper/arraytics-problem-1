import React from "react";
// Modified this line to use React.memo for preventing unnecessary re-renders
const ProductList = React.memo(({ products }) => {
  console.log("ProductList rendered");

  return (
    <ul>
      {products?.map((product) => (
        <li key={product.id}>
          {/* Modified this line  */}
          {`${product.name} - $${product.price}`}
        </li>
      ))}
    </ul>
  );
});

export default ProductList;
