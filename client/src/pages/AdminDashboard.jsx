import { useState, useEffect } from 'react';
import API from '../api';
import { useToast } from '../context/ToastContext';

export default function AdminDashboard() {
  const { addToast } = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Electronics',
    image: '',
    stock: '',
  });

  const categories = ['Electronics', 'Fashion', 'Home & Living', 'Sports', 'Accessories', 'Books'];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get('/products');
      setProducts(data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      };

      if (editingProduct) {
        await API.put(`/products/${editingProduct._id}`, payload);
        addToast('Product updated successfully');
      } else {
        await API.post('/products', payload);
        addToast('Product created successfully');
      }

      setShowForm(false);
      setEditingProduct(null);
      setForm({ name: '', description: '', price: '', category: 'Electronics', image: '', stock: '' });
      fetchProducts();
    } catch (err) {
      addToast(err.response?.data?.message || 'Operation failed', 'error');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      image: product.image,
      stock: product.stock.toString(),
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await API.delete(`/products/${id}`);
      addToast('Product deleted');
      fetchProducts();
    } catch (err) {
      addToast('Failed to delete product', 'error');
    }
  };

  const totalRevenue = products.reduce((sum, p) => sum + p.price * (p.numReviews || 0), 0);

  return (
    <div className="container section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xl)' }}>
        <h1 className="page-title" style={{ marginBottom: 0 }}>Admin Dashboard</h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditingProduct(null);
            setForm({ name: '', description: '', price: '', category: 'Electronics', image: '', stock: '' });
            setShowForm(!showForm);
          }}
          id="add-product-btn"
        >
          {showForm ? '✕ Close' : '+ Add Product'}
        </button>
      </div>

      {/* Stats */}
      <div className="admin-stats" id="admin-stats">
        <div className="stat-card">
          <h3>Total Products</h3>
          <div className="stat-value">{products.length}</div>
        </div>
        <div className="stat-card">
          <h3>Total Stock</h3>
          <div className="stat-value">
            {products.reduce((sum, p) => sum + p.stock, 0)}
          </div>
        </div>
        <div className="stat-card">
          <h3>Avg. Price</h3>
          <div className="stat-value">
            ${products.length > 0
              ? (products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(0)
              : 0}
          </div>
        </div>
      </div>

      {/* Product Form */}
      {showForm && (
        <div className="checkout-section" style={{ marginBottom: 'var(--space-xl)' }} id="product-form">
          <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
              <div className="input-group">
                <label>Product Name</label>
                <input
                  type="text"
                  name="name"
                  className="input-field"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label>Category</label>
                <select
                  name="category"
                  className="input-field"
                  value={form.category}
                  onChange={handleChange}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="input-group">
                <label>Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  className="input-field"
                  value={form.price}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  required
                />
              </div>
              <div className="input-group">
                <label>Stock</label>
                <input
                  type="number"
                  name="stock"
                  className="input-field"
                  value={form.stock}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>
            </div>
            <div className="input-group">
              <label>Image URL</label>
              <input
                type="text"
                name="image"
                className="input-field"
                value={form.image}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
              />
            </div>
            <div className="input-group">
              <label>Description</label>
              <textarea
                name="description"
                className="input-field"
                value={form.description}
                onChange={handleChange}
                rows="3"
                style={{ resize: 'vertical' }}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" id="save-product-btn">
              {editingProduct ? 'Update Product' : 'Create Product'}
            </button>
          </form>
        </div>
      )}

      {/* Products Table */}
      {loading ? (
        <div className="loading">
          <div className="spinner" />
        </div>
      ) : (
        <div className="checkout-section" style={{ overflow: 'auto' }}>
          <h2>Products ({products.length})</h2>
          <table className="admin-table" id="products-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 'var(--radius-sm)',
                          objectFit: 'cover',
                        }}
                      />
                      <span style={{ fontWeight: 500 }}>
                        {product.name.length > 30
                          ? product.name.substring(0, 30) + '...'
                          : product.name}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-accent">{product.category}</span>
                  </td>
                  <td style={{ fontWeight: 600 }}>₹{product.price.toFixed(0)}</td>
                  <td>
                    <span
                      className={`badge ${product.stock > 10 ? 'badge-success' : product.stock > 0 ? 'badge-warning' : 'badge-danger'}`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td>⭐ {product.rating.toFixed(1)}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleEdit(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
