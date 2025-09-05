import AdminLayout from "../../../../components/admin/AdminLayout";
import { useState } from "react";
import adminApi from "lib/adminClient";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { getSlideById } from "../../../../lib/queries/slides";
import { Slides } from "../../../../db/schema";

interface EditSlidePageProps {
	slide: Slides;
}

const EditSlidePage: React.FC<EditSlidePageProps> = ({ slide }) => {
  const [title, setTitle] = useState(slide.title);
  const [subtitle, setSubtitle] = useState(slide.subtitle);
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const formContainerStyle: React.CSSProperties = {
    maxWidth: "500px",
    margin: "0 auto",
    padding: "40px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "15px",
    marginBottom: "20px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "16px",
  };

  const errorStyle: React.CSSProperties = {
    color: "red",
    marginBottom: "20px",
    textAlign: "center",
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const formData = new FormData();
    formData.append("id", id as string);
    formData.append("title", title);
    if (subtitle) {
      formData.append("subtitle", subtitle);
    }
    if (image) {
      formData.append("image", image);
    }

    setLoading(true);
    try {
      await adminApi.put("/api/admin/slides", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      router.push("/admin/slider");
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Slides", error);
      setError("Fehler beim Aktualisieren des Slides.");
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="topSingleBkg">
        <div
          className="item-img"
          style={{ backgroundImage: "url(/img/banner.jpg)" }}
        ></div>
        <div className="inner-desc">
          <h1 className="single-post-title">Slide bearbeiten</h1>
        </div>
      </div>
      <div
        className="container"
        style={{ paddingTop: "80px", paddingBottom: "80px" }}
      >
        <div style={formContainerStyle}>
          <form onSubmit={handleSubmit}>
            {error && <p style={errorStyle}>{error}</p>}
            <input
              type="text"
              placeholder="Titel"
              style={inputStyle}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Untertitel"
              style={inputStyle}
              value={subtitle || ""}
              onChange={(e) => setSubtitle(e.target.value)}
            />
            <input type="file" style={inputStyle} onChange={handleFileChange} />
            <button type="submit" className="view-more" disabled={loading}>
              {loading ? <span className="button-spinner"></span> : "Bearbeiten"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps<
	EditSlidePageProps
> = async (ctx) => {
  const { id } = ctx.params!;
  const slide = await getSlideById(Number(id));

  if (!slide) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      slide: JSON.parse(JSON.stringify(slide)),
    },
  };
};

export default EditSlidePage;
