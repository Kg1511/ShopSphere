import { useEffect, useState } from 'react';
import { useNavigation } from 'react-router-dom';

export default function TopLoader() {
  const navigation = useNavigation();
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (navigation.state === 'loading') {
      setVisible(true);
      setWidth(0);
      // Animate to 85% — we'll jump to 100% when done
      const t1 = setTimeout(() => setWidth(30), 50);
      const t2 = setTimeout(() => setWidth(60), 300);
      const t3 = setTimeout(() => setWidth(85), 700);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    } else if (navigation.state === 'idle' && visible) {
      setWidth(100);
      const t = setTimeout(() => { setVisible(false); setWidth(0); }, 400);
      return () => clearTimeout(t);
    }
  }, [navigation.state]);

  if (!visible) return null;

  return (
    <div className="top-loader-wrap">
      <div className="top-loader-bar" style={{ width: `${width}%` }} />
    </div>
  );
}
