import AdminLayout from '../../../components/admin/AdminLayout';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const NewAdminPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

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

  const errorStyle: React.CSSProperties = {
    color: 'red',
    marginBottom: '20px',
    textAlign: 'center',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('/api/admin/admins', { username, password });
      router.push('/admin/admins');
    } catch (error) {
      setError('Failed to add admin.');
    }
  };

  return (
    <AdminLayout>
      <div className="topSingleBkg">
        <div className="item-img" style={{ backgroundImage: 'url(/img/banner.jpg)' }}></div>
        <div className="inner-desc">
          <h1 className="single-post-title">Add New Admin</h1>
        </div>
      </div>
      <div className="container" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div style={formContainerStyle}>
          <form onSubmit={handleSubmit}>
            {error && <p style={errorStyle}>{error}</p>}
            <input
              type="text"
              placeholder="Username"
              style={inputStyle}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              style={inputStyle}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="view-more">
              Add Admin
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default NewAdminPage;
