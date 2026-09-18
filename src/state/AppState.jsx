import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { formatRelative } from '../lib/time';
import { useAuth } from './AuthContext';

const AppStateContext = createContext(null);

const REPORT_SELECT = 'id, zone_id, category, severity, kind, status, cluster_count, description, created_at, contractor:contractors(name)';

function mapRow(row) {
  return {
    id: row.id,
    z: row.zone_id,
    c: row.category,
    s: row.severity,
    r: row.cluster_count,
    st: row.status,
    a: formatRelative(row.created_at),
    k: row.kind,
    ctr: row.contractor?.name || '—',
    description: row.description,
    createdAt: row.created_at,
  };
}

export function AppStateProvider({ children }) {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const reportsRef = useRef([]);
  reportsRef.current = reports;
  const [zones, setZones] = useState([]);
  const [contractors, setContractors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [zoneFilter, setZoneFilter] = useState(null);
  const [drawerId, setDrawerId] = useState(null);
  const [toastMsg, setToastMsg] = useState('');
  const [toastOn, setToastOn] = useState(false);
  const toastTimer = useRef(null);

  const toast = useCallback((msg) => {
    setToastMsg(msg);
    setToastOn(true);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastOn(false), 2400);
  }, []);

  // initial load
  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const [reportsRes, zonesRes, contractorsRes] = await Promise.all([
        supabase.from('reports').select(REPORT_SELECT).order('created_at', { ascending: false }),
        supabase.from('zones').select('*'),
        supabase.from('contractors').select('*'),
      ]);
      if (cancelled) return;
      if (reportsRes.data) setReports(reportsRes.data.map(mapRow));
      if (zonesRes.data) setZones(zonesRes.data);
      if (contractorsRes.data) setContractors(contractorsRes.data);
      setLoading(false);
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // realtime: keep the feed live across tabs/devices
  useEffect(() => {
    const channel = supabase
      .channel('reports-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reports' }, (payload) => {
        if (payload.eventType === 'DELETE') {
          setReports((prev) => prev.filter((r) => r.id !== payload.old.id));
          return;
        }
        supabase
          .from('reports')
          .select(REPORT_SELECT)
          .eq('id', payload.new.id)
          .single()
          .then(({ data }) => {
            if (!data) return;
            const mapped = mapRow(data);
            setReports((prev) => {
              const exists = prev.some((r) => r.id === mapped.id);
              return exists ? prev.map((r) => (r.id === mapped.id ? mapped : r)) : [mapped, ...prev];
            });
          });
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const addReport = useCallback(
    async ({ category, severity, kind, clustered, zoneId = 'A1' }) => {
      for (let attempt = 0; attempt < 5; attempt++) {
        const ticket = `RSD-${zoneId}-0${Math.floor(Math.random() * 90 + 10)}`;
        const { data, error } = await supabase
          .from('reports')
          .insert({
            id: ticket,
            zone_id: zoneId,
            category,
            severity,
            kind,
            status: 'open',
            cluster_count: clustered ? 7 : 1,
            reporter_id: user?.id ?? null,
          })
          .select(REPORT_SELECT)
          .single();
        if (!error) {
          setReports((prev) => [mapRow(data), ...prev]);
          return data.id;
        }
        if (error.code !== '23505') throw error;
      }
      throw new Error('Could not allocate a ticket number — try again');
    },
    [user?.id]
  );

  const advanceReport = useCallback(async (id) => {
    const current = reportsRef.current.find((r) => r.id === id);
    if (!current) return null;
    const nextStatus = current.st === 'verify' ? 'resolved' : 'verify';
    const { data, error } = await supabase.from('reports').update({ status: nextStatus }).eq('id', id).select(REPORT_SELECT).single();
    if (error) throw error;
    const mapped = mapRow(data);
    setReports((prev) => prev.map((r) => (r.id === id ? mapped : r)));
    return nextStatus;
  }, []);

  // zones/contractors with live counts derived from current reports
  const zonesWithCounts = useMemo(
    () =>
      zones.map((z) => ({
        id: z.id,
        n: z.name,
        s: z.risk_level,
        o: reports.filter((r) => r.z === z.id && r.st !== 'resolved').length,
      })),
    [zones, reports]
  );

  const contractorsWithStats = useMemo(
    () =>
      contractors.map((c) => ({
        n: c.name,
        mh: c.man_hours,
        cl: c.closure_rate,
        sc: c.grade,
        hz: reports.filter((r) => r.ctr === c.name && r.st !== 'resolved').length,
      })),
    [contractors, reports]
  );

  const value = useMemo(
    () => ({
      reports,
      loading,
      zones: zonesWithCounts,
      contractors: contractorsWithStats,
      zoneFilter,
      setZoneFilter,
      drawerId,
      openDrawer: setDrawerId,
      closeDrawer: () => setDrawerId(null),
      toast,
      toastMsg,
      toastOn,
      addReport,
      advanceReport,
    }),
    [reports, loading, zonesWithCounts, contractorsWithStats, zoneFilter, drawerId, toast, toastMsg, toastOn, addReport, advanceReport]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider');
  return ctx;
}
