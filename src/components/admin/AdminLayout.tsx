import Head from "next/head";
import { ReactNode, FC } from "react";
import Image from "next/image";
import Link from "next/link";

interface LayoutProps {
	children: ReactNode;
}

const AdminLayout: FC<LayoutProps> = ({ children }) => {




  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Admin Panel - Kolpinghaus</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="body-header1">

        {/* HEADER */}
        <header id="header-1">
          <div className="headerWrap-1">
            <nav className="navbar-1">
              {/* TOP LEFT PAGE TEXT  */}
              <div className="top-location">
                <span className="info-txt">Kolpinghaus</span>
                <span className="info-txt">Admin Panel</span>
              </div>
              {/* TOP RIGHT PAGE TEXT  */}
              <div className="book-now">
                <Link href="/" className="info-txt">
									Zur Webseite
                </Link>
              </div>

              <div className="nav-content-1">
                {/* LOGO */}
                <div className="logo-1">
                  <Link href="/admin">
                    <Image
                      className="img-fluid"
                      src="/img/logo/kolpinghaus.svg"
                      alt="logo"
                      width={150}
                      height={50}
                    />
                  </Link>
                </div>
                {/* MENU */}
                <div className="nav-holder nav-holder-1 nav-holder-desktop">
                </div>
                {/* /MENU */}
              </div>
            </nav>
          </div>
          {/*headerWrap*/}
        </header>
        {/* /HEADER */}

        <main>{children}</main>

        {/* FOOTER */}
        <footer>
          <div className="container">
            {/* FOOTER COPYRIGHT */}
            <div className="copyright">
							Copyright &copy; {new Date().getFullYear()},{" "}
              <a
                href="https://tourism-software.solutions"
                rel="noreferrer"
                target="_blank"
              >
								TSS
              </a>
            </div>
            {/* /FOOTER COPYRIGHT */}

            {/* FOOTER SCROLL UP */}
            <div className="scrollup">
              <a className="scrolltop" href="#">
                <i className="fas fa-chevron-up"></i>
              </a>
            </div>
            {/* /FOOTER SCROLL UP */}
          </div>
          {/*container*/}
        </footer>
        {/* /FOOTER */}
      </div>
    </>
  );
};
export default AdminLayout;
