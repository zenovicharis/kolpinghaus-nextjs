import KolpingCarousel from "../components/kolpingCarousel";
import { connectToDatabase } from "../lib/mongodb";
import styles from "../styles/Home.module.scss";
import SideBar from "../components/sideBar";
import Gallery from "../components/gallery";
import Contact from "../components/contact";
import About from "../components/about";
import { Element } from "react-scroll";
import Menu from "../components/menu";
import Head from "next/head";

export default function Home({
  food,
  galleryImages,
  workTime,
  slides,
  siteKey,
}) {
  return (
    <>
      <Head>
        <title>Restaurant im Kolpighaus</title>
        <meta name="description" content="Restaurant im Kolpighaus" />
        <link rel="icon" href="/favicon.ico" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="google-site-verification"
          content="5DcRsUKG1WuDTIWmfeODXw8GvajM2omxy6RPsMZdsqo"
        />
        <meta
          name="description"
          content="Restaurant im Kolpinghaus in Siegen mit Speisekarte, Adresse, Telefonnummer und Routenplaner für die  Anfahrt. Restaurant im Kolpinghaus Restaurant in Siegen"
        />
        <meta
          name="keywords"
          content="Restaurant im Kolpinghaus, Siegen, Speisekarte, Adresse, deutsch, Telefonnummer, Karte, Anfahrt, Umgebungskarte, Routenplaner,Restaurant im Kolpinghaus Restaurant in Siegen"
        />
      </Head>
      <div>
        <SideBar schedule={workTime} isMainPage={true} />
        <div className={styles.content}>
          <Element name="main">
            <KolpingCarousel slides={slides} />
          </Element>
          <Element name="about">
            <About schedule={workTime} />
          </Element>
          <Element name="gallery">
            <Gallery>
              {galleryImages.map((a, i) => {
                return <img key={i} src={a.path} />;
              })}
            </Gallery>
          </Element>
          <Element name="menu">
            <Menu food={food} />
          </Element>
          <Element name="contact">
            <Contact siteKey={siteKey} />
          </Element>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  let { db } = await connectToDatabase();

  const { SITE_KEY } = process.env;
  const moreFood = await db
    .collection("food")
    .find({ name: { $nin: ["Beilage", "Getrankenkarte"] } })
    .toArray();
  const food = await db.collection("food").find().toArray();
  const galleryImages = await db.collection("gallery").find().toArray();
  const workTime = await db.collection("work-time").findOne();
  const slides = await db.collection("slider").find().toArray();

  const allSection = {
    name: "Alle",
    types: [
      {
        name: "Alle",
        list: moreFood
          .map((f) => JSON.parse(JSON.stringify(f)))
          .flatMap((f) => f.types.flatMap((t) => t.list))
          .slice(0, 35),
      },
    ],
  };
  const fullMenu = [
    allSection,
    ...food.map((f) => JSON.parse(JSON.stringify(f))),
  ];
  return {
    props: {
      food: fullMenu,
      galleryImages: galleryImages.map((f) => JSON.parse(JSON.stringify(f))),
      workTime: JSON.parse(JSON.stringify(workTime)),
      slides: slides.map((f) => JSON.parse(JSON.stringify(f))),
      siteKey: SITE_KEY,
    },
  };
}
