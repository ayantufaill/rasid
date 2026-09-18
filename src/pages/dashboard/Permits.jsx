import { StripStats, Panel, RTable } from '../../components/ui';

const PERMITS = [
  ['PTW-4412', 'Work at height', 'A1', 'Al Sahra Steel', '17:00', 'valid', 'Valid'],
  ['PTW-4409', 'Hot work', 'B1', 'Gulf Mechanical', '08:00', 'overdue', 'Expired'],
  ['PTW-4418', 'Confined space', 'A2', 'Rawabi Civils', '15:30', 'due', '2 h left'],
  ['PTW-4421', 'Excavation', 'A2', 'Rawabi Civils', '18:00', 'valid', 'Valid'],
  ['PTW-4425', 'Live electrical', 'C1', 'Noor Electrical', '16:00', 'valid', 'Valid'],
];

export default function Permits() {
  return (
    <div>
      <div className="dtop">
        <div>
          <div className="dtitle display">Permits to work</div>
          <div className="dsub">Read-only view in v1 — issued in the project system, surfaced here for field visibility</div>
        </div>
      </div>

      <StripStats
        items={[
          { n: 18, l: 'Active today' },
          { n: 1, l: 'Expired, work observed', tone: 'red' },
          { n: 5, l: 'Expiring in 2 h', tone: 'amber' },
          { n: 3, l: 'High-risk open', d: 'confined space' },
        ]}
      />

      <Panel title="Active permits">
        <RTable
          columns={[
            { key: 'id', header: 'Permit', render: (r) => <span className="idc">{r[0]}</span> },
            { key: 'type', header: 'Type', render: (r) => r[1] },
            { key: 'zone', header: 'Zone', render: (r) => r[2] },
            { key: 'holder', header: 'Holder', render: (r) => r[3] },
            { key: 'valid', header: 'Valid until', render: (r) => r[4] },
            { key: 'state', header: 'State', render: (r) => <span className={`tg tg-${r[5]}`}>{r[6]}</span> },
          ]}
          rows={PERMITS}
          getKey={(r) => r[0]}
        />
        <div style={{ fontSize: 11.5, color: 'var(--faint)', marginTop: 13, lineHeight: 1.5 }}>
          PTW-4409 expired at 08:00 and hot work was observed at 09:15 by a field report. That cross-check — permit state against live observations — is the value here without taking on permit issuance itself.
        </div>
      </Panel>
    </div>
  );
}
