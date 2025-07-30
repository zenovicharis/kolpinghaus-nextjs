import AdminLayout from '../../components/admin/AdminLayout';

const WorkTimeManagement = () => {
  const workTimeItems = [
    { id: 1, day: 'Montag', open: '10:00', close: '22:00' },
    { id: 2, day: 'Dienstag', open: '10:00', close: '22:00' },
    { id: 3, day: 'Mittwoch', open: '10:00', close: '22:00' },
    { id: 4, day: 'Donnerstag', open: '10:00', close: '22:00' },
    { id: 5, day: 'Freitag', open: '10:00', close: '23:00' },
    { id: 6, day: 'Samstag', open: '12:00', close: '23:00' },
    { id: 7, day: 'Sonntag', open: '12:00', close: '21:00' },
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
          <h1 className="single-post-title">Öffnungszeiten-Verwaltung</h1>
        </div>
      </div>
      <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="row">
          <div className="col-md-12">
            <table style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th style={cellStyle}>Tag</th>
                  <th style={cellStyle}>Geöffnet</th>
                  <th style={cellStyle}>Geschlossen</th>
                  <th style={cellStyle}>Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {workTimeItems.map((item) => (
                  <tr key={item.id}>
                    <td style={cellStyle} data-label="Tag">{item.day}</td>
                    <td style={cellStyle} data-label="Geöffnet">{item.open}</td>
                    <td style={cellStyle} data-label="Geschlossen">{item.close}</td>
                    <td style={cellStyle} data-label="Aktionen">
                      <div style={actionsContainerStyle}>
                        <button className="view-more" style={actionButtonStyle}>Bearbeiten</button>
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
