import { create_token } from "@/app/auth/actions/auth-actions";
import ProductList from "@/products/components/ProductList";
import { PagProducts, Product } from "@/quotations/quotations";
import React from "react";

export const metadata = {
  title: "Products List",
  description: "Products List",
};

const getProducts = async (): Promise<PagProducts | null> => {
  const authToken = await create_token();
  if (authToken) {
    const res = await fetch(
      "http://localhost:8080/api/product/options?limit=5&page=1",
      {
        cache: "no-store",
        headers: {
          Authorization: authToken,
        },
      }
    );
    return res.json();
  } else {
    return null;
  }
};

const Products = async () => {
  const resp = await getProducts();

  return <ProductList {...resp!} />;
};

export default Products;
