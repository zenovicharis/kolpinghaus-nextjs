import type { AppProps } from 'next/app';
import '../styles/admin-style.css';
import '../styles/fontawesome/all.min.css';
import '/public/template/style.css';


function MyApp({ Component, pageProps }: AppProps) {
  return (
      <Component {...pageProps} />
  );
}

export default MyApp;