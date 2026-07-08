import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import API from '../api';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';

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
  
  const activeCategory = searchParams.get('category') || '';
  const sortBy = searchParams.get('sort') || 'newest';
  const searchTerm = searchParams.get('search') || '';

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
    const params = new URLSearchParams(searchParams);
    if (newCat) params.set('category', newCat);
    else params.delete('category');
    setSearchParams(params, { replace: true });
  };

  const handleSortChange = (e) => {
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
              <div 
                key={cat} 
                className={`filter-option ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat}
              </div>
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
            <div className="products-grid">
              {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : products.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon"><Search size={48} color="var(--text-tertiary)" /></div>
              <h2>No products found</h2>
              <p>Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <>
              <p style={{ color: 'var(--text-tertiary)', marginBottom: 'var(--space-lg)', fontSize: '0.9rem' }}>
                Showing {products.length} product{products.length !== 1 ? 's' : ''}
              </p>
              <div className="products-grid">
                {products.map((product, i) => (
                  <ProductCard key={product._id} product={product} index={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
