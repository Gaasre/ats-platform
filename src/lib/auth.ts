import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import { omit } from "lodash";

const authOptions: NextAuthOptions = {
  // Secret for Next-auth, without this JWT encryption/decryption won't work
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        if (!credentials)
          throw new Error("User with the provided credentials not found");
        // Add logic here to look up the user from the credentials supplied
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (!user)
          throw new Error("User with the provided credentials not found");

        if (!user.passwordHash) throw new Error("No password");

        const checkPassword = await compare(
          credentials.password,
          user.passwordHash
        );
        if (checkPassword) {
          return omit(user, ["passwordHash"]);
        }

        throw new Error("User with the provided credentials not found");
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: async ({ session, token }) => {
      const dbUser = await prisma.user.findFirst({
        where: {
          id: token.id,
        },
        select: {
          id: true,
          name: true,
          email: true,
          companyId: true,
          Company: true,
        },
      });

      if (!dbUser) return session;

      session.user.companyId = dbUser.companyId;
      session.user.Company = dbUser.Company;
      session.user.id = dbUser.id;

      return session;
    },
    jwt: ({ token, user }) => {
      if (user) {
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },
  },
};

export { authOptions };
