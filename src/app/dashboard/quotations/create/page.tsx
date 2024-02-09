import { CreateQuoteForm } from '@/quotations/components/CreateQuoteForm'
import React from 'react'
import { cookies } from "next/headers";

export const metadata = {
  title: "New Quotation",
  description: "New Quotation",
};

function CreateQuotations() {

  return (
    <CreateQuoteForm/>   

  )
}

export default CreateQuotations