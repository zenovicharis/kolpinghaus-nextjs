import Head from 'next/head';
import Script from 'next/script';
import { ReactNode, FC, useState, useEffect } from 'react';
import Image from 'next/image';

interface IWorkTime {
  _id: string;
  Montag: string;
  Dienstag: string;
  Mittwoch: string;
  Donnerstag: string;
  Freitag: string;
  Samstag: string;
  Sonntag: string;
}

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const [workTime, setWorkTime] = useState<IWorkTime | null>(null);

  useEffect(() => {
    async function fetchWorkTime() {
      try {
        const response = await fetch('/api/workTime');
        const data = await response.json();
        setWorkTime(data);
      } catch (error) {
        console.error("Error fetching work time:", error);
      }
    }
    fetchWorkTime();
  }, []);

  return (
  <>
    <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Restaurant im Kolpinghaus</title>
        <meta name="robots" content="noodp"/>
        {/* favicons */}
        <link rel="icon" href="/favicon.ico" />
    </Head>
  
   <div className="body-header1">
   
   {/* MOBILE MENU */}
      <div className="mask-nav-2">
      
         {/* MENU */}
         <nav className="navbar navbar-2 nav-mobile">
            <div className="nav-holder nav-holder-2">
            
               <ul id="menu-menu-2" className="menu-nav-2">
    <li className="menu-item"><a href="#about">Über uns</a></li>
    <li className="menu-item"><a href="#menu">Menü</a></li>
    <li className="menu-item"><a href="#contact">Kontakt</a></li>
    <li className="menu-item"><a href="#reservation">Reservierung</a></li>
</ul>
            </div>
         </nav>
          {/* /MENU */}
         
         {/* RIGHT SIDE */}
         <div className="rightside-nav-2">
         
            <h3>Jetzt Buchen</h3>
            <ul className="right-side-contact">
               <li><label>Adresse:</label> Weidenauer Straße 27, 57078 Siegen - Weidenau</li>
               <li><label>Telefon:</label> 0271/ 770 029 76</li>
            </ul>
            
            {/* SOCIAL ICONS */}
            <ul className="search-social search-social-2">
               <li><a className="social-facebook" href="#" target="_blank"><i className="fab fa-facebook-f"></i></a></li>
               <li><a className="social-twitter" href="#" target="_blank"><i className="fab fa-twitter"></i></a></li>
               <li><a className="social-tripadvisor" href="#" target="_blank"><i className="fab fa-tripadvisor"></i></a></li>
               <li><a className="social-pinterest" href="#" target="_blank"><i className="fab fa-pinterest"></i></a></li>
               <li><a className="social-instagram" href="#" target="_blank"><i className="fab fa-instagram"></i></a></li>
            </ul>
            {/* /SOCIAL ICONS */}
         </div>
         {/* /RIGHT SIDE */}
         
      </div>
      {/* /MOBILE MENU */}
   
      {/* HEADER */}
      <header id="header-1">
         <div className="headerWrap-1">
            <nav className="navbar-1">
               {/* TOP LEFT PAGE TEXT  */}
               <div className="top-location">
                  <span className="info-txt">Weidenauer Straße 27,</span>
                  <span className="info-txt">57078 Siegen - Weidenau</span>   
               </div>
               {/* TOP RIGHT PAGE TEXT  */}
               <div className="book-now">
                  <span className="info-txt">Jetzt Buchen</span>
                  <span className="info-txt">0271/ 770 029 76</span>   
               </div>
               
               {/* MOBILE BUTTON NAV  */}
               <div className="nav-button-holder nav-btn-mobile inactive">
                <span className="menu-txt">MENU</span>
                <button type="button" className="nav-button">
                <span className="icon-bar"></span>
                </button>
                </div>
               
               <div className="nav-content-1">
                  {/* LOGO */}
                  <div className="logo-1"><a href="index.html"><Image className="img-fluid" src="/img/Menu/Logo.png" alt="" width={200} height={50}/></a></div>
                  {/* MENU */}
                  <div className="nav-holder nav-holder-1 nav-holder-desktop">
                     <ul id="menu-menu-1" className="menu-nav menu-nav-1">
    <li className="menu-item"><a href="#about">Über uns</a></li>
    <li className="menu-item"><a href="#menu">Menü</a></li>
    <li className="menu-item"><a href="#contact">Kontakt</a></li>
    <li className="menu-item"><a href="#reservation">Reservierung</a></li>
</ul>
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
                     
            {/* ROW */}
            <div className="row alignc">
            
            {/* FOOTER COLUMN 1 */}
               <div className="col-md-4">
                  <div className="footer-content">
                     <h5>Adresse:</h5>
                     <p>Restaurant im Kolpinghaus <br/>
                        Weidenauer Straße 27, 57078 Siegen - Weidenau
                     </p>
                  </div>
               </div>
               
               {/* FOOTER COLUMN 2 */}
               <div className="col-md-4">
                  <div className="footer-content">
                     <h5>Reservierung:</h5>
                     <p>0271/ 770 029 76<br/>
                     </p>
                  </div>
               </div>
               
               {/* FOOTER COLUMN 3 */}
               <div className="col-md-4">
                  <div className="footer-content">
                     <h5>Öffnungszeiten:</h5>
                     {workTime ? (
                      <p>
                        Montag: {workTime.Montag}<br />
                        Dienstag: {workTime.Dienstag}<br />
                        Mittwoch: {workTime.Mittwoch}<br />
                        Donnerstag: {workTime.Donnerstag}<br />
                        Freitag: {workTime.Freitag}<br />
                        Samstag: {workTime.Samstag}<br />
                        Sonntag: {workTime.Sonntag}
                      </p>
                    ) : (
                      <p>Lade Öffnungszeiten...</p>
                    )}
                  </div>
               </div>
               
            </div>
            {/* /ROW */}
            
            {/* FOOTER SOCIAL */}
            <ul className="footer-social">
               <li><a className="social-facebook" href="#" target="_blank"><i className="fab fa-facebook-f"></i></a></li>
               <li><a className="social-twitter" href="#" target="_blank"><i className="fab fa-twitter"></i></a></li>
               <li><a className="social-tripadvisor" href="#" target="_blank"><i className="fab fa-tripadvisor"></i></a></li>
               <li><a className="social-pinterest" href="#" target="_blank"><i className="fab fa-pinterest"></i></a></li>
               <li><a className="social-instagram" href="#" target="_blank"><i className="fab fa-instagram"></i></a></li>
            </ul>
            {/* /FOOTER SOCIAL */}
            
            {/* FOOTER COPYRIGHT */}
            <div className="copyright">
               Copyright &copy; 2020, Dina . Designed by MatchThemes.com
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
      {/* JS */} 
      <Script src="/template/css/bootstrap/js/popper.min.js" strategy="afterInteractive" />
      <Script src="/template/css/bootstrap/js/bootstrap.min.js" strategy="afterInteractive" />
      <Script src="/template/js/jquery.easing.min.js" strategy="afterInteractive" />
      <Script src="/template/js/jquery.fitvids.js" strategy="afterInteractive" />
      <Script src="/template/js/jquery.magnific-popup.min.js" strategy="afterInteractive" />
      <Script src="/template/js/owl-carousel/owl.carousel.min.js" strategy="afterInteractive" />
      <Script src="/template/js/init.js" strategy="lazyOnload" />
   </>
);
}
export default Layout;
