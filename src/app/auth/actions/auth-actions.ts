"use server";
import jwt from "jsonwebtoken";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";

export const getSessionServer = async () => {
  const session = await getServerSession(authOptions);
  return session;
};

export const create_token = async () => {
  const session = await getServerSession()
    if (session?.user?.email) {
      let token = jwt.sign(
        { email: session?.user?.email },
        process.env.NEXTAUTH_SECRET!,
        {
          expiresIn: 60 * 60 * 24,
        }
      );
      return token;
    } else {
        return null
 }
};
