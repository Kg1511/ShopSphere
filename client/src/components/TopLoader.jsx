import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function TopLoader() {
  const location = useLocation();
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(false);
  const prevPath = useRef(location.pathname + location.search);
  const timers = useRef([]);

  const clearTimers = () => timers.current.forEach(clearTimeout);

  useEffect(() => {
    const currentPath = location.pathname + location.search;
    if (currentPath === prevPath.current) return;
    prevPath.current = currentPath;

    // Start loader
    clearTimers();
    setVisible(true);
    setWidth(0);

    timers.current = [
      setTimeout(() => setWidth(30), 50),
      setTimeout(() => setWidth(65), 250),
      setTimeout(() => setWidth(85), 600),
      setTimeout(() => {
        setWidth(100);
        timers.current.push(
          setTimeout(() => { setVisible(false); setWidth(0); }, 350)
        );
      }, 900),
    ];

    return clearTimers;
  }, [location.pathname, location.search]);

  if (!visible) return null;

  return (
    <div className="top-loader-wrap">
      <div className="top-loader-bar" style={{ width: `${width}%` }} />
    </div>
  );
}
