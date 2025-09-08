import AdminLayout from "../../components/admin/AdminLayout";
import { Food } from "../../db/schema";
import adminApi from "../../../lib/adminClient";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FullScreenLoader from "../../components/FullScreenLoader";

interface MenuType {
	name: string;
	list: Food[];
}

interface MenuCategory {
	name: string;
	types: MenuType[];
}

const FoodManagement: React.FC = () => {
  const router = useRouter();
  const [food, setFood] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const cellStyle: React.CSSProperties = {
    padding: "20px",
    verticalAlign: "middle",
  };
  const [openSection, setOpenSection] = useState("");

  const actionsContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  };

  useEffect(() => {
    const fetchFood = async () => {
      try {
        setLoading(true);
        const { data } = await adminApi.get("/api/admin/food");
        setFood(data);
        setOpenSection(data[0]?.name);
      } catch (error) {
        console.error("Fehler beim Abrufen der Speisen", error);
      }
      finally{
        setLoading(false);
      }
    };
    fetchFood();
  }, [router]);

  const handleDelete = async (id: number) => {
    if (
      window.confirm(
        "Sind Sie sicher, dass Sie diesen Eintrag löschen möchten?",
      )
    ) {
      try {
        setLoading(true);
        await adminApi.delete("/api/admin/food", { data: { id } });
        const newFood = food.map((category) => ({
          ...category,
          types: category.types.map((type) => ({
            ...type,
            list: type.list.filter((item) => item.id !== id),
          })),
        }));
        setFood(newFood);
      } catch (error) {
        console.error("Fehler beim Löschen des Speiseeintrags", error);
        alert("Fehler beim Löschen des Speiseeintrags.");
      }
      finally{
        setLoading(false);
      }
    }
  };

  const toId = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

  const toggleSection = (sectionName: string) => {
    setOpenSection(openSection === sectionName ? "" : sectionName);
  };

  return (
    <AdminLayout>
      {loading ? <FullScreenLoader /> : <></>}
      <div className="topSingleBkg">
        <div
          className="item-img"
          style={{ backgroundImage: "url(/img/banner.jpg)" }}
        ></div>
        <div className="inner-desc">
          <h1 className="single-post-title">Speisenverwaltung</h1>
        </div>
      </div>
      <div
        className="container"
        style={{ paddingTop: "40px", paddingBottom: "40px" }}
      >
        <div className="row">
          <div className="col-md-12">
            <button
              onClick={() => router.push("/admin/food/new")}
              className="view-more"
              style={{ marginBottom: "20px" }}
            >
							Neu hinzufügen
            </button>
            <div className="table-responsive-wrapper">
              <ul className="our-menu">
                {food.map((category) => (
                  <li key={category.name}>
                    <h4
                      className={`menu-title-section ${
                        openSection === category.name
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        toggleSection(category.name)
                      }
                      style={{ cursor: "pointer" }}
                    >
                      {category.name}
                    </h4>
                    <div
                      id={toId(category.name)}
                      className="menu-section"
                      style={{
                        maxHeight:
												openSection === category.name
												  ? "20000px"
												  : "0",
                        overflow: "hidden",
                        transition:
												"max-height 0.8s ease-in-out",
                      }}
                    >
                      {category.types.map((type) => (
                        <div key={type.name}>
                          <h3>{type.name}</h3>
                          <table
                            style={{ tableLayout: "auto", width: "100%" }}
                            className="responsive-table"
                          >
                            <thead>
                              <tr>
                                <th style={cellStyle}>Name</th>
                                <th style={cellStyle}>Preis</th>
                                <th style={cellStyle}>Info</th>
                                <th style={cellStyle}>Aktionen</th>
                              </tr>
                            </thead>
                            <tbody>
                              {type.list.map((item) => (
                                <tr key={item.id}>
                                  <td style={cellStyle} data-label="Name">
                                    {item.name}
                                  </td>
                                  <td style={cellStyle} data-label="Preis">
                                    {item.price}
                                  </td>
                                  <td style={cellStyle} data-label="Info">
                                    {item.info}
                                  </td>
                                  <td style={cellStyle} data-label="Aktionen">
                                    <div style={actionsContainerStyle}>
                                      <button
                                        onClick={() =>
                                          router.push(`/admin/food/edit/${item.id}`)
                                        }
                                        className="view-more"
                                      >
																		Bearbeiten
                                      </button>
                                      <button
                                        onClick={() => handleDelete(item.id)}
                                        className="view-more"
                                      >
																		Löschen
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default FoodManagement;
