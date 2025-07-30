import AdminLayout from '../../components/admin/AdminLayout';

const AdminManagement = () => {
  const adminUsers = [
    { id: 1, username: 'admin', createdAt: '2025-07-30 09:00:00' },
    { id: 2, username: 'dzemil', createdAt: '2025-07-30 09:05:00' },
    { id: 3, username: 'test', createdAt: '2025-07-30 09:10:00' },
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
          <h1 className="single-post-title">Admin-Verwaltung</h1>
        </div>
      </div>
      <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="row">
          <div className="col-md-12">
            <button className="view-more" style={{ marginBottom: '20px' }}>Neu hinzufügen</button>
            <div className="table-responsive-wrapper">
              <table style={{tableLayout: 'auto', width: '100%'}}>
                <thead>
                  <tr>
                    <th style={cellStyle}>Username</th>
                    <th style={cellStyle}>Erstellt am</th>
                    <th style={cellStyle}>Aktionen</th>
                  </tr>
                </thead>
                <tbody>
                  {adminUsers.map((user) => (
                    <tr key={user.id}>
                      <td style={cellStyle} data-label="Username">{user.username}</td>
                      <td style={cellStyle} data-label="Erstellt am">{user.createdAt}</td>
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
      </div>
    </AdminLayout>
  );
};

export default AdminManagement;
