import { searchProductById } from "@/products/actions/product-actions";
import ProductForm, { NewProduct } from "@/products/components/ProductForm";
import { Product } from "@/quotations/quotations";

import React from "react";

interface Props {
  params: { pid: string };
}
export const metadata = {
  title: "Edit Product",
  description: "Edit Product",
};

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

const EditProduct = async ({ params }: Props) => {
  const product: Product = await searchProductById(params.pid)
  let productEdit = {
      name: product.name,
      brand: product.brand,
      stock: product.stock,
      price: product.price,
      description: product.description,
      pType: product.pType,
      _id: product._id,
      code: product.code
    };
  

  
  return <ProductForm productToEdit={productEdit} isEditing={true} />;
};

export default EditProduct;
