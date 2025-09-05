import AdminLayout from "../../components/admin/AdminLayout";
import { Worktime } from "../../db/schema";
import { useEffect, useState } from "react";
import adminApi from "../../../lib/adminClient";

const WorkTimeManagement: React.FC = () => {
  const [workTime, setWorkTime] = useState<Worktime[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [backupWorkTime, setBackupWorkTime] = useState<Worktime[]>([]);
  const [loading, setLoading] = useState(false);

  const cellStyle: React.CSSProperties = {
    padding: "20px",
    verticalAlign: "middle",
  };

  const actionsContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  };

  useEffect(() => {
    const fetchWorkTime = async () => {
      setLoading(true);
      try {
        const { data } = await adminApi.get("/api/workTime");
        setWorkTime(data);
        setBackupWorkTime(data);
      } catch (error) {
        console.error("Fehler beim Abrufen der Arbeitszeiten", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkTime();
  }, []);

  const handleEditClick = (id: number) => {
    if (editingId === id) {
      // save changes
      const itemToSave = workTime.find((item) => item.id === id);
      if (itemToSave) {
        const { open, close } = itemToSave;
        setLoading(true);
        adminApi
          .put("/api/workTime", { id, open, close })
          .then(() => {
            setBackupWorkTime(workTime);
            setEditingId(null);
          })
          .catch((error) => {
            console.error("Fehler beim Aktualisieren der Arbeitszeit", error);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    } else {
      setEditingId(id);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
    field: keyof Worktime,
  ) => {
    const newWorkTime = workTime.map((item) => {
      if (item.id === id) {
        return { ...item, [field]: e.target.value };
      }
      return item;
    });
    setWorkTime(newWorkTime);
  };

  const handleCancelClick = () => {
    setWorkTime(backupWorkTime);
    setEditingId(null);
  };

  return (
    <AdminLayout>
      <div className="topSingleBkg">
        <div
          className="item-img"
          style={{ backgroundImage: "url(/img/banner.jpg)" }}
        ></div>
        <div className="inner-desc">
          <h1 className="single-post-title">Öffnungszeiten-Verwaltung</h1>
        </div>
      </div>
      <div
        className="container"
        style={{ paddingTop: "40px", paddingBottom: "40px" }}
      >
        <div className="row">
          <div className="col-md-12">
            <table style={{ width: "100%" }} className="responsive-table">
              <thead>
                <tr>
                  <th style={cellStyle}>Tag</th>
                  <th style={cellStyle}>Geöffnet</th>
                  <th style={cellStyle}>Geschlossen</th>
                  <th style={cellStyle}>Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {workTime.map((item) => (
                  <tr key={item.id}>
                    <td style={cellStyle} data-label="Tag">
                      {item.day}
                    </td>
                    <td style={cellStyle} data-label="Geöffnet">
                      <input
                        type="text"
                        value={item.open}
                        onChange={(e) => handleInputChange(e, item.id, "open")}
                        disabled={editingId !== item.id}
                      />
                    </td>
                    <td style={cellStyle} data-label="Geschlossen">
                      <input
                        type="text"
                        value={item.close}
                        onChange={(e) => handleInputChange(e, item.id, "close")}
                        disabled={editingId !== item.id}
                      />
                    </td>
                    <td style={cellStyle} data-label="Aktionen">
                      <div style={actionsContainerStyle}>
                        <button
                          className="view-more"
                          onClick={() => handleEditClick(item.id)}
                        >
                          {loading ? <span className="button-spinner"></span> : editingId === item.id ? "Speichern" : "Bearbeiten"}
                        </button>
                        {editingId === item.id && (
                          <button
                            className="workTime-cancel-button"
                            onClick={handleCancelClick}
                          >
                            Abbrechen
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default WorkTimeManagement;
