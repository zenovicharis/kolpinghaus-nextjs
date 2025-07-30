import Head from "next/head";
import Script from "next/script";
import { ReactNode, FC, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

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

const AdminLayout: FC<LayoutProps> = ({ children }) => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [workTime, setWorkTime] = useState<IWorkTime | null>(null);

	useEffect(() => {
		if (isMobileMenuOpen) {
			document.body.classList.add("has-active-menu");
		} else {
			document.body.classList.remove("has-active-menu");
		}
	}, [isMobileMenuOpen]);

    useEffect(() => {
		async function fetchWorkTime() {
			try {
				const response = await fetch("/api/workTime");
				const data = await response.json();
				setWorkTime(data);
			} catch (error) {
				console.error("Error fetching work time:", error);
			}
		}
		fetchWorkTime();
	}, []);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false);
	};

	return (
		<>
			<Head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Admin Panel - Kolpinghaus</title>
				<meta name="robots" content="noindex, nofollow" />
				<link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="/template/style.css" />
                <link rel="stylesheet" href="/template/css/fontawesome/css/all.min.css" />
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
										<Link href="/admin" onClick={closeMobileMenu}>
											Dashboard
										</Link>
									</li>
									<li className="menu-item">
										<Link href="/admin/food" onClick={closeMobileMenu}>
											Speisen
										</Link>
									</li>
									<li className="menu-item">
										<Link href="/admin/slider" onClick={closeMobileMenu}>
											Slider
										</Link>
									</li>
									<li className="menu-item">
										<Link href="/admin/gallery" onClick={closeMobileMenu}>
											Galerie
										</Link>
									</li>
									<li className="menu-item">
										<Link href="/admin/worktime" onClick={closeMobileMenu}>
											Öffnungszeiten
										</Link>
									</li>
                                    <li className="menu-item">
										<Link href="/admin/admins" onClick={closeMobileMenu}>
											Admins
										</Link>
									</li>
                                    <li className="menu-item">
										<Link href="/admin/login" onClick={closeMobileMenu}>
											Abmelden
										</Link>
									</li>
								</ul>
							</div>
						</nav>
						{/* /MENU */}

                        {/* RIGHT SIDE */}
						<div className="rightside-nav-2">
							<h3>Öffnungszeiten</h3>
							<ul className="right-side-contact">
								{workTime ? (
                                    Object.entries(workTime).filter(([key]) => key !== '_id').map(([day, time]) => (
                                        <li key={day}>
                                            <label>{day}:</label> {time}
                                        </li>
                                    ))
                                ) : (
                                    <li>Lade Öffnungszeiten...</li>
                                )}
							</ul>
						</div>
						{/* /RIGHT SIDE */}
					</div>
				)}
				{/* /MOBILE MENU */}

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
								<Link href="/" className="info-txt">Zur Webseite</Link>
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
									<Link href="/admin">
										<Image
											className="img-fluid"
											src="/img/Menu/kolpinghaus.svg"
											alt="logo"
											width={150}
											height={50}
										/>
									</Link>
								</div>
								{/* MENU */}
								<div className="nav-holder nav-holder-1 nav-holder-desktop">
									<ul id="menu-menu-1" className="menu-nav menu-nav-1">
                                        <li className="menu-item">
                                            <Link href="/admin">Dashboard</Link>
                                        </li>
										<li className="menu-item">
											<Link href="/admin/food">Speisen</Link>
										</li>
										<li className="menu-item">
											<Link href="/admin/slider">Slider</Link>
										</li>
										<li className="menu-item">
											<Link href="/admin/gallery">Galerie</Link>
										</li>
										<li className="menu-item">
											<Link href="/admin/worktime">Öffnungszeiten</Link>
										</li>
                                        <li className="menu-item">
											<Link href="/admin/admins">Admins</Link>
										</li>
                                        <li className="menu-item">
											<Link href="/admin/login">Abmelden</Link>
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
						{/* FOOTER COPYRIGHT */}
						<div className="copyright">
							Copyright &copy; 2025, Kolpinghaus Admin Panel
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
			<Script
				src="/template/js/jquery.easing.min.js"
				strategy="afterInteractive"
			/>
			<Script
				src="/template/js/jquery.fitvids.js"
				strategy="afterInteractive"
			/>
			<Script
				src="/template/js/jquery.magnific-popup.min.js"
				strategy="afterInteractive"
			/>
			<Script
				src="/template/js/owl-carousel/owl.carousel.min.js"
				strategy="afterInteractive"
			/>
			<Script src="/template/js/init.js" strategy="lazyOnload" />
		</>
	);
};
export default AdminLayout;