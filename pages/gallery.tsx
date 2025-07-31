import Layout from "../components/Layout";
import { GetServerSideProps } from "next";
import { getImages } from "../lib/queries/images";
import { images as ImageSchema, Worktime } from '../db/schema';
import { minioClient } from "../lib/minio";
import { getWorkTime } from "../lib/queries/workTime";

interface GalleryPageProps {
    images: (typeof ImageSchema.$inferSelect)[];
    workTime: Worktime[];
}

const GalleryPage = ({ images, workTime }: GalleryPageProps) => {
  return (
    <Layout workTime={workTime}>
      <section
        className="topSingleBkg topPageBkg"
        style={{
          backgroundImage: "url('/img/banner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="item-content-bkg">
          <div className="item-img"></div>
          <div className="inner-desc">
            <h1 className="post-title single-post-title">Galerie</h1>
            <span className="post-subtitle">
              Ein Einblick in unser Ambiente
            </span>
          </div>
        </div>
      </section>

      <section id="wrap-content" className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="gallery-3colgrid-content">
                <div className="menu-holder menu-3col-grid-image gallery-holder clearfix">
                  {images.map((image, index) => (
                    <div className="menu-post gallery-post" key={index}>
                      <a
                        href={image.url}
                        className="lightbox"
                      >
                        <div className="item-content-bkg gallery-bkg">
                          <div
                            className="gallery-img"
                            style={{ backgroundImage: `url(${image.url})` }}
                          ></div>
                          <div className="menu-post-desc">
                            <h4>Galeriebild {index + 1}</h4>
                            <div className="gallery-mglass">
                              <i className="fas fa-search"></i>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<GalleryPageProps> = async () => {
    const imagesData = await getImages();
    const workTime = await getWorkTime();

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
            images: JSON.parse(JSON.stringify(presignedImages)),
            workTime: JSON.parse(JSON.stringify(workTime)),
        },
    };
};

export default GalleryPage;