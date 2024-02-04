export interface Quotes {
  quotes: Quote[];
  totalPages: number;
  nextPage: number | null;
  prevPage: number | null;
}

export interface Quote {
  number: number;
  status: string;
  user: Customer[];
  customer: Customer[];
  _id: string;
  total: number;
  sortedProducts: SortedProduct[];
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  first_name: string;
  last_name: string;
}


export interface SortedProduct {
  _id: string;
  name: string;
  description: string;
  brand: string;
  code: string;
  price: number;
  pType: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  quantity: number;
}
