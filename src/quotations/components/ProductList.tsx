"use client";
import React, { useState } from "react";
import type { Product, SortedProduct } from "../quotations";
import { useRouter } from "next/navigation";

import { ProductItem } from "./ProductItem";
import { setCookie, getCookie } from "cookies-next";
import {
  removeProductFromList,
  setProdListCookie,
} from "../quotations-actions";

interface Props {
  products: Product[];
}

export const ProductList = ({ products }: Props) => {
    const router = useRouter()
  const [productList, setProductList] = useState<SortedProduct[]>([]);
  const [productQty, setProductQty] = useState([0]);

  const addOneProdItem = (product: SortedProduct) => {
    const nextNumber = productQty[productQty.length - 1] + 1;
    setProductQty((prevProdQty) => {
      return [...productQty, nextNumber];
    });
    setProductList([...productList, product]);
      setProdListCookie(product._id);
      router.refresh()
  };

  const removeProductItem = (item: number, product: Product) => {
    removeProductFromList(product._id);
    setProductQty((prevProductQty) => {
      if (prevProductQty.length > 1) {
        const updatedProductQty = [...prevProductQty];
        const indexQty = updatedProductQty.indexOf(item);
        updatedProductQty.splice(indexQty, 1);
        return updatedProductQty;
      }
      return prevProductQty;
    });
    setProductList((prevProdList) => {
      const updatedProdList = [...prevProdList];
      const indexListProd = updatedProdList.findIndex(
        (prod) => prod._id === product._id
      );
      updatedProdList.splice(indexListProd, 1);
      return updatedProdList;
    });
  };

  return (
    <>
      {productQty.map((item) => (
        <ProductItem
          key={item}
          item={item}
          products={products}
          removeProductItem={removeProductItem}
          addOneProdItem={addOneProdItem}
        />
      ))}
    </>
  );
};
