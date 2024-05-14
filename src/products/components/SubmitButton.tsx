import React from "react";


interface Props {
    handleClick(): void
}

export const SubmitButton =  ({handleClick}: Props) => {
  
  return (
    <div className="md:col-span-5 text-right mt-10">
      <div className="inline-flex items-end">
        <button
          onClick={() => handleClick()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
};
