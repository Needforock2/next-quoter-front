"use client";

import { CreateFilterBar } from "@/components/CreateFilterBar";
import { PagProducts, Product } from "@/quotations/quotations";
import React, { ChangeEvent, useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { Paginator } from "@/components/Paginator";
import { handlePaginator } from "@/quotations/quotations-Server-actions";
import { searchProductByName } from "../actions/product-actions";

interface Props extends PagProducts {}
const ProductList = ({ products, prevPage, nextPage, totalPages }: Props) => {
  const [productList, setProductList] = useState({
    products,
    prevPage,
    nextPage,
    totalPages,
  });
    
    const [productName, setProductName] = useState("")

  useEffect(() => {
    setProductList({ products, prevPage, nextPage, totalPages });
  }, [products, prevPage, nextPage, totalPages]);

  const handlePagine = async (page: number | null) => {
    const prodsPaginated = await handlePaginator(page, "product/options");
    setProductList(prodsPaginated);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target) {

      setProductName(e.target.value);
    }
    };

  const handleSubmit = async () => {
      const filtered = await searchProductByName(productName);
      if (filtered) {
          setProductList(
            ({ products, prevPage, nextPage, totalPages } = filtered)
          );
      }
      
  };

  return (
    <div className="bg-white p-8 rounded-md w-full ">
      <CreateFilterBar
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        module="Products"
      />
      <div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal min-h-[50vh]">
              <thead>
                <tr className="grid grid-cols-12">
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider text-center col-span-1">
                    Code
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider text-center col-span-3">
                    Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider text-center col-span-3">
                    Brand
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider text-center col-span-2">
                    Price $
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider text-center col-span-2">
                    Stock
                  </th>

                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider text-center col-span-1">
                    Options
                  </th>
                </tr>
              </thead>
              <tbody className="h-[60vh]">
                {productList?.products.map((product) => (
                  <ProductItem key={product._id} {...product} />
                ))}
              </tbody>
            </table>
            <Paginator
              handlePagine={handlePagine}
              prevPage={productList.prevPage}
              nextPage={productList.nextPage}
              totalPages={productList.totalPages}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
