import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import API from '../api';
import ProductCard from '../components/ProductCard';

const categories = ['Electronics', 'Fashion', 'Home & Living', 'Sports', 'Accessories', 'Books'];
const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price_asc', label: 'Price: Low → High' },
  { value: 'price_desc', label: 'Price: High → Low' },
  { value: 'rating', label: 'Top Rated' },
];

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest');
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (activeCategory) params.set('category', activeCategory);
        if (sortBy) params.set('sort', sortBy);
        if (searchTerm) params.set('search', searchTerm);

        const { data } = await API.get(`/products?${params.toString()}`);
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [activeCategory, sortBy, searchTerm]);

  const handleCategoryChange = (cat) => {
    const newCat = activeCategory === cat ? '' : cat;
    setActiveCategory(newCat);
    const params = new URLSearchParams(searchParams);
    if (newCat) params.set('category', newCat);
    else params.delete('category');
    setSearchParams(params, { replace: true });
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    const params = new URLSearchParams(searchParams);
    params.set('sort', e.target.value);
    setSearchParams(params, { replace: true });
  };

  return (
    <div className="container section">
      <h1 className="page-title">
        {activeCategory || 'All Products'}
        {searchTerm && <span style={{ color: 'var(--text-tertiary)', fontSize: '1rem', fontWeight: 400 }}> — results for "{searchTerm}"</span>}
      </h1>

      <div className="products-layout">
        {/* Filters Sidebar */}
        <aside className="filters-sidebar" id="filters-sidebar">
          <div className="filter-group">
            <h3>Categories</h3>
            {categories.map((cat) => (
              <label key={cat} className={`filter-option ${activeCategory === cat ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="category"
                  checked={activeCategory === cat}
                  onChange={() => handleCategoryChange(cat)}
                />
                {cat}
              </label>
            ))}
            {activeCategory && (
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => handleCategoryChange('')}
                style={{ marginTop: 'var(--space-sm)', width: '100%' }}
              >
                Clear Filter
              </button>
            )}
          </div>

          <div className="filter-group">
            <h3>Sort By</h3>
            <select
              className="input-field"
              value={sortBy}
              onChange={handleSortChange}
              id="sort-select"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </aside>

        {/* Products Grid */}
        <div>
          {loading ? (
            <div className="loading">
              <div className="spinner" />
            </div>
          ) : products.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🔍</div>
              <h2>No products found</h2>
              <p>Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <>
              <p style={{ color: 'var(--text-tertiary)', marginBottom: 'var(--space-lg)', fontSize: '0.9rem' }}>
                Showing {products.length} product{products.length !== 1 ? 's' : ''}
              </p>
              <div className="products-grid">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
