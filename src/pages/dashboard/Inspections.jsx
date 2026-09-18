import { StripStats, Panel, RTable } from '../../components/ui';

const SCAFFOLDS = [
  ['S-A1-07', 'Bay 3 L4', '11 d', 'overdue', 'Red-tagged'],
  ['S-A1-12', 'Bay 1 L2', '3 d', 'valid', 'Green'],
  ['S-A2-04', 'Corridor N', '6 d', 'due', 'Due'],
  ['S-B1-02', 'Steel yard', '1 d', 'valid', 'Green'],
];

const EQUIPMENT = [
  ['Lifting slings ×40', 'B1', 'Quarterly', 'valid', 'Valid'],
  ['Harness kits ×62', 'All', 'Pre-use', 'due', '12 unchecked'],
  ['Fire extinguishers ×24', 'A1', 'Monthly', 'overdue', '2 overdue'],
  ['Eyewash stations ×6', 'C1', 'Weekly', 'valid', 'Valid'],
  ['First aid kits ×9', 'All', 'Monthly', 'due', 'Due Thu'],
];

export default function Inspections() {
  return (
    <div>
      <div className="dtop">
        <div>
          <div className="dtitle display">Inspections</div>
          <div className="dsub">Scaffold tags, lifting gear, harnesses, emergency equipment</div>
        </div>
      </div>

      <StripStats
        items={[
          { n: 142, l: 'Assets tracked' },
          { n: 6, l: 'Overdue', tone: 'red' },
          { n: 11, l: 'Due this week', tone: 'amber' },
          { n: 4, l: 'Red-tagged now', tone: 'red' },
          { n: '91%', l: 'On-time rate', tone: 'green' },
        ]}
      />

      <div className="g2">
        <Panel title="Scaffolds">
          <RTable
            columns={[
              { key: 'tag', header: 'Tag', render: (r) => <span className="idc">{r[0]}</span> },
              { key: 'loc', header: 'Location', render: (r) => r[1] },
              { key: 'last', header: 'Last', render: (r) => <span style={{ color: 'var(--faint)' }}>{r[2]}</span> },
              { key: 'state', header: 'State', render: (r) => <span className={`tg tg-${r[3]}`}>{r[4]}</span> },
            ]}
            rows={SCAFFOLDS}
            getKey={(r) => r[0]}
          />
        </Panel>
        <Panel title="Equipment & emergency gear">
          <RTable
            columns={[
              { key: 'item', header: 'Item', render: (r) => r[0] },
              { key: 'zone', header: 'Zone', render: (r) => r[1] },
              { key: 'cycle', header: 'Cycle', render: (r) => <span style={{ color: 'var(--faint)' }}>{r[2]}</span> },
              { key: 'state', header: 'State', render: (r) => <span className={`tg tg-${r[3]}`}>{r[4]}</span> },
            ]}
            rows={EQUIPMENT}
            getKey={(r) => r[0]}
          />
        </Panel>
      </div>
    </div>
  );
}
