import AdminLayout from '../../components/admin/AdminLayout';
import { useState } from 'react';

const GalleryManagement = () => {
  const galleryItems = [
    { id: 1, url: '/img/grid/pic1.jpg', createdAt: '2025-07-29 12:00:00' },
    { id: 2, url: '/img/grid/pic2.jpg', createdAt: '2025-07-29 12:01:00' },
    { id: 3, url: '/img/grid/pic3.jpg', createdAt: '2025-07-29 12:02:00' },
    { id: 4, url: '/img/grid/pic4.jpg', createdAt: '2025-07-29 12:03:00' },
    { id: 5, url: '/img/grid/pic5.jpg', createdAt: '2025-07-29 12:04:00' },
    { id: 6, url: '/img/grid/pic6.jpg', createdAt: '2025-07-29 12:05:00' },
  ];

  const [hoveredButtonId, setHoveredButtonId] = useState<number | null>(null);

  const imageContainerStyle: React.CSSProperties = {
    position: 'relative',
    marginBottom: '30px',
  };

  const getDeleteButtonStyle = (id: number): React.CSSProperties => ({
    position: 'absolute',
    top: '10px',
    right: '10px',
    padding: '5px 10px',
    backgroundColor: hoveredButtonId === id ? 'rgba(220, 53, 69, 0.9)' : 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  });

  const uploadButtonStyle: React.CSSProperties = {
    display: 'block',
    margin: '40px auto',
    textAlign: 'center',
  };

  return (
    <AdminLayout>
      <div className="topSingleBkg">
        <div className="item-img" style={{ backgroundImage: 'url(/img/banner.jpg)' }}></div>
        <div className="inner-desc">
          <h1 className="single-post-title">Galerie-Verwaltung</h1>
        </div>
      </div>
      <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="row">
          {galleryItems.map((item) => (
            <div className="col-md-4" key={item.id}>
              <div style={imageContainerStyle}>
                <img 
                  src={item.url} 
                  alt={`Galeriebild ${item.id}`} 
                  style={{ width: '100%', height: 'auto' }} 
                />
                <button 
                  className="view-more" 
                  style={getDeleteButtonStyle(item.id)}
                  onMouseEnter={() => setHoveredButtonId(item.id)}
                  onMouseLeave={() => setHoveredButtonId(null)}
                >
                  Löschen
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="row">
            <div className="col-md-12">
                <button className="view-more" style={uploadButtonStyle}>Bilder hochladen</button>
            </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default GalleryManagement;