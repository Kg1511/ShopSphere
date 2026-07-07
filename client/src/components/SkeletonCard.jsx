export default function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image skeleton-shimmer" />
      <div className="skeleton-body">
        <div className="skeleton-line skeleton-shimmer" style={{ width: '40%', height: '12px' }} />
        <div className="skeleton-line skeleton-shimmer" style={{ width: '90%', height: '16px', marginTop: '10px' }} />
        <div className="skeleton-line skeleton-shimmer" style={{ width: '70%', height: '16px', marginTop: '6px' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '14px' }}>
          <div className="skeleton-line skeleton-shimmer" style={{ width: '35%', height: '12px' }} />
          <div className="skeleton-line skeleton-shimmer" style={{ width: '25%', height: '12px' }} />
        </div>
        <div className="skeleton-line skeleton-shimmer" style={{ width: '50%', height: '20px', marginTop: '12px' }} />
        <div className="skeleton-btn skeleton-shimmer" />
      </div>
    </div>
  );
}
