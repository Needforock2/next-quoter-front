import React, { ChangeEvent } from 'react'
import { redirect } from "next/navigation";
import Link from 'next/link';

interface Props {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleSubmit: () => {};
  module: string
}

export const CreateFilterBar = ({handleChange, handleSubmit, module}: Props) => {
  return (
    <div className=" flex items-center justify-between pb-6">
      <div>
        <h2 className="text-gray-600 font-semibold">{module}</h2>
        <span className="text-xs">All {module} items</span>
      </div>
      <div className="flex bg-gray-50 items-center p-2 rounded-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
        <input
          onChange={(e) => handleChange(e)}
          onKeyPress={handleSubmit}
          className="bg-gray-50 outline-none ml-1 block "
          type="text"
          name=""
          id=""
          placeholder={module === 'Quotations'?"Quote Id...": "Product Name"}
        />
      </div>
      <div className="lg:ml-40 ml-10 space-x-8">
        <Link
          href={`/dashboard/${module.toLowerCase()}/create`}
          className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
        >
          New {module}
        </Link>

      </div>
    </div>
  );
}
