'use server'

import { create_token } from "@/app/auth/actions/auth-actions";
import { PagProducts } from "@/quotations/quotations";
import { revalidatePath } from "next/cache";

export const deleteProduct = async (pid: string) => {
    const authToken = await create_token();
    const response = await fetch(`http://localhost:8080/api/product/${pid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken!,
      },
    });
    revalidatePath("/dashboard/quotations");
    return response.json();
}

export const searchProductByName = async (name: string): Promise<PagProducts | null> => {
    const authToken = await create_token();
    if (authToken) {
      const res = await fetch(
        `http://localhost:8080/api/product/options?limit=5&page=1&name=${name}`,
        {
          cache: "no-store",
          headers: {
            Authorization: authToken,
          },
        }
      );
      return res.json();
    } else {
      return null;
    }
}