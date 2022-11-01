// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'

// export default function Home() {
//   return (
//     <div className={styles.container}>
//       <Head>
//         <title>Create Next App</title>
//         <meta name="description" content="Generated by create next app" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main className={styles.main}>
//         <h1 className={styles.title}>
//           Welcome to <a href="https://nextjs.org">Next.js!</a>
//         </h1>

//         <p className={styles.description}>
//           Get started by editing{' '}
//           <code className={styles.code}>pages/index.js</code>
//         </p>

//         <div className={styles.grid}>
//           <a href="https://nextjs.org/docs" className={styles.card}>
//             <h2>Documentation &rarr;</h2>
//             <p>Find in-depth information about Next.js features and API.</p>
//           </a>

//           <a href="https://nextjs.org/learn" className={styles.card}>
//             <h2>Learn &rarr;</h2>
//             <p>Learn about Next.js in an interactive course with quizzes!</p>
//           </a>

//           <a
//             href="https://github.com/vercel/next.js/tree/canary/examples"
//             className={styles.card}
//           >
//             <h2>Examples &rarr;</h2>
//             <p>Discover and deploy boilerplate example Next.js projects.</p>
//           </a>

//           <a
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//             className={styles.card}
//           >
//             <h2>Deploy &rarr;</h2>
//             <p>
//               Instantly deploy your Next.js site to a public URL with Vercel.
//             </p>
//           </a>
//         </div>
//       </main>

//       <footer className={styles.footer}>
//         <a
//           href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Powered by{' '}
//           <span className={styles.logo}>
//             <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
//           </span>
//         </a>
//       </footer>
//     </div>
//   )
// }
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
  const food = await db.collection("food").find().toArray();
  const galleryImages = await db.collection("gallery").find().toArray();
  const workTime = await db.collection("work-time").findOne();
  const slides = await db.collection("slider").find().toArray();

  return {
    props: {
      food: food.map((f) => JSON.parse(JSON.stringify(f))),
      galleryImages: galleryImages.map((f) => JSON.parse(JSON.stringify(f))),
      workTime: JSON.parse(JSON.stringify(workTime)),
      slides: slides.map((f) => JSON.parse(JSON.stringify(f))),
      siteKey: SITE_KEY,
    },
  };
}
