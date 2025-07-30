import AdminLayout from '../../components/admin/AdminLayout';

const FoodManagement = () => {
  const foodItems = [
    { id: 1, name: 'Wiener Schnitzel', price: '€15.50', info: 'Mit Pommes und Salat', type: 'Hauptgericht', subtype: 'Fleisch', createdAt: '2025-07-30 10:10:00' },
    { id: 2, name: 'Käsespätzle', price: '€12.00', info: 'Mit Röstzwiebeln', type: 'Hauptgericht', subtype: 'Vegetarisch', createdAt: '2025-07-30 10:12:00' },
    { id: 3, name: 'Apfelstrudel', price: '€6.50', info: 'Mit Vanillesoße', type: 'Dessert', subtype: 'Süßspeise', createdAt: '2025-07-30 10:15:00' },
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
          <h1 className="single-post-title">Speisenverwaltung</h1>
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
                    <th style={cellStyle}>Name</th>
                    <th style={cellStyle}>Preis</th>
                    <th style={cellStyle}>Info</th>
                    <th style={cellStyle}>Typ</th>
                    <th style={cellStyle}>Untertyp</th>
                    <th style={cellStyle}>Erstellt am</th>
                    <th style={cellStyle}>Aktionen</th>
                  </tr>
                </thead>
                <tbody>
                  {foodItems.map((item) => (
                    <tr key={item.id}>
                      <td style={cellStyle} data-label="Name">{item.name}</td>
                      <td style={cellStyle} data-label="Preis">{item.price}</td>
                      <td style={cellStyle} data-label="Info">{item.info}</td>
                      <td style={cellStyle} data-label="Typ">{item.type}</td>
                      <td style={cellStyle} data-label="Untertyp">{item.subtype}</td>
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
      </div>
    </AdminLayout>
  );
};

export default FoodManagement;
