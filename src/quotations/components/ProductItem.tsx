"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import type { Customer, Product, SortedProduct } from "../quotations";
import { Counter } from "./Counter";
import { useRouter } from "next/navigation";

import { IoTrashSharp } from "react-icons/io5";
import {
  removeOneItemFromList,
  setProdListCookie,
} from "../quotations-actions";

interface Props {
  products: Product[];
  addOneProdItem: (prod: SortedProduct) => void;
  removeProductItem: (item: number, prod: Product) => void;
  quotedProd?: SortedProduct;
  index: number;
  sumarProd: (value: SortedProduct) => void;
}

export const ProductItem = ({
  products,
  addOneProdItem,
  removeProductItem,
  quotedProd,
  index,
  sumarProd,
}: Props) => {
  const router = useRouter();
  const [qty, setQty] = useState((quotedProd && quotedProd.quantity) || 0);
  const [toggle, setToggle] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [product, setProduct] = useState<Product>(
    quotedProd || {
      _id: "",
      name: "",
      description: "",
      brand: "",
      code: 0,
      price: 0,
      stock: 0,
      pType: "",
    }
  );

  useEffect(() => {
    if (quotedProd) {
      setProduct(quotedProd);
      setProdListCookie(quotedProd._id, quotedProd.quantity);
    }
  }, [quotedProd]);

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value != "") {
      setToggle(true);
      setSearchTerm(e.target.value);
    }
  };

  const handleClick = (searchedProduct: Product) => {
    if (searchedProduct !== product) {
      // Comprueba si el producto seleccionado es diferente al producto actual
      setProduct(searchedProduct);
      const sortedProd: SortedProduct = {
        ...searchedProduct,
        quantity: 1,
      };
      addOneProdItem(sortedProd);
      setQty(1);
      setToggle(false);
    }
  };

  const addQty = () => {
    setQty(qty + 1);
    const sortedProd: SortedProduct = {
      ...product,
      quantity: qty + 1,
    };
    sumarProd(sortedProd);
    if (product._id) {
      setProdListCookie(product._id, 0);
      router.refresh();
    }
  };

  const removeQty = () => {
    if (qty > 0 && product._id) {
      setQty(qty - 1);
      const sortedProd: SortedProduct = {
        ...product,
        quantity: qty - 1,
      };
      sumarProd(sortedProd);
      removeOneItemFromList(product._id);
      router.refresh();
    }
  };

  const onRemoveProdItem = (item: number, product: Product) => {
    removeProductItem(item, product);
    router.refresh();
  };

  return (
    <div className="grid gap-2 p-2 md:grid-cols-1">
      <div className="col-span-2 grid lg:grid-cols-12 gap-4 ">
        {/* product */}
        <div className=" flex flex-col col-span-3">
          <label className="w-2/12">Product</label>
          <input
            className=" px-4 py-2 text-gray-800 border rounded-md  border-gray-300 focus:outline-none"
            type="text"
            placeholder="Customer"
            disabled={true}
            value={product ? product.brand + " " + product.name : ""}
          />
        </div>
        {/* counter */}
        <div className="col-span-1  max-w-full">
          <Counter
            quantity={qty}
            prodId={product._id}
            addQty={() => addQty()}
            removeQty={() => removeQty()}
            setQty={(numer) => setQty(numer)}
          />
        </div>
        {/* search */}
        <div className="col-span-2 relative group">
          <label className="w-2/12">Search:</label>
          <input
            onChange={(e) => handleSearchInput(e)}
            className="px-4 py-2 max-w-full text-gray-800 border rounded-md  border-gray-300 focus:outline-none"
            type="text"
            placeholder="Search Product"
          />
          {/* dropdown */}
          <div
            id="dropdown-menu"
            className={`${
              !toggle ? "hidden" : ""
            } absolute left-0 min-w-[10%] mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1 z-10`}
          >
            {products.map((product) => (
              <a
                className={`${
                  product.brand.includes(searchTerm) ||
                  product.name.includes(searchTerm) ||
                  product.description.includes(searchTerm)
                    ? "block"
                    : "hidden"
                } px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md`}
                key={product._id}
                onClick={() => handleClick(product)}
              >
                {product.name}
              </a>
            ))}
          </div>
        </div>
        {/* unit price */}
        <div className=" flex flex-col col-span-3">
          <label className="">Unit Price</label>
          <input
            className=" px-4 py-2 text-gray-800 border rounded-md  border-gray-300 focus:outline-none"
            type="text"
            placeholder="Customer"
            disabled={true}
            value={product ? "$ " + product.price : ""}
          />
        </div>
        {/* total price */}

        <div className=" col-span-2 flex">
          <div className=" flex flex-col ">
            <label className="">Total price</label>
            <div className="flex justify-center items-center gap-1">
              <input
                className=" px-4 py-2 max-w-full text-gray-800 border rounded-md  border-gray-300 focus:outline-none"
                type="text"
                placeholder="Customer"
                disabled={true}
                value={product ? "$ " + product.price * qty : ""}
              />
              <div
                className={
                  product && product.brand != ""
                    ? `hover:cursor-pointer`
                    : "hover:cursor-default"
                }
                onClick={() => onRemoveProdItem(index, product)}
              >
                <IoTrashSharp size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
