import { Product } from "@/quotations/quotations";
import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { deleteProduct } from "../actions/product-actions";
import Swal from "sweetalert2";
interface Props extends Product {}

const ProductItem = ({ _id, code, name, brand, price, stock }: Props) => {
    
    const handleDelete = async () => {
      const res = await deleteProduct(_id);
      if (res.message === "Product deleted") {
        Swal.fire({
          title: "Success!",
          text: res.message,
          icon: "success",
          confirmButtonText: "Cool",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "There is on error",
          icon: "error",
          confirmButtonText: "Confirm",
        });
      }
    };

  const formattedPrice = new Intl.NumberFormat("us-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
  return (
    <tr className="grid grid-cols-12">
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm col-span-1 flex items-center justify-center">
        <p className="text-gray-900 whitespace-no-wrap">{code}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm col-span-3 flex items-center justify-center">
        <p className="text-gray-900 whitespace-no-wrap">{name}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm col-span-3 flex items-center justify-center">
        <p className="text-gray-900 whitespace-no-wrap">{brand}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm col-span-2 flex items-center justify-center">
        <p className="text-gray-900 whitespace-no-wrap">{formattedPrice}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm col-span-2 flex items-center justify-center">
        <p className="text-gray-900 whitespace-no-wrap">{stock}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm col-span-1 flex items-center justify-center">
        <div className="flex items-center justify-center gap-4">
          <div>
            <AiOutlineEdit size={20} className="hover:cursor-pointer icon " />
            <div className="tooltip-hidden absolute z-50 whitespace-normal break-words rounded-lg border bg-slate-100 py-1.5 px-3 font-sans text-sm font-normal  focus:outline-none">
              Edit
            </div>
          </div>
          <div>
            <AiOutlineDelete size={20} className="hover:cursor-pointer icon" onClick={()=>handleDelete()} />
            <div className="tooltip-hidden absolute z-50 whitespace-normal break-words rounded-lg border bg-slate-100 py-1.5 px-3 font-sans text-sm font-normal  focus:outline-none">
              Delete
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default ProductItem;
