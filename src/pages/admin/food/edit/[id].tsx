import AdminLayout from "../../../../components/admin/AdminLayout";
import { useState } from "react";
import adminApi from "lib/adminClient";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { getFoodById, getCategories } from "../../../../lib/queries/food";
import { Food, Picklists } from "../../../../db/schema";

interface EditFoodPageProps {
	food: Food;
	categories: Picklists[];
}

const EditFoodPage: React.FC<EditFoodPageProps> = ({ food, categories }) => {
  const [name, setName] = useState(food.name);
  const [price, setPrice] = useState(food.price);
  const [info, setInfo] = useState(food.info);
  const [subtypeId, setSubtypeId] = useState(food.subtypeId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!subtypeId) {
      setError("Bitte wählen Sie eine Kategorie.");
      return;
    }

    try {
      setLoading(true);
      await adminApi.put("/api/admin/food", { id, name, price, info, subtypeId });
      router.push("/admin/food");
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Lebensmittels", error);
      setError("Hinzufügen des Lebensmittels fehlgeschlagen.");
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
          <h1 className="single-post-title">Lebensmittel bearbeiten</h1>
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
              placeholder="Name"
              style={inputStyle}
              value={name ?? ""}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Preis"
              style={inputStyle}
              value={price ?? ""}
              onChange={(e) => setPrice(e.target.value)}
            />
            <textarea
              placeholder="Informationen"
              style={inputStyle}
              value={info ?? ""}
              onChange={(e) => setInfo(e.target.value)}
            />
            <select
              style={inputStyle}
              value={subtypeId || ""}
              onChange={(e) => setSubtypeId(Number(e.target.value))}
            >
              <option value="">Kategorie auswählen</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
            <button type="submit" className="view-more" disabled={loading}>
              {loading ? <span className="button-spinner"></span> : "Aktualisieren"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps<EditFoodPageProps> = async (
  ctx,
) => {
  const { id } = ctx.params!;
  const food = await getFoodById(Number(id));
  const categories = await getCategories();

  if (!food) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      food: JSON.parse(JSON.stringify(food)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
};

export default EditFoodPage;
