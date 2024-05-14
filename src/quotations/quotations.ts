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
  _id: string;
  first_name: string;
  last_name: string;
  mail: string;
  rut: string;
  image: string;
  street?: string;
  street_number?: number;
  country?: string;
  createdAt?: Date;
  updatedAt?: Date;

}


export interface SortedProduct {
  _id: string;
  name: string;
  description: string;
  brand: string;
  code: number;
  price: number;
  pType: string;
  stock: number;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  quantity: number;
}
export interface Product {
  _id: string;
  name: string;
  description: string;
  brand: string;
  code: number;
  price: number;
  stock: number;
  pType: string;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}

export interface PagProducts {
  products: Product[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: null;
  nextPage: null;
}
