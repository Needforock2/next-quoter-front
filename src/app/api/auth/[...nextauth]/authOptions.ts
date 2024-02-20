
import  { NextAuthOptions } from "next-auth";
import clientPromise from "@/lib/mongodb";

import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcrypt";
import { UUID } from "mongodb";

const getUser = async (email: string) => {
  const resp = await fetch(`http://localhost:8080/api/auth/user/${email}`);
  return resp.json();
};

interface User {
  name: string;
  rut?: string | UUID;
  email: string;
  image: string;
  password: string;
}
const createUser = async (data: User) => {
  const resp = await fetch("http://localhost:8080/api/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return resp.json();
};

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "usuario@todos.com",
        },
        password: { label: "Password", type: "password", placeholder: "*****" },
      },
      async authorize(credentials, req) {
        const user = await getUser(credentials!.email);

        if (user.message !== "not found") {
          const passverified = compareSync(
            credentials!.password,
            user.response.password
          );
          if (passverified) {
            return user.response;
          } else {
            return null;
          }
        } else {
          const user = await createUser({
            name: credentials!.email.split("@")[0],
            rut: new UUID(),
            email: credentials!.email,
            image: `https://ui-avatars.com/api/?name=${
              credentials!.email.split("@")[0]
            }+Doe`,
            password: credentials!.password,
          });

          return user;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },

    async jwt({ token, user, account, profile }) {
      const res = await getUser(token.email!);
      const dbUser = res.response;

      token.role = dbUser ? dbUser.role : 0;
      token.id = dbUser ? dbUser._id : "no id";

      return token;
    },

    async session({ token, session, user }) {
      if (session && session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }

      return session;
    },
  },
};
