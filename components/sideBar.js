import React from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import SideMenu from "./sideMenu";
import Credentials from "./credentials";
import styles from "../styles/Sidebar.module.scss";
import { useTheme, useMediaQuery } from "@mui/material";
import SideMenuMobile from "./sideMenuMobile";

export default function SideBar({ schedule, isMainPage }) {
  const theme = useTheme();
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
    <>
      {isSmallOrLess ? (
        <div className={styles.mobileHeader}>
          <div className={styles.mobileHeaderContainer}>
            <div></div>
            <div>
              <Image
                src="/img/Menu/logo-mobile.png"
                alt="Kolpinghaus Logo"
                width={230}
                height={70}
              />
            </div>
            <div onClick={() => setHideMenu(!hideMenu)}>
              <Image
                className
                src="/img/Menu/button.svg"
                alt="Kolpinghaus Logo"
                width={50}
                height={50}
              />
            </div>
          </div>
          <div className={clsx({ hiddenList: true, hideMenu: hideMenu })}>
            {!isMainPage ? (
              <ul>
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
              <ul>
                <SideMenuMobile callback={() => setHideMenu(true)} />
                <li>
                  <Link href="/impressum">Impressum</Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.sideBar}>
          <div className={styles.logoContainer}>
            <Image
              src="/img/Menu/Logo.png"
              alt="Kolpinghaus Logo"
              width={450}
              height={60}
            />
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
    </>
  );
}
