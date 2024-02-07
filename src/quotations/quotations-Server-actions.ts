
"use server";

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
