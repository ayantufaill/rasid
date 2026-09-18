import { StripStats, Panel, Bars, RTable } from '../../components/ui';

const HIERARCHY = [
  ['Elimination', 4, '#3ECF8E'],
  ['Substitution', 7, '#3ECF8E'],
  ['Engineering', 60, '#FFB020'],
  ['Administrative', 21, '#F2994A'],
  ['PPE only', 8, '#E5484D'],
];

const OVERDUE = [
  ['RSD-A2-028', 'Rawabi Civils', 'Gas test procedure', '3 d'],
  ['RSD-A1-021', 'Al Sahra Steel', 'Edge protection', '2 d'],
  ['RSD-C1-022', 'Noor Electrical', 'Enclosure fitted', '1 d'],
];

const RECURRENCE = [
  ['B1 steel yard', 'Reversing plant', '2 Aug', '19 days', 'Toolbox talk'],
  ['C2 pour zone', 'Blocked walkway', '14 Aug', '8 days', 'Housekeeping notice'],
  ['A2 corridor', 'Trench edge', '29 Jul', '26 days', 'Verbal instruction'],
];

export default function Actions() {
  return (
    <div>
      <div className="dtop">
        <div>
          <div className="dtitle display">Corrective actions</div>
          <div className="dsub">Every control with a named owner, an SLA clock, and a verification photo</div>
        </div>
      </div>

      <StripStats
        items={[
          { n: 12, l: 'Actions in flight' },
          { n: 3, l: 'Past SLA', tone: 'red' },
          { n: 4, l: 'Awaiting verification', tone: 'amber' },
          { n: '71%', l: 'Engineering controls', d: 'vs admin/PPE', tone: 'green' },
        ]}
      />

      <div className="g2">
        <Panel title="Controls by hierarchy level">
          <Bars rows={HIERARCHY.map(([n, v, c]) => ({ label: n, value: v, display: `${v}%`, color: c }))} />
          <div style={{ fontSize: 11.5, color: 'var(--faint)', marginTop: 14, lineHeight: 1.5 }}>
            A healthy project sits high on this list. If most of your closures are "toolbox talk delivered", you're managing paperwork, not risk.
          </div>
        </Panel>
        <Panel title="Overdue actions">
          <RTable
            columns={[
              { key: 'id', header: 'Ticket', render: (r) => <span className="idc">{r[0]}</span> },
              { key: 'owner', header: 'Owner', render: (r) => r[1] },
              { key: 'control', header: 'Control', render: (r) => r[2] },
              { key: 'overdue', header: 'Overdue', render: (r) => <span className="tg tg-overdue">{r[3]}</span> },
            ]}
            rows={OVERDUE}
            getKey={(r) => r[0]}
          />
        </Panel>
      </div>

      <Panel title="Recurrence watch">
        <div className="dd" style={{ marginBottom: 14 }}>
          Hazards closed once and reported again in the same location. Recurrence means the control was the wrong one — the most valuable signal in the system.
        </div>
        <RTable
          columns={[
            { key: 'loc', header: 'Location', render: (r) => r[0] },
            { key: 'hz', header: 'Hazard', render: (r) => r[1] },
            { key: 'closed', header: 'Closed', render: (r) => <span style={{ color: 'var(--faint)' }}>{r[2]}</span> },
            { key: 'returned', header: 'Returned after', render: (r) => <span className="tg tg-overdue">{r[3]}</span> },
            { key: 'orig', header: 'Original control', render: (r) => <span style={{ color: 'var(--dim)' }}>{r[4]}</span> },
          ]}
          rows={RECURRENCE}
          getKey={(r) => r[0] + r[1]}
        />
        <div style={{ fontSize: 11.5, color: 'var(--faint)', marginTop: 12 }}>
          All three recurrences were closed with administrative controls. That is the pattern worth showing a project director.
        </div>
      </Panel>
    </div>
  );
}
