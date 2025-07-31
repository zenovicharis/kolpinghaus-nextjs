import AdminLayout from '../../components/admin/AdminLayout';
import Link from 'next/link';

const AdminDashboard = () => {
  const buttonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
    height: '120px',
    padding: '10px',
    wordWrap: 'break-word',
    whiteSpace: 'normal',
  };

  return (
    <AdminLayout>
      <div className="topSingleBkg">
        <div className="item-img" style={{ backgroundImage: 'url(/img/banner.jpg)' }}></div>
        <div className="inner-desc">
          <h1 className="single-post-title">Admin-Dashboard</h1>
          <span className="post-subtitle">Verwalten Sie den Inhalt Ihrer Website</span>
        </div>
      </div>
      <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="headline" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2>Willkommen zurück, Admin!</h2>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-12" style={{ marginBottom: '30px' }}>
            <Link href="/admin/food" className="view-more" style={buttonStyle}>
              Speisenverwaltung
            </Link>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12" style={{ marginBottom: '30px' }}>
            <Link href="/admin/slider" className="view-more" style={buttonStyle}>
              Slider-Verwaltung
            </Link>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12" style={{ marginBottom: '30px' }}>
            <Link href="/admin/gallery" className="view-more" style={buttonStyle}>
              Galerie-Verwaltung
            </Link>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12" style={{ marginBottom: '30px' }}>
            <Link href="/admin/worktime" className="view-more" style={buttonStyle}>
              Öffnungszeiten
            </Link>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12" style={{ marginBottom: '30px' }}>
            <Link href="/admin/admins" className="view-more" style={buttonStyle}>
              Admin-Verwaltung
            </Link>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12" style={{ marginBottom: '30px' }}>
            <Link href="/api/admin/logout" className="view-more" style={buttonStyle}>
              Abmelden
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
