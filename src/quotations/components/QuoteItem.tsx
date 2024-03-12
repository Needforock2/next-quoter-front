import Image from "next/image";
import React, { useState } from "react";
import type { Quote } from "../quotations";

import {
  AiOutlineCheck,
  AiOutlineCheckSquare,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import {
  approveQuote,
  disApproveQuote,
  handleDeleteQuote,
  redirection,
} from "../quotations-Server-actions";
import Swal from "sweetalert2";
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";

interface Props extends Quote {}

export const QuoteItem = ({
  customer,
  status,
  createdAt,
  total,
  number,
  _id,
}: Props) => {
  const handleEdit = (qid: string) => {
    redirection(`/dashboard/quotations/edit/${qid}`);
  };

  const handleDelete = async () => {
    const res = await handleDeleteQuote(_id);

    if (res.message === "Quote deleted") {
      Swal.fire({
        title: "Success!",
        text: res.message,
        icon: "success",
        confirmButtonText: "Cool",
      });
      // redirection(`/dashboard`);
    } else {
      Swal.fire({
        title: "Error!",
        text: "There is on error",
        icon: "error",
        confirmButtonText: "Confirm",
      });
    }
  };

  const handleApprove = async () => {
    Swal.fire({
      title: "Warning!",
      text: "Do you want to Approve this Quote?",
      icon: "warning",
      confirmButtonText: "Confirm",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const res = approveQuote(_id);
      }
    });
  };

  const handleDisapprove = async () => {
    Swal.fire({
      title: "Warning!",
      text: "Do you want to Disapprove this Quote?",
      icon: "warning",
      confirmButtonText: "Confirm",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const res = disApproveQuote(_id);
      }
    });
  };
  const date = new Date(createdAt);
  const fullDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;
  const formattedPrice = new Intl.NumberFormat("us-US", {
    style: "currency",
    currency: "USD",
  }).format(total);
  return (
    <tr className="grid grid-cols-12">
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm col-span-1 flex items-center justify-center">
        <p className="text-gray-900 whitespace-no-wrap">{number}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm col-span-2 flex items-center justify-center">
        <p className="text-gray-900 whitespace-no-wrap">{fullDate}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center col-span-3 ">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-10 h-10">
            <Image
              className="w-full h-full rounded-full"
              src={customer[0].image}
              alt=""
              width={30}
              height={30}
            />
          </div>
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">
              {customer[0].first_name + " " + customer[0].last_name}
            </p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm col-span-3 flex items-center justify-center">
        <p className="text-gray-900 whitespace-no-wrap">{formattedPrice}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm col-span-2 flex items-center justify-center">
        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
          <span
            aria-hidden
            className={`absolute inset-0  opacity-50 rounded-full ${
              status === "Approved" ? "bg-green-200 " : "bg-red-400"
            }`}
          ></span>
          <span className="relative">{status}</span>
        </span>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm col-span-1 flex items-center justify-center">
        <div className="flex items-center justify-center gap-4">
          <div>
            <AiOutlineEdit
              onClick={() => handleEdit(_id)}
              size={20}
              className="hover:cursor-pointer icon "
            />
            <div className="tooltip-hidden absolute z-50 whitespace-normal break-words rounded-lg border bg-slate-100 py-1.5 px-3 font-sans text-sm font-normal  focus:outline-none">
              Edit
            </div>
          </div>
          <div>
            <AiOutlineDelete
              onClick={() => handleDelete()}
              size={20}
              className="hover:cursor-pointer icon"
            />
            <div className="tooltip-hidden absolute z-50 whitespace-normal break-words rounded-lg border bg-slate-100 py-1.5 px-3 font-sans text-sm font-normal  focus:outline-none">
              Delete
            </div>
          </div>
          {status === "Pending" ? (
            <div>
              <MdOutlineCheckBoxOutlineBlank
                size={20}
                onClick={() => handleApprove()}
                className="hover:cursor-pointer icon"
              />
              <div className="tooltip-hidden absolute z-50 whitespace-normal break-words rounded-lg border bg-slate-100 py-1.5 px-3 font-sans text-sm font-normal  focus:outline-none">
                Approve
              </div>
            </div>
          ) : (
            <div>
              <MdOutlineCheckBox
                size={20}
                className="hover:cursor-pointer icon"
                onClick={() => handleDisapprove()}
              />
              <div className="tooltip-hidden absolute right-6 z-50 whitespace-normal break-words rounded-lg border bg-slate-100 py-1.5 px-3 font-sans text-sm font-normal  focus:outline-none">
                Dissaprove
              </div>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};
