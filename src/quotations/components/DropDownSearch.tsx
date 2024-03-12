"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import type { Customer } from "../quotations";
import { clearCookies, setCidCookie } from "../quotations-actions";

interface Props {
  customers: Customer[];
  quotedCustomer?: Customer;
}

export const DropDownSearch = ({ customers, quotedCustomer }: Props) => {
  const [toggle, setToggle] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [customer, setCustomer] = useState<Customer>(
    quotedCustomer || {
      _id: "",
      first_name: "",
      last_name: "",
      mail: "",
      rut: "",
      image: "",
    }
  );

  useEffect(() => {
    clearCookies();
    customer._id !== "" && setCidCookie(customer._id);
  }, []);

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value != "") {
      setToggle(true);
      setSearchTerm(e.target.value);
    }
  };

  const handleClick = (serachedCustomer: Customer) => {
    setCidCookie(serachedCustomer._id);
    setCustomer(serachedCustomer);
    setToggle(false);
  };
  return (
    <div className="grid gap-2 p-2 lg:grid-cols-5 md:grid-cols-1">
      <div className="col-span-2 col-start-3 flex flex-col gap-2">
        <div className=" flex flex-col">
          <label className="w-2/12">Customer</label>

          <input
            className=" px-4 py-2 text-gray-800 border rounded-md  border-gray-300 focus:outline-none"
            type="text"
            placeholder="Customer"
            disabled={true}
            value={
              customer ? customer.first_name + " " + customer.last_name : ""
            }
          />
        </div>
        <div className=" flex flex-col">
          <label className="w-2/12">Email</label>
          <input
            className=" px-4 py-2 text-gray-800 border rounded-md  border-gray-300 focus:outline-none"
            type="text"
            placeholder="Email"
            disabled={true}
            value={customer ? customer.mail : ""}
          />
        </div>
        <div className=" flex flex-col">
          <label className="w-2/12">RUT</label>

          <input
            className="px-4 py-2 text-gray-800 border rounded-md  border-gray-300 focus:outline-none"
            type="text"
            placeholder="RUT"
            disabled={true}
            value={customer ? customer.rut : ""}
          />
        </div>
      </div>

      <div className="col-span-1 col-start-5 relative group flex flex-col">
        <label className="w-2/12">Search:</label>
        <input
          onChange={(e) => handleSearchInput(e)}
          className="px-4 py-2 max-w-full text-gray-800 border rounded-md  border-gray-300 focus:outline-none"
          type="text"
          placeholder="Customer Name"
        />
        <div
          id="dropdown-menu"
          className={`${
            !toggle ? "hidden" : ""
          } absolute left-0 min-w-full mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1`}
        >
          {customers.map((customer) => (
            <a
              className={`${
                (customer.first_name + " " + customer.last_name).includes(
                  searchTerm
                )
                  ? "block"
                  : "hidden"
              } px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md`}
              key={customer.first_name + " " + customer.last_name}
              onClick={() => handleClick(customer)}
            >
              {customer.first_name + " " + customer.last_name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
