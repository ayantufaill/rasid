import { useMemo, useState } from 'react';
import { CATS, KINDL, catLabel } from '../../data/mockData';
import { useAppState } from '../../state/AppState';
import { Panel, RTable, SevBadge, StatusTag } from '../../components/ui';

const SEVERITIES = ['critical', 'high', 'medium', 'low'];
const KIND_OPTIONS = [
  ['hazard', 'Hazard'],
  ['nearmiss', 'Near-miss'],
  ['unsafeact', 'Unsafe act'],
  ['positive', 'Good practice'],
];
const STATUS_OPTIONS = [
  ['open', 'Open'],
  ['assigned', 'Assigned'],
  ['verify', 'Awaiting verify'],
  ['resolved', 'Closed'],
];

export default function ReportsTable({ title, wide }) {
  const { reports, loading, zoneFilter, openDrawer } = useAppState();
  const [fc, setFc] = useState('');
  const [fs, setFs] = useState('');
  const [fk, setFk] = useState('');
  const [fst, setFst] = useState('');

  const rows = useMemo(
    () =>
      reports.filter((r) => {
        if (zoneFilter && r.z !== zoneFilter) return false;
        if (fc && r.c !== fc) return false;
        if (fs && r.s !== fs) return false;
        if (fk && r.k !== fk) return false;
        if (fst && r.st !== fst) return false;
        return true;
      }),
    [reports, zoneFilter, fc, fs, fk, fst]
  );

  const columns = [
    { key: 'id', header: 'Ticket', render: (r) => <span className="idc">{r.id}</span> },
    { key: 'z', header: 'Module' },
    { key: 'c', header: 'Category', render: (r) => catLabel(r.c) },
    { key: 'k', header: 'Type', render: (r) => KINDL[r.k] || r.k },
    { key: 's', header: 'Sev', render: (r) => <SevBadge sev={r.s} /> },
    { key: 'r', header: 'Reports' },
    ...(wide ? [{ key: 'ctr', header: 'Contractor' }] : []),
    { key: 'st', header: 'Status', render: (r) => <StatusTag status={r.st} /> },
    { key: 'a', header: 'Age' },
  ];

  const count = loading
    ? 'Loading…'
    : (zoneFilter ? `Module ${zoneFilter} — ` : '') + `${rows.length} record${rows.length !== 1 ? 's' : ''}`;

  return (
    <Panel title={title ? `${title} · ${count}` : count}>
      <div className="filt">
        <select value={fc} onChange={(e) => setFc(e.target.value)}>
          <option value="">All categories</option>
          {CATS.map((c) => (
            <option key={c.id} value={c.id}>
              {c.l}
            </option>
          ))}
        </select>
        <select value={fs} onChange={(e) => setFs(e.target.value)}>
          <option value="">All severities</option>
          {SEVERITIES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select value={fk} onChange={(e) => setFk(e.target.value)}>
          <option value="">All types</option>
          {KIND_OPTIONS.map(([v, l]) => (
            <option key={v} value={v}>
              {l}
            </option>
          ))}
        </select>
        <select value={fst} onChange={(e) => setFst(e.target.value)}>
          <option value="">All statuses</option>
          {STATUS_OPTIONS.map(([v, l]) => (
            <option key={v} value={v}>
              {l}
            </option>
          ))}
        </select>
      </div>
      <RTable columns={columns} rows={rows} getKey={(r) => r.id} onRowClick={(r) => openDrawer(r.id)} />
    </Panel>
  );
}
