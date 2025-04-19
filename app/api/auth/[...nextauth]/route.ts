import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
  async jwt({ token, user, account }) {
    if (user) {
      console.log("User from Google:", user); // Debug here
      token.name = user.name;
      token.email = user.email;
      token.picture = user.image;
    }
    return token;
  },
  async session({ session, token }) {
    console.log("Session callback - token:", token); // Debug here
    session.user = {
      name: token.name as string,
      email: token.email as string,
      image: token.picture as string,
    };
    return session;
  },
},

};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
