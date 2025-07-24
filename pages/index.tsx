import { connectToDatabase } from "../lib/mongodb";
import { GetServerSideProps } from "next";
import Slider from "../components/Slider";
import HomeGallery from "../components/HomeGallery";
import HomeAbout from "../components/HomeAbout";
import HomeMenu from "../components/HomeMenu";
import HomeContact from "../components/HomeContact";
import Reservation from "../components/Reservation";
import Layout from "../components/Layout";

interface FoodListItem {
  name: string;
  price: string;
  info: string;
}

interface FoodType {
  name: string;
  list: FoodListItem[];
}

interface Food {
  _id: string;
  name: string;
  types: FoodType[];
}

interface GalleryImage {
  _id: string;
  path: string;
}

interface SliderImage {
  _id: string;
  path: string;
  title: string;
  description: string;
}

interface HomeProps {
  food: Food[];
  galleryImages: GalleryImage[];
  slides: SliderImage[];
  siteKey: string;
}

export default function Home({ food, galleryImages, slides, siteKey }: HomeProps) {
  return (
    <Layout>
      <Slider slides={slides} />
      <HomeGallery images={galleryImages} />
      <HomeAbout />
      <HomeMenu food={food} />
      <HomeContact siteKey={siteKey} />
      <Reservation />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const { db } = await connectToDatabase();

  const food = await db.collection("food").find().toArray();
  const galleryImages = await db.collection("gallery").find().toArray();
  const slides = await db.collection("slider").find().toArray();
  const siteKey = process.env.SITE_KEY || "";

  return {
    props: {
      food: JSON.parse(JSON.stringify(food)),
      galleryImages: JSON.parse(JSON.stringify(galleryImages)),
      slides: JSON.parse(JSON.stringify(slides)),
      siteKey,
    },
  };
};
