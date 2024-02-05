"use client";
import React, { ChangeEvent, useState } from "react";
import type { Customer } from '../quotations';

interface Props {
  customers: Customer[] 
}


export const DropDownSearch = ({customers}: Props) => {
  const [toggle, setToggle] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [customer, setCustomer] = useState<Customer>({
    _id: "",
    first_name: "",
    last_name: "",
    mail: "",
    rut: "",
  });

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value != "") {
      setToggle(true);
      setSearchTerm(e.target.value);
    }
  };

  return (
    <div className="flex items-center justify-evenly w-full gap-2 ">
      <input
        className="w-8/12 px-4 py-2 text-gray-800 border rounded-md  border-gray-300 focus:outline-none"
        type="text"
        placeholder="Customer"
        disabled={true}
        value={customer ? customer.first_name + " " + customer.last_name : ""}
      />
      <div className="w-4/12 relative group">
        <input
          onChange={(e) => handleSearchInput(e)}
          className="px-4 py-2 text-gray-800 border rounded-md  border-gray-300 focus:outline-none"
          type="text"
          placeholder="Search Customer Name"
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
              onClick={() => {
                setCustomer(customer);
                setToggle(false);
              }}
            >
              {customer.first_name + " " + customer.last_name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
