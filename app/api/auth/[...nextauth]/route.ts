import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import { NextAuthOptions } from 'next-auth'

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
      console.log('Session callback:', session)
      return session
    },
    async signIn({ user, account }) {
      try {
        if (account?.provider === 'google' || account?.provider === 'github') {
          console.log('SignIn success:', { user, account })
          return true
        }
        console.error('SignIn failed: Unsupported provider', account?.provider)
        return false
      } catch (error) {
        console.error('SignIn error:', error)
        return false
      }
    },
    async redirect({ url, baseUrl }) {
      try {
        console.log('Redirect:', { url, baseUrl })
        if (url.includes('profileSetup')) {
          return `${baseUrl}/Registration/profileSetup`
        }
        return `${baseUrl}/Registration/profileSetup`
      } catch (error) {
        console.error('Redirect error:', error)
        return `${baseUrl}/Registration/login`
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/Registration/login',
    error: '/Registration/error',
  },
  debug: process.env.NODE_ENV === 'development',
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }