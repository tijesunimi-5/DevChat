import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import { NextAuthOptions } from 'next-auth'

// Define auth options
const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.picture = user.image
        token.firstName = user.name?.split(' ')[0] || ''
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user = {
          name: token.name as string,
          email: token.email as string,
          image: token.picture as string,
        }
      }
      return session
    },
    async signIn({ user, account }) {
      if (account?.provider === 'google' || account?.provider === 'github') {
        return true
      }
      return false
    },
    async redirect({ url, baseUrl }) {
      if (url.includes('profileSetup')) {
        return `${baseUrl}/Registration/profileSetup`
      }
      // Cannot access localStorage here; rely on client-side UserContext
      return `${baseUrl}/Registration/profileSetup`
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/Registration/login',
    error: '/Registration/error',
  },
}

// Create NextAuth handler for App Router
const handler = NextAuth(authOptions)

// Export HTTP methods
export { handler as GET, handler as POST }