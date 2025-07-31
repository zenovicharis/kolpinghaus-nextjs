import { GetServerSideProps } from "next";
import Slider from "../components/Slider";
import HomeAbout from "../components/HomeAbout";
import HomeMenu from "../components/HomeMenu";
import HomeContact from "../components/HomeContact";
import HomeGallery from "../components/HomeGallery";
import Layout from "../components/Layout";
import HomeMainMenu from "../components/HomeMainMenu";
import { getFood } from "../lib/queries/food";
import { getSlides } from "../lib/queries/slides";
import { getImages } from "../lib/queries/images";
import { Food, Slides, images, Worktime } from "../db/schema";
import { minioClient } from "../lib/minio";
import { getWorkTime } from "../lib/queries/workTime";

interface MenuType {
  name: string;
  list: Food[];
}

interface MenuCategory {
  name: string;
  types: MenuType[];
}

interface HomeProps {
  food: MenuCategory[];
  slides: Slides[];
  images: (typeof images.$inferSelect)[];
  siteKey: string;
  workTime: Worktime[];
}

export default function Home({ food, slides, images, siteKey, workTime }: HomeProps) {
  return (
    <Layout workTime={workTime}>
      <Slider slides={slides} />
      <HomeMainMenu images={images} />
      <HomeAbout />
      <HomeMenu food={food} />
      <HomeGallery images={images} />
      <HomeContact siteKey={siteKey} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const food = await getFood();
  const slidesData = await getSlides();
  const imagesData = await getImages();
  const workTime = await getWorkTime();
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

  const presignedSlides = await Promise.all(
    slidesData.map(async (slide) => {
      const presignedUrl = await minioClient.presignedGetObject(
        process.env.MINIO_BUCKET_NAME!,
        slide.url,
        15 * 60
      );
      return { ...slide, url: presignedUrl };
    })
  );

  const presignedImages = await Promise.all(
    imagesData.map(async (image) => {
      const presignedUrl = await minioClient.presignedGetObject(
        process.env.MINIO_BUCKET_NAME!,
        image.url,
        15 * 60
      );
      return { ...image, url: presignedUrl };
    })
  );

  return {
    props: {
      food: JSON.parse(JSON.stringify(food)),
      slides: JSON.parse(JSON.stringify(presignedSlides)),
      images: JSON.parse(JSON.stringify(presignedImages)),
      siteKey,
      workTime: JSON.parse(JSON.stringify(workTime)),
    },
  };
};