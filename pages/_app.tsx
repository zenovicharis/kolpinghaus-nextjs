import type { AppProps } from 'next/app';
import '/public/template/css/bootstrap/css/bootstrap.min.css';
import '/public/template/css/fontawesome/css/font-awesome.min.css';
import '/public/template/style.css';


function MyApp({ Component, pageProps }: AppProps) {
  return (
      <Component {...pageProps} />
  );
}

export default MyApp;