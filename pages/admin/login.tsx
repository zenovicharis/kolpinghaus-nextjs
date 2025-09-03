import AdminLayout from "../../components/admin/AdminLayout";
import { useState } from "react";
import { useRouter } from "next/router";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/admin");
      } else {
        const data = await res.json();
        setError(data.message || "Anmeldung fehlgeschlagen");
      }
    } catch {
      setError("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
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
          <h1 className="single-post-title">Login</h1>
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
              placeholder="Passwort"
              style={inputStyle}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="view-more" disabled={loading}>
              {loading ? <span className="button-spinner"></span> : "Anmelden"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default LoginPage;
