import Image from "next/image";
import React from "react";
import type { Quote } from "../quotations";

interface Props extends Quote {}

export const QuoteItem = ({
  customer,
  status,
  createdAt,
  total,
  number,
}: Props) => {
  const date = new Date(createdAt);
  const fullDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
  const formattedPrice = new Intl.NumberFormat("us-US", {
    style: "currency",
    currency: "USD",
  }).format(total);
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-10 h-10">
            <Image
              className="w-full h-full rounded-full"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
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
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{formattedPrice}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{fullDate}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{number}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
          <span
            aria-hidden
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">{status}</span>
        </span>
      </td>
    </tr>
  );
};