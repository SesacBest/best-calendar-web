import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useMyHistory } from './MyHistoryProvider';

export default function HistoryContainer({ children }) {
  const { push } = useMyHistory();
  const location = useLocation();

  useEffect(() => {
    push(location.pathname);
  }, [location]);

  return <>{children}</>;
}
