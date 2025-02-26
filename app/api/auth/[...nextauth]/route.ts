import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();
const secret = process.env.NEXTAUTH_SECRET;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Authorizing user with credentials:", credentials);
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });
        // console.log("User found:", user);
        if (
          user &&
          credentials?.password &&
          (await bcrypt.compare(credentials.password, user.password))
        ) {
          console.log("Password match, returning user:", user);
          return { id: user.id, email: user.email, name: user.name };
        } else {
          // console.log("Authorization failed");
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // console.log("JWT callback:", { token, user, account });
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // console.log("Session callback:", { session, token });
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  secret,
  debug: true,
};

interface AuthRequest extends NextApiRequest {
  body: {
    email: string;
    password: string;
  };
}

interface AuthResponse extends NextApiResponse {}

export const GET = async (req: AuthRequest, res: AuthResponse) => {
  return NextAuth(req, res, authOptions);
};

interface PostRequest extends NextApiRequest {
  body: {
    email: string;
    password: string;
  };
}

interface PostResponse extends NextApiResponse {}

export const POST = async (req: PostRequest, res: PostResponse) => {
  return NextAuth(req, res, authOptions);
};

export default NextAuth(authOptions);
