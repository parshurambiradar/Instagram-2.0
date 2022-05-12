import { getProviders, signIn as SignIntoProviders } from 'next-auth/react'
import Head from 'next/head'
import Header from '../../components/Header'
// browser..
const signIn = ({ providers }) => {
  console.log(providers.google)

  return (
    <>
      <Head>
        <title>INSTAGRAM 2.0</title>
        <link rel="icon" href="/images/instagram_logo.png" />
      </Head>
      <Header />
      <div className="-mt-20 flex min-h-screen flex-col items-center justify-center py-2 px-14 text-center">
        <img
          className=" w-80 object-contain"
          src="/images/instagram_title_logo.png"
          alt=""
        />
        <p className="font-xs italic">
          This is not a Real App, It is built for educational purposes only.
        </p>
        <div className="mt-20">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="rounded-lg bg-blue-500 p-3 text-white"
                onClick={() =>
                  SignIntoProviders(provider.id, { callbackUrl: '/' })
                }
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default signIn
//server side
export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}
