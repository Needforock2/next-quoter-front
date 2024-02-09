
"use server";
import { cookies } from "next/headers";
import { clearCookies } from "./quotations-actions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


interface ProdCookie {
  [id: string]: number;
}

 

export async function searchQuoteNmbr(id: number) {
  const quote = await fetch(
    `http://localhost:8080/api/quote?limit=5&page=1&quoteId=${id}`
  );
  return quote.json();
}

export async function handlePaginator(nextPage: number | null) {
  const quotes = await fetch(
    `http://localhost:8080/api/quote?limit=5&page=${nextPage}`
  );

  return quotes.json();
}

export async function sendQuoteToDb(qid: string) {

  const cookieStore = cookies();
  const prodListCookies = cookieStore.get("prodList");
  const customerCookie = cookieStore.get("cid")
  if (!prodListCookies || prodListCookies.value === '{}' || !customerCookie) {
    return {
      message: "please fill out all information"
    }
  }
  let prodsObject = {}
  if (prodListCookies) {
    prodsObject = JSON.parse(prodListCookies.value);
  }
  let products = []
  for (const [product_id, quantity] of Object.entries(prodsObject)) {
    products.push({ product_id, quantity })  
  }
  const postBody = {
    products,
    customer_id: JSON.parse(customerCookie.value).cid
  };
  let response
  if (qid === '') {
      response = fetch("http://localhost:8080/api/quote/", {
        method: "POST",
        body: JSON.stringify(postBody),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());
  } else if (qid !== "") {
    response = fetch(`http://localhost:8080/api/quote/${qid}`, {
      method: "PUT",
      body: JSON.stringify(postBody),
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json());
  }

  clearCookies()
  return response
}



export async function redirection(destination: string) {
  redirect(destination);
}