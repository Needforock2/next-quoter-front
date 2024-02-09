import React from "react";
import { DropDownSearch } from "./DropDownSearch";
import { ProductList } from "./ProductList";
import { Customer, Product, Quote, SortedProduct } from "../quotations";
import { CreateQuoteButton } from "./CreateQuoteButton";
import { cookies } from "next/headers";
import { clearCookies } from "../quotations-actions";
import { EditProductList } from "./EditProductList";

const getCustomers = async (): Promise<Customer[]> => {
  const resp = await fetch("http://localhost:8080/api/customer/");
  return resp.json();
};
const getProducts = async (): Promise<Product[]> => {
  const resp = await fetch("http://localhost:8080/api/product");
  return resp.json();
};

interface Props{
  quotation: Quote
}
export const EditQuoteForm = async ({quotation}: Props) => {

  const quoteCustomer: Customer[] = quotation.customer
  const quoteProducts: SortedProduct[] = quotation.sortedProducts

  const customers = await getCustomers();
  const products = await getProducts();

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-xl text-gray-600">
            Edit Quotation
          </h2>
          <p className="text-gray-500 mb-6"></p>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm lg:grid-cols-1">
              <div className="text-gray-600 lg:col-span-1">
                <p className="font-medium text-lg">Quotation Details</p>
                <p>Please fill out all the fields.</p>
              </div>

              <div className="lg:col-span-2">
                <div className="text-sm ">
                  <div className="">
                    <DropDownSearch customers={customers} quotedCustomer={quoteCustomer[0]} />
                  </div>
                </div>
                <EditProductList products={products} quotedProds={quoteProducts} />
              </div>
            </div>
            <CreateQuoteButton qid={quotation._id}/>
          </div>
        </div>
      </div>
    </div>
  );
};
