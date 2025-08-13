import Head from "next/head";
import Script from "next/script";
import { ReactNode, FC, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { scroller, Link as ScrollLink } from "react-scroll";
import { Worktime } from "../db/schema";
import { useRouter } from "next/router";

interface LayoutProps {
	children: ReactNode;
	workTime: Worktime[];
}

const Layout: FC<LayoutProps> = ({ children, workTime }) => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [showScrollTop, setShowScrollTop] = useState(false);
	const [isHeaderSticky, setIsHeaderSticky] = useState(false);
	const router = useRouter();

	const handleNavClick = (section: string) => {
		if (router.pathname === "/") {
			scroller.scrollTo(section, {
				duration: 500,
				smooth: true,
				offset: -80,
			});
		} else {
			router.push(`/#${section}`);
		}
	};

	useEffect(() => {
		if (router.asPath.includes("#")) {
			const section = router.asPath.split("#")[1];
			if (section) {
				setTimeout(() => {
					scroller.scrollTo(section, {
						duration: 500,
						smooth: true,
						offset: -80,
					});
				}, 100);
			}
		}
	}, [router.asPath]);

	useEffect(() => {
		if (isMobileMenuOpen) {
			document.body.classList.add("has-active-menu");
		} else {
			document.body.classList.remove("has-active-menu");
		}
	}, [isMobileMenuOpen]);

	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY;

			// Scroll to top button
			if (scrollY > 400) {
				setShowScrollTop(true);
			} else {
				setShowScrollTop(false);
			}

			// Sticky header
			if (scrollY > 50) {
				setIsHeaderSticky(true);
			} else {
				setIsHeaderSticky(false);
			}
		};

		window.addEventListener("scroll", handleScroll);

		// Cleanup
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false);
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	const getCurrentDayWorkTime = () => {
		if (!workTime || workTime.length === 0) return "Geschlossen";

		const days = [
			"Sonntag",
			"Montag",
			"Dienstag",
			"Mittwoch",
			"Donnerstag",
			"Freitag",
			"Samstag",
		];
		const currentDayName = days[new Date().getDay()];
		const todayWorkTime = workTime.find((wt) => wt.day === currentDayName);

		if (!todayWorkTime || !todayWorkTime.open || !todayWorkTime.close) {
			return `${currentDayName}: Geschlossen`;
		}

		const openTime = todayWorkTime.open.slice(0, 5);
		const closeTime = todayWorkTime.close.slice(0, 5);

		return `${currentDayName}: ${openTime} - ${closeTime}`;
	};

	return (
		<>
			<Head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Restaurant im Kolpinghaus</title>
				<meta name="robots" content="noodp" />
				{/* favicons */}
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="body-header1">
				{/* MOBILE MENU */}
				{isMobileMenuOpen && (
					<div className="mask-nav-2 is-active">
						{/* MENU */}
						<nav className="navbar navbar-2 nav-mobile">
							<div className="nav-holder nav-holder-2">
								<ul id="menu-menu-2" className="menu-nav-2">
									<li className="menu-item">
										<a
											href="#"
											onClick={(e) => {
												e.preventDefault();
												handleNavClick("about");
											}}
										>
											Über uns
										</a>
									</li>
									<li className="menu-item">
										<a
											href="#"
											onClick={(e) => {
												e.preventDefault();
												handleNavClick("menu");
											}}
										>
											Menü
										</a>
									</li>
									<li className="menu-item">
										<a
											href="#"
											onClick={(e) => {
												e.preventDefault();
												handleNavClick("contact");
											}}
										>
											Kontakt
										</a>
									</li>
									<li className="menu-item">
										<Link href="/reservation" onClick={closeMobileMenu}>
											Reservierung
										</Link>
									</li>
									<li className="menu-item">
										<Link href="/impressum" onClick={closeMobileMenu}>
											Impressum
										</Link>
									</li>
								</ul>
							</div>
						</nav>
						{/* /MENU */}

						{/* RIGHT SIDE */}
						<div className="rightside-nav-2">
							<h3>Jetzt Buchen</h3>
							<ul className="right-side-contact">
								<li>
									<label>Adresse:</label> Weidenauer Straße 27, 57078 Siegen -
									Weidenau
								</li>
								<li>
									<label>Telefon:</label> 0271/ 770 029 76
								</li>
							</ul>

							{/* SOCIAL ICONS */}
							<ul className="search-social search-social-2">
								<li>
									<a
										className="social-facebook"
										href="https://www.facebook.com/profile.php?id=100066660789863"
										target="_blank"
										rel="noreferrer"
									>
										<i className="fab fa-facebook-f"></i>
									</a>
								</li>
								<li>
									<a
										className="social-instagram"
										href="https://www.instagram.com/kolpinghaussiegen/"
										target="_blank"
										rel="noreferrer"
									>
										<i className="fab fa-instagram"></i>
									</a>
								</li>
							</ul>
							{/* /SOCIAL ICONS */}
						</div>
						{/* /RIGHT SIDE */}
					</div>
				)}
				{/* /MOBILE MENU */}

				{/* HEADER */}
				<header id="header-1">
					<div className="headerWrap-1">
						<nav className={`navbar-1 ${isHeaderSticky ? "nav-bkg1" : ""}`}>
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
							<div
								className={`nav-button-holder nav-btn-mobile ${
									isMobileMenuOpen ? "active" : "inactive"
								}`}
								onClick={toggleMobileMenu}
							>
								<span className="menu-txt">MENU</span>
								<button
									type="button"
									className={`nav-button ${isMobileMenuOpen ? "active" : ""}`}
								>
									<span className="icon-bar"></span>
								</button>
							</div>

							<div className="nav-content-1">
								{/* LOGO */}
								<div className="logo-1">
									<Link href="/">
										<Image
											className="img-fluid"
											src="/img/Menu/kolpinghaus.svg"
											alt=""
											width={150}
											height={50}
										/>
									</Link>
								</div>
								{/* MENU */}
								<div className="nav-holder nav-holder-1 nav-holder-desktop">
									<ul id="menu-menu-1" className="menu-nav menu-nav-1">
										<li className="menu-item">
											<a
												href="#"
												onClick={(e) => {
													e.preventDefault();
													handleNavClick("about");
												}}
											>
												Über uns
											</a>
										</li>
										<li className="menu-item">
											<a
												href="#"
												onClick={(e) => {
													e.preventDefault();
													handleNavClick("menu");
												}}
											>
												Menü
											</a>
										</li>
										<li className="menu-item">
											<a
												href="#"
												onClick={(e) => {
													e.preventDefault();
													handleNavClick("contact");
												}}
											>
												Kontakt
											</a>
										</li>
										<li className="menu-item">
											<Link href="/reservation">Reservierung</Link>
										</li>
										<li className="menu-item">
											<Link href="/impressum">Impressum</Link>
										</li>
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
									<p>
										Restaurant im Kolpinghaus <br />
										Weidenauer Straße 27, 57078 Siegen - Weidenau
									</p>
								</div>
							</div>

							{/* FOOTER COLUMN 2 */}
							<div className="col-md-4">
								<div className="footer-content">
									<h5>Reservierung:</h5>
									<p>
										0271/ 770 029 76
										<br />
									</p>
								</div>
							</div>

							{/* FOOTER COLUMN 3 */}
							<div className="col-md-4">
								<div className="footer-content">
									<h5>Öffnungszeiten:</h5>
									{workTime ? (
										<p>{getCurrentDayWorkTime()}</p>
									) : (
										<p>Lade Öffnungszeiten...</p>
									)}
								</div>
							</div>
						</div>
						{/* /ROW */}

						{/* FOOTER SOCIAL */}
						<ul className="footer-social">
							<li>
								<a
									className="social-facebook"
									href="https://www.facebook.com/profile.php?id=100066660789863"
									target="_blank"
									rel="noreferrer"
								>
									<i className="fab fa-facebook-f"></i>
								</a>
							</li>
							<li>
								<a
									className="social-instagram"
									href="https://www.instagram.com/kolpinghaussiegen/"
									target="_blank"
									rel="noreferrer"
								>
									<i className="fab fa-instagram"></i>
								</a>
							</li>
						</ul>
						{/* /FOOTER SOCIAL */}

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
						<div className={`scrollup ${showScrollTop ? "show" : ""}`}>
							<a
								className="scrolltop"
								href="#"
								onClick={(e) => {
									e.preventDefault();
									scrollToTop();
								}}
							>
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
export default Layout;
