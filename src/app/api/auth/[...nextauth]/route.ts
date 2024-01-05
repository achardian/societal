import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";

import db from "@/lib/db";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Credentials({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials, req) {
        const user = await db.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!user) throw new Error("Email has not been registered");

        const comparePassword = await bcrypt.compare(
          credentials?.password as string,
          user.password as string
        );

        if (!comparePassword) throw new Error("Password is wrong");

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          username: user.username as string,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session }) {
      const user = await db.user.findUnique({
        where: {
          email: session?.user?.email as string,
        },
      });

      if (!user?.username) {
        const updateUsername = await db.user.update({
          where: {
            email: user?.email as string,
          },
          data: {
            username: user?.email?.split("@")[0],
          },
        });
      }

      session.user.id = user?.id as string;
      session.user.username =
        (user?.username as string) || (user?.email?.split("@")[0] as string);

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  pages: {
    signIn: "/signin",
  },
};

const handleAuth = NextAuth(authOptions);

export { handleAuth as GET, handleAuth as POST };
