import '../styles/globals.css'
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { useEffect } from "react"
import { notify } from '../lib/utils/notifications'


const publicPages = [];

function MyApp({ Component, pageProps }) {

  const { pathname } = useRouter();

  // Check if the current route matches a public page
  const isPublicPage = publicPages.includes(pathname);

  useEffect(() => {
    window.OneSignal = window.OneSignal || [];
    OneSignal.push(function() {
      OneSignal.init({
        appId: "69a7f78d-c60a-400b-b92d-5ddaccbc6637",
        safari_web_id: "web.onesignal.auto.58b504fd-a471-4836-bd65-020899577e4e",
        notifyButton: {
          enable: true,
        },
        allowLocalhostAsSecureOrigin: true,
      });
    });

    // notify()

    return () => {
        window.OneSignal = undefined;
    };
  }, []); // <-- run this effect once on mount

  return (
    <ClerkProvider>
      {isPublicPage ? (
        <Component {...pageProps} />
      ) : (
        <>
          <SignedIn>
            <Component {...pageProps} />
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </>
      )}
    </ClerkProvider>
  )
}

export default MyApp
