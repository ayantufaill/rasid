import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { INITIAL_REPORTS } from '../data/mockData';

const AppStateContext = createContext(null);

export function AppStateProvider({ children }) {
  const [reports, setReports] = useState(INITIAL_REPORTS);
  const [zoneFilter, setZoneFilter] = useState(null);
  const [drawerId, setDrawerId] = useState(null);
  const [toastMsg, setToastMsg] = useState('');
  const [toastOn, setToastOn] = useState(false);
  const toastTimer = useRef(null);
  const ticketRef = useRef(71);

  const toast = useCallback((msg) => {
    setToastMsg(msg);
    setToastOn(true);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastOn(false), 2400);
  }, []);

  const nextTicket = useCallback(() => {
    ticketRef.current += 1;
    return ticketRef.current;
  }, []);

  const addReport = useCallback((report) => {
    setReports((prev) => [report, ...prev]);
  }, []);

  const advanceReport = useCallback(
    (id) => {
      let nextStatus = null;
      setReports((prev) =>
        prev.map((r) => {
          if (r.id !== id) return r;
          nextStatus = r.st === 'verify' ? 'resolved' : 'verify';
          return { ...r, st: nextStatus };
        })
      );
      return nextStatus;
    },
    []
  );

  const value = useMemo(
    () => ({
      reports,
      setReports,
      zoneFilter,
      setZoneFilter,
      drawerId,
      openDrawer: setDrawerId,
      closeDrawer: () => setDrawerId(null),
      toast,
      toastMsg,
      toastOn,
      nextTicket,
      addReport,
      advanceReport,
    }),
    [reports, zoneFilter, drawerId, toast, toastMsg, toastOn, nextTicket, addReport, advanceReport]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider');
  return ctx;
}
