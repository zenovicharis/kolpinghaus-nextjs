import { connectToDatabase } from "../lib/mongodb";
import { GetServerSideProps } from "next";
import Slider from "../components/Slider";
import HomeAbout from "../components/HomeAbout";
import HomeMenu from "../components/HomeMenu";
import HomeContact from "../components/HomeContact";
import HomeGallery from "../components/HomeGallery";
import Layout from "../components/Layout";
import HomeMainMenu from "../components/HomeMainMenu";

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

interface SliderImage {
  _id: string;
  path: string;
  title: string;
  description: string;
}

interface HomeProps {
  food: Food[];
  slides: SliderImage[];
  siteKey: string;
}

export default function Home({ food, slides, siteKey }: HomeProps) {
  return (
    <Layout>
      <Slider slides={slides} />
      <HomeMainMenu images={[]} />
      <HomeAbout />
      <HomeMenu food={food} />
      <HomeGallery />
      <HomeContact siteKey={siteKey} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const { db } = await connectToDatabase();

  const food = await db.collection("food").find().toArray();
  const slides = await db.collection("slider").find().toArray();
  const siteKey = process.env.SITE_KEY || "";

  return {
    props: {
      food: JSON.parse(JSON.stringify(food)),
      slides: JSON.parse(JSON.stringify(slides)),
      siteKey,
    },
  };
};
