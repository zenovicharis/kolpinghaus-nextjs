import AdminLayout from "../../../../components/admin/AdminLayout";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { getAdminById } from "../../../../lib/queries/admins";
import { Admin } from "../../../../db/schema";

interface EditAdminPageProps {
	admin: Admin;
}

const EditAdminPage: React.FC<EditAdminPageProps> = ({ admin }) => {
  const [username, setUsername] = useState(admin.username);
  const [password, setPassword] = useState("");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    setLoading(true);
    try {
      await axios.put("/api/admin/admins", { id, username, password });
      router.push("/admin/admins");
    } catch {
      setError("Fehler beim Aktualisieren des Admins.");
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
          <h1 className="single-post-title">Admin bearbeiten</h1>
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
              placeholder="Benutzername"
              style={inputStyle}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Neues Passwort (optional)"
              style={inputStyle}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="view-more" disabled={loading}>
              {loading ? <span className="button-spinner"></span> : "Admin aktualisieren"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps<
	EditAdminPageProps
> = async (ctx) => {
  const { id } = ctx.params!;
  const admin = await getAdminById(Number(id));

  if (!admin) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      admin: JSON.parse(JSON.stringify(admin)),
    },
  };
};

export default EditAdminPage;
