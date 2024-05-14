"use client";
import { CancelButton } from "@/quotations/components/CancelButton";
import React, { ChangeEvent, useEffect, useState } from "react";
import { SubmitButton } from "./SubmitButton";
import { createProductDb, editProductDb } from "../actions/product-actions";
import Swal from "sweetalert2";
import { clearCookies } from "@/quotations/quotations-actions";
import { redirection } from "@/quotations/quotations-Server-actions";
import { Product } from "@/quotations/quotations";

export interface NewProduct {
  _id: string;
  name: string;
  brand: string;
  code: number;
  stock: number;
  description: string;
  price: number;
  pType: string;
}

interface Props {
  productToEdit: NewProduct;
  isEditing: boolean;
}

const ProductForm = ({ productToEdit, isEditing }: Props) => {
  const [product, setProduct] = useState<NewProduct>(productToEdit);
  const [editing, setEditing] = useState(isEditing)

  const handleClickEdit = async () => {
    try {
      const res = await editProductDb(product);

      if (!res.success) {
        Swal.fire({
          title: "Error!",
          text: res.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
      } else if (res.success) {
        Swal.fire({
          title: "Success!",
          text: res.message,
          icon: "success",
          confirmButtonText: "Cool",
        });
        redirection("/dashboard/products/");
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "There is one error",
        icon: "error",
        confirmButtonText: "Confirm",
      });
    }
  };

  const handleClickCreate = async () => {
    try {
      const res = await createProductDb(product);

      if (!res.success) {
        Swal.fire({
          title: "Error!",
          text: res.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
      } else if (res.success) {
        Swal.fire({
          title: "Success!",
          text: res.message,
          icon: "success",
          confirmButtonText: "Cool",
        });
        redirection("/dashboard/products/");
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "There is on error",
        icon: "error",
        confirmButtonText: "Confirm",
      });
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-xl text-gray-600">
            Create Product
          </h2>
          <p className="text-gray-500 mb-6"></p>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm lg:grid-cols-1">
              <div className="text-gray-600 lg:col-span-1">
                <p className="font-medium text-lg">Product Details</p>
                <p>Please fill out all the fields.</p>
              </div>

              <div className="flex items-center justify-center p-6">
                <div className="mx-auto w-full max-w-[80%]">
                  <form>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="mb-3">
                        <label className="mb-3 block text-base font-medium text-[#07074D]">
                          Product Name
                        </label>
                        <input
                          onChange={(e) => handleChange(e)}
                          type="text"
                          name="name"
                          id="name"
                          value={product.name}
                          placeholder="Name"
                          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="mb-3 block text-base font-medium text-[#07074D]">
                          Code
                        </label>
                        <input
                          onChange={(e) => handleChange(e)}
                          type="number"
                          name="code"
                          id="code"
                          value={product.code}
                          placeholder="XXXXX"
                          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="mb-3 block text-base font-medium text-[#07074D]">
                          Description
                        </label>
                        <textarea
                          onChange={(e) => handleChange(e)}
                          name="description"
                          id="description"
                          value={product.description}
                          placeholder="Type description"
                          className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        ></textarea>
                      </div>
                      <div className="mb-3">
                        <label className="mb-3 block text-base font-medium text-[#07074D]">
                          Brand
                        </label>
                        <input
                          onChange={(e) => handleChange(e)}
                          type="text"
                          name="brand"
                          id="brand"
                          placeholder="Brand"
                          value={product.brand}
                          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="mb-3 block text-base font-medium text-[#07074D]">
                          Price
                        </label>
                        <input
                          onChange={(e) => handleChange(e)}
                          type="number"
                          name="price"
                          id="price"
                          placeholder="Price"
                          value={product.price}
                          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="mb-3 block text-base font-medium text-[#07074D]">
                          Stock
                        </label>
                        <input
                          onChange={(e) => handleChange(e)}
                          type="number"
                          name="stock"
                          id="stock"
                          value={product.stock}
                          placeholder="stock"
                          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className=" flex gap-3 justify-end">
              <CancelButton module="products" />
              {!editing ? (
                <SubmitButton handleClick={handleClickCreate} />
              ) : (
                <SubmitButton handleClick={handleClickEdit} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
