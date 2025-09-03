import AdminLayout from "../../components/admin/AdminLayout";
import { Admin } from "../../db/schema";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FullScreenLoader from "../../components/FullScreenLoader";

const AdminManagement: React.FC = () => {
  const router = useRouter();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(false);
  const cellStyle: React.CSSProperties = {
    padding: "20px",
    verticalAlign: "middle",
  };

  const actionsContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  };

  useEffect(() => {
    const fetchAdmins = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/admin/admins");
        setAdmins(data);
      } catch (error) {
        console.error("Fehler beim Abrufen der Admins", error);
      }
      finally{
        setLoading(false);
      }
    };
    fetchAdmins();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      setLoading(true);
      try {
        await axios.delete("/api/admin/admins", { data: { id } });
        setAdmins(admins.filter((admin) => admin.id !== id));
      } catch (error) {
        console.error("Failed to delete admin", error);
        alert("Admin konnte nicht gelöscht werden.");
      }
      finally{
        setLoading(false);
      }
    }
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
          <h1 className="single-post-title">Admin-Verwaltung</h1>
        </div>
      </div>
      <div
        className="container"
        style={{ paddingTop: "40px", paddingBottom: "40px" }}
      >
        <div className="row">
          <div className="col-md-12">
            <button
              onClick={() => router.push("/admin/admins/new")}
              className="view-more"
              style={{ marginBottom: "20px" }}
            >
							Neu hinzufügen
            </button>
            <div className="table-responsive-wrapper">
              <table
                style={{ tableLayout: "auto", width: "100%" }}
                className="responsive-table"
              >
                <thead>
                  <tr>
                    <th style={cellStyle}>Benutzername</th>
                    <th style={cellStyle}>Erstellt am</th>
                    <th style={cellStyle}>Aktionen</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((user) => (
                    <tr key={user.id}>
                      <td style={cellStyle} data-label="Benutzername">
                        {user.username}
                      </td>
                      <td style={cellStyle} data-label="Erstellt am">
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString(
                            "de-DE",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            },
													  )
                          : ""}
                      </td>
                      <td style={cellStyle} data-label="Aktionen">
                        <div style={actionsContainerStyle}>
                          <button
                            onClick={() =>
                              router.push(`/admin/admins/edit/${user.id}`)
                            }
                            className="view-more"
                          >
														Bearbeiten
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
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
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminManagement;
