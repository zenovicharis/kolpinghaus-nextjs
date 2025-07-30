import AdminLayout from '../../components/admin/AdminLayout';
import Link from 'next/link';

const LoginPage = () => {
  const formContainerStyle: React.CSSProperties = {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '40px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '15px',
    marginBottom: '20px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
  };

  const buttonStyle: React.CSSProperties = {
    width: '100%',
    padding: '15px',
    fontSize: '16px',
  };

  return (
    <AdminLayout>
      <div className="topSingleBkg">
        <div className="item-img" style={{ backgroundImage: 'url(/img/banner.jpg)' }}></div>
        <div className="inner-desc">
          <h1 className="single-post-title">Login</h1>
        </div>
      </div>
      <div className="container" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div style={formContainerStyle}>
          <form>
            <input type="text" placeholder="Benutzername" style={inputStyle} />
            <input type="password" placeholder="Passwort" style={inputStyle} />
            <button type="submit" className="view-more" style={buttonStyle}>
              Anmelden
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default LoginPage;
