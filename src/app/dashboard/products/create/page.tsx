import ProductForm from "@/products/components/ProductForm";

import React from "react";

const emptyProd = {
  _id: "",
  name: "",
  brand: "",
  code: 0,
  stock: 0,
  description: "",
  price: 0,
  pType: "Product",
};

const CreateProduct =  () => {
  return (
    <ProductForm productToEdit={emptyProd} isEditing={false} />
  );
};

export default CreateProduct;
