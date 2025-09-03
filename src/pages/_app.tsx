import type { AppProps } from "next/app";
import "/public/styles/admin-style.css";
import "/public/styles/fontawesome/all.min.css";
import "/public/styles/style.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
