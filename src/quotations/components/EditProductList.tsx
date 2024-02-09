"use client";
import React, { useState } from "react";
import type { Customer, Product, SortedProduct } from "../quotations";
import { useRouter } from "next/navigation";
import { ProductItem } from "./ProductItem";

import {
  removeProductFromList,
  setProdListCookie,
} from "../quotations-actions";

interface Props {
  products: Product[];
  quotedProds: SortedProduct[];
}

export const EditProductList = ({ products, quotedProds }: Props) => {
  const emptyProd: SortedProduct = {
    _id: "",
    name: "",
    description: "",
    brand: "",
    code: "",
    price: 0,
    pType: "",
    quantity: 0,
  };

  const router = useRouter();
  const [productList, setProductList] = useState([...quotedProds, emptyProd] || []);
  const [productQty, setProductQty] = useState([0]);

  const addOneProdItem = (product: SortedProduct) => {
    const nextNumber = productQty[productQty.length - 1] + 1;
    setProductQty((prevProdQty) => {
      return [...productQty, nextNumber];
    });
    setProductList([...productList, product]);
    setProdListCookie(product._id, 0);
    router.refresh();
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
      {productList.map((item, index) => (
        <ProductItem
          key={item._id}
          index={index}
          products={products}
          removeProductItem={removeProductItem}
          addOneProdItem={addOneProdItem}
          quotedProd={item}
        />
      ))}
    </>
  );
};
