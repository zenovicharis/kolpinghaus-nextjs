import React from "react";
import Link from "next/link";
import Image from "next/image";
import SideMenu from "./sideMenu";
import { style } from "@mui/system";
import Box from "@mui/material/Box";
import Credentials from "./credentials";
import AppBar from "@mui/material/AppBar";
import SideMenuMobile from "./sideMenuMobile";
import { useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Accordion from "@mui/material/Accordion";
import styles from "../styles/Sidebar.module.scss";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export default function SideBar({ schedule, isMainPage }) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#ffffff",
      },
    },
  });

  const isSmallOrLess = useMediaQuery(theme.breakpoints.down("md"));
  var days = [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
  ];

  const [hideMenu, setHideMenu] = React.useState(true);

  const [todaysDay] = React.useState(
    schedule ? schedule[days[new Date().getDay()]] : ""
  );
  return (
    <ThemeProvider theme={theme}>
      {isSmallOrLess ? (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed" color="primary">
            <Accordion className={style.accordionHead}>
              <AccordionSummary
                expandIcon={<MenuIcon />}
                collaps
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <>
                  <div
                    style={{
                      position: "relative",
                      width: "70%",
                      height: "80px",
                      margin: "auto",
                    }}
                  >
                    <Image
                      src="/img/Menu/logo-mobile.png"
                      alt="Kolpinghaus Logo"
                      fill
                    />
                  </div>
                </>
              </AccordionSummary>
              <AccordionDetails>
                <>
                  {!isMainPage ? (
                    <ul className={styles.menuUnorderedList}>
                      <li>
                        <Link href="/">Home</Link>
                      </li>
                      <li>
                        <Link href="/">Restaurant</Link>
                      </li>
                      <li>
                        <Link href="/">Menu</Link>
                      </li>
                      <li>
                        <Link href="/">Kontakt</Link>
                      </li>
                      <li>
                        <Link href="/impressum">Impressum</Link>
                      </li>
                    </ul>
                  ) : (
                    <ul className={styles.menuUnorderedList}>
                      <SideMenuMobile callback={() => setHideMenu(true)} />
                      <li>
                        <Link href="/impressum">Impressum</Link>
                      </li>
                    </ul>
                  )}
                </>
              </AccordionDetails>
            </Accordion>
          </AppBar>
        </Box>
      ) : (
        <div className={styles.sideBar}>
          <div className={styles.logoContainer}>
            <div className={styles.logoContainer}>
              <Image src="/img/Menu/Logo.png" alt="Kolpinghaus Logo" fill />
            </div>
            <p className={styles.subtitle} id="kuche">
              Balkanküche
            </p>
          </div>
          {!isMainPage ? (
            <div className={styles.sideMenu}>
              <div className={styles.menuBlock}>
                <Link href="/">
                  <h5>Home</h5>
                </Link>
              </div>
              <div className={styles.menuBlock}>
                <Link href="/">
                  <h5>Restourant</h5>
                </Link>
              </div>
              <div className={styles.menuBlock}>
                <Link href="/">
                  <h5>Menu</h5>
                </Link>
              </div>
              <div className={styles.menuBlock}>
                <Link href="/">
                  <h5>Kontakt</h5>
                </Link>
              </div>
            </div>
          ) : (
            <SideMenu />
          )}
          <div>
            <div className={styles.schedule}>
              {todaysDay != "Ruhetag" ? (
                <>
                  <p className={styles.green}>Heute haben wir von</p>
                  <p className={styles.white}>{todaysDay}</p>
                  <p className={styles.green}>für Sie geöffnet.</p>
                </>
              ) : (
                <p className={styles.red}>Heute haben wir geschlossen</p>
              )}
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.bottom}>
              <Image
                src="/img/MapIcon.png"
                alt="Vercel Logo"
                width={30}
                height={30}
              />
              <p id="adress">Weidenauer Straße 27,Siegen</p>
            </div>
            <Credentials />
          </div>
        </div>
      )}
    </ThemeProvider>
  );
}
