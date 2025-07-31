import AdminLayout from '../../components/admin/AdminLayout';
import { Admin } from '../../db/schema';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const AdminManagement: React.FC = () => {
  const router = useRouter();
  const [admins, setAdmins] = useState<Admin[]>([]);
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

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const { data } = await axios.get('/api/admin/admins');
        setAdmins(data);
      } catch (error) {
        console.error('Failed to fetch admins', error);
      }
    };
    fetchAdmins();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this admin?')) {
      try {
        await axios.delete('/api/admin/admins', { data: { id } });
        setAdmins(admins.filter((admin) => admin.id !== id));
      } catch (error) {
        console.error('Failed to delete admin', error);
        alert('Failed to delete admin.');
      }
    }
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
            <button onClick={() => router.push('/admin/admins/new')} className="view-more" style={{ marginBottom: '20px' }}>Neu hinzufügen</button>
            <div className="table-responsive-wrapper">
              <table style={{tableLayout: 'auto', width: '100%'}} className="responsive-table">
                <thead>
                  <tr>
                    <th style={cellStyle}>Username</th>
                    <th style={cellStyle}>Erstellt am</th>
                    <th style={cellStyle}>Aktionen</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((user) => (
                    <tr key={user.id}>
                      <td style={cellStyle} data-label="Username">{user.username}</td>
                      <td style={cellStyle} data-label="Erstellt am">{user.createdAt?.toString()}</td>
                      <td style={cellStyle} data-label="Aktionen">
                        <div style={actionsContainerStyle}>
                          <button onClick={() => router.push(`/admin/admins/edit/${user.id}`)} className="view-more">Bearbeiten</button>
                          <button onClick={() => handleDelete(user.id)} className="view-more">Löschen</button>
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