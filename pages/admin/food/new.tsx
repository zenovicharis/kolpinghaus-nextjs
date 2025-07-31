import AdminLayout from '../../../components/admin/AdminLayout';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { getCategories } from '../../../lib/queries/food';
import { Picklists } from '../../../db/schema';

interface NewFoodPageProps {
  categories: Picklists[];
}

const NewFoodPage: React.FC<NewFoodPageProps> = ({ categories }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [info, setInfo] = useState('');
  const [subtypeId, setSubtypeId] = useState<number | null>(null);
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

    if (!subtypeId) {
      setError('Please select a category.');
      return;
    }

    try {
      await axios.post('/api/admin/food', { name, price, info, subtypeId });
      router.push('/admin/food');
    } catch (error) {
      setError('Failed to add food item.');
    }
  };

  return (
    <AdminLayout>
      <div className="topSingleBkg">
        <div className="item-img" style={{ backgroundImage: 'url(/img/banner.jpg)' }}></div>
        <div className="inner-desc">
          <h1 className="single-post-title">Add New Food Item</h1>
        </div>
      </div>
      <div className="container" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div style={formContainerStyle}>
          <form onSubmit={handleSubmit}>
            {error && <p style={errorStyle}>{error}</p>}
            <input
              type="text"
              placeholder="Name"
              style={inputStyle}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Price"
              style={inputStyle}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <textarea
              placeholder="Info"
              style={inputStyle}
              value={info}
              onChange={(e) => setInfo(e.target.value)}
            />
            <select
              style={inputStyle}
              onChange={(e) => setSubtypeId(Number(e.target.value))}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
            <button type="submit" className="view-more">
              Add Food Item
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps<NewFoodPageProps> = async () => {
  const categories = await getCategories();
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
};

export default NewFoodPage;
