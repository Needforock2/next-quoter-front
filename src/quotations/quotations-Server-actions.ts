"use server";
import { cookies } from "next/headers";
import { clearCookies } from "./quotations-actions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { create_token } from "@/app/auth/actions/auth-actions";
import { Quote } from "./quotations";


interface ProdCookie {
  [id: string]: number;
}

export async function searchQuoteNmbr(id: number) {
  const authToken = await create_token();
  const quote = await fetch(
    `http://localhost:8080/api/quote?limit=5&page=1&quoteId=${id}`,
    {
      headers: {
        Authorization: authToken!,
      },
    }
  );
  return quote.json();
}
export async function searchQuoteId(qid: string): Promise<Quote> {
  const authToken = await create_token();
  const quote = await fetch(
    `http://localhost:8080/api/quote/${qid}`,
    {
      headers: {
        Authorization: authToken!,
      },
    }
  );
  return quote.json();
}

export async function handlePaginator(nextPage: number | null, route: string) {

  const authToken = await create_token();
  const quotes = await fetch(
    `http://localhost:8080/api/${route}?limit=5&page=${nextPage}`,
    {
      headers: {
        Authorization: authToken!,
      },
    }
  );

  return quotes.json();
}

export async function handleDeleteQuote(qid: string) {
  const authToken = await create_token();
  const response = await fetch(`http://localhost:8080/api/quote/${qid}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", Authorization: authToken! },
  });
  revalidatePath("/dashboard/quotations");

  return response.json();
}

export async function sendQuoteToDb(qid: string) {
  const authToken = await create_token();
  const cookieStore = cookies();
  const prodListCookies = cookieStore.get("prodList");
  const customerCookie = cookieStore.get("cid");
  if (!prodListCookies || prodListCookies.value === "{}" || !customerCookie) {
    return {
      message: "please fill out all information",
    };
  }
  let prodsObject = {};
  if (prodListCookies) {
    prodsObject = JSON.parse(prodListCookies.value);
  }
  let products = [];
  for (const [product_id, quantity] of Object.entries(prodsObject)) {
    products.push({ product_id, quantity });
  }
  const postBody = {
    products,
    customer_id: JSON.parse(customerCookie.value).cid,
  };
  let response;
  if (qid === "") {
    response = fetch("http://localhost:8080/api/quote/", {
      method: "POST",
      body: JSON.stringify(postBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken!,
      },
    }).then((res) => res.json());
  } else if (qid !== "") {
    response = fetch(`http://localhost:8080/api/quote/${qid}`, {
      method: "PUT",
      body: JSON.stringify(postBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken!,
      },
    }).then((res) => res.json());
  }

  clearCookies();
  return response;
}

export async function approveQuote(qid: string) {
  const authToken = await create_token();
  const body = {
    status: "Approved",
  };
  const response = fetch(`http://localhost:8080/api/quote/${qid}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json", Authorization: authToken! },
  }).then((res) => res.json());
  clearCookies();
  revalidatePath("/dashboard/quotations");
  return response;
}
export async function disApproveQuote(qid: string) {
  const authToken = await create_token();
  const body = {
    status: "Pending",
  };
  const response = fetch(`http://localhost:8080/api/quote/${qid}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json", Authorization: authToken! },
  }).then((res) => res.json());
  clearCookies();
  revalidatePath("/dashboard/quotations");
  return response;
}

export async function redirection(destination: string) {
  redirect(destination);
}



export async function refresh() {}
