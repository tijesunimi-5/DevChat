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
  async jwt({ token, user }) {
      if (typeof window !== 'undefined' && user) {
        console.log("User from Google:", user); 
        localStorage.setItem('user', JSON.stringify({
          name: user.name,
          email: user.email
        }))
        token.name = user.name
        token.email = user.email
        token.picture = user.image
      }
    
    return token;
  },
  async session({ session, token }) {
    console.log("Session callback - token:", token); // Debug here

    if (typeof window !== 'undefined' ) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        session.user = {
          name: user.name,
          email: user.email,
          image: token.picture as string,
        };
      }
    }
    return session;
  },
},

};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
