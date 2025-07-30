import AdminLayout from '../../components/admin/AdminLayout';

const SliderManagement = () => {
  const sliderItems = [
    { id: 1, title: 'Sommerangebot', url: '/img/Slider/slide1.jpg', createdAt: '2025-07-29 11:00:00' },
    { id: 2, title: 'Neue Speisekarte', url: '/img/Slider/slide2.png', createdAt: '2025-07-28 15:30:00' },
    { id: 3, title: 'Wir stellen ein', url: '/img/Slider/slide3.png', createdAt: '2025-07-27 09:00:00' },
  ];

  const cellStyle: React.CSSProperties = {
    padding: '20px',
    verticalAlign: 'middle',
  };

  const actionsContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  };

  const actionButtonStyle: React.CSSProperties = {
    width: '140px',
    textAlign: 'center',
  };

  return (
    <AdminLayout>
      <div className="topSingleBkg">
        <div className="item-img" style={{ backgroundImage: 'url(/img/banner.jpg)' }}></div>
        <div className="inner-desc">
          <h1 className="single-post-title">Slider-Verwaltung</h1>
        </div>
      </div>
      <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="row">
          <div className="col-md-12">
            <button className="view-more" style={{ marginBottom: '20px' }}>Neu hinzufügen</button>
            <table style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th style={cellStyle}>Titel</th>
                  <th style={cellStyle}>Bild</th>
                  <th style={cellStyle}>Erstellt am</th>
                  <th style={cellStyle}>Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {sliderItems.map((item) => (
                  <tr key={item.id}>
                    <td style={cellStyle} data-label="Titel">{item.title}</td>
                    <td style={cellStyle} data-label="Bild">
                      <img src={item.url} alt={item.title} width="150" />
                    </td>
                    <td style={cellStyle} data-label="Erstellt am">{item.createdAt}</td>
                    <td style={cellStyle} data-label="Aktionen">
                      <div style={actionsContainerStyle}>
                        <button className="view-more" style={actionButtonStyle}>Bearbeiten</button>
                        <button className="view-more" style={actionButtonStyle}>Löschen</button>
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

export default SliderManagement;