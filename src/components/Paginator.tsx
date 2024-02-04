import React from 'react'

interface Props{
    handlePagine: (page: number | null) => {}
    prevPage: number |null
    nextPage: number | null
    totalPages: number
}

export function Paginator({handlePagine, prevPage, nextPage, totalPages}: Props) {
  return (
    <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
      <span className="text-xs xs:text-sm text-gray-900">
              Showing {nextPage ? nextPage-1 : prevPage ? prevPage +1 : 1} of {totalPages} Pages
      </span>
      <div className="inline-flex mt-2 xs:mt-0">
        <button
          disabled={prevPage ? false : true}
          onClick={() => handlePagine(prevPage)}
          className={`text-sm text-indigo-50 transition duration-150  ${
            prevPage ? "bg-indigo-600 hover:bg-indigo-500 " : "bg-gray-500"
          } font-semibold py-2 px-4 rounded-l`}
        >
          Prev
        </button>
        &nbsp; &nbsp;
        <button
          onClick={() => handlePagine(nextPage)}
          disabled={nextPage ? false : true}
          className={`text-sm text-indigo-50 transition duration-150 ${
            nextPage ? "bg-indigo-600 hover:bg-indigo-500 " : "bg-gray-500"
          } font-semibold py-2 px-4 rounded-r`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
