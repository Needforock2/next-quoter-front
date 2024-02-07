import { CreateQuoteForm } from '@/quotations/components/CreateQuoteForm'
import React from 'react'
import { cookies } from "next/headers";

export const metadata = {
  title: "New Quotation",
  description: "New Quotation",
};

function CreateQuotations() {
   const cookieStore = cookies();
  const prodList = cookieStore.get("prodList");
  console.log(prodList);
  return (

    <CreateQuoteForm/>
    

  )
}

export default CreateQuotations