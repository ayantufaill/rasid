import { StripStats, Panel, Spark, RTable } from '../../components/ui';

const HOURS = [52, 58, 66, 74, 86, 94, 97, 88, 76, 64, 55, 48];
const HOUR_LABELS = ['6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17'];

const REST_AREAS = [
  ['A1 coastal', 'OK', 'Failed', 'OK', 'overdue', 'Action open'],
  ['A2 corridor', 'OK', 'OK', 'Low', 'due', 'Restock'],
  ['B1 yard', 'OK', 'OK', 'OK', 'valid', 'OK'],
  ['C1 rough-in', 'Torn', 'OK', 'OK', 'overdue', 'Action open'],
  ['D1 logistics', 'OK', 'OK', 'OK', 'valid', 'OK'],
];

function bandColor(v) {
  return v > 88 ? 'var(--red)' : v > 72 ? 'var(--orange)' : v > 58 ? 'var(--amber)' : 'var(--green)';
}

export default function HeatEnv() {
  return (
    <div>
      <div className="dtop">
        <div>
          <div className="dtitle display">Heat &amp; environment</div>
          <div className="dsub">WBGT, midday ban compliance, dust, noise and wind limits</div>
        </div>
      </div>

      <StripStats
        items={[
          { n: 30.8, l: 'Peak WBGT today', d: 'Module A1, 11:40', tone: 'amber' },
          { n: 2, l: 'Midday ban breaches', d: 'this week', tone: 'red' },
          { n: '45/15', l: 'Work / rest enforced' },
          { n: 4, l: 'Rest areas failing', d: 'water or shade', tone: 'red' },
          { n: 18, l: 'Wind km/h', d: 'lifting limit 32', tone: 'amber' },
        ]}
      />

      <div className="g2">
        <Panel title="WBGT across the day — all modules">
          <Spark
            bars={HOURS.map((v) => ({ h: v, layers: [{ h: 100, color: bandColor(v), z: 1 }] }))}
            xLabels={HOUR_LABELS}
            legend={[
              { color: 'var(--green)', label: 'Low' },
              { color: 'var(--amber)', label: 'Moderate' },
              { color: 'var(--orange)', label: 'High' },
              { color: 'var(--red)', label: 'Extreme' },
            ]}
          />
          <div style={{ fontSize: 11.5, color: 'var(--faint)', marginTop: 12 }}>
            Midday ban window 12:00–15:00 covers the peak but 11:00 already reads extreme. Worth moving the shift start earlier.
          </div>
        </Panel>
        <Panel title="Rest area status">
          <RTable
            columns={[
              { key: 'loc', header: 'Location', render: (r) => r[0] },
              { key: 'shade', header: 'Shade', render: (r) => r[1] },
              { key: 'water', header: 'Water', render: (r) => <span style={{ color: r[2] === 'Failed' ? 'var(--red)' : 'inherit' }}>{r[2]}</span> },
              { key: 'ors', header: 'ORS', render: (r) => r[3] },
              { key: 'state', header: 'State', render: (r) => <span className={`tg tg-${r[4]}`}>{r[5]}</span> },
            ]}
            rows={REST_AREAS}
            getKey={(r) => r[0]}
          />
          <div style={{ fontSize: 11.5, color: 'var(--faint)', marginTop: 12 }}>
            Four field reports flagged the A1 cooler before the scheduled check caught it. That's the leading-indicator system working.
          </div>
        </Panel>
      </div>
    </div>
  );
}
