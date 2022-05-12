import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  // theme: {
  //   logo: '/images/instagram_logo.png',
  //   brandColor: '#F13287',
  //   colorScheme: 'auto',
  // },
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async session({ session: sessions, token, user }) {
      return {
        ...sessions,
        user: {
          ...sessions.user,
          username: sessions.user?.name
            ?.split(' ')
            .join('')
            .toLocaleLowerCase(),
          uid: token.sub,
        },
      }
    },
  },
})
