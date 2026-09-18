import { StripStats, Panel, RTable, Bars } from '../../components/ui';

const EXPIRING = [
  ['R. Kumar', 'Scaffold inspector', 'Al Sahra Steel', 'expired', 'Expired 2 d'],
  ['M. Reyes', 'Rigger level 2', 'Gulf Mechanical', 'expired', 'Expired 5 d'],
  ['A. Hussain', 'Confined space entrant', 'Rawabi Civils', 'expired', 'Expired today'],
  ['S. Iqbal', 'Crane operator', 'Gulf Mechanical', 'due', '9 days'],
  ['B. Ahmed', 'First aider', 'Noor Electrical', 'due', '22 days'],
];

const TALKS = [
  ['Dropped objects', 94, '#3ECF8E'],
  ['Heat stress', 88, '#3ECF8E'],
  ['Excavation safety', 71, '#FFB020'],
  ['Manual handling', 62, '#F2994A'],
  ['Lifting exclusion', 49, '#E5484D'],
];

export default function People() {
  return (
    <div>
      <div className="dtop">
        <div>
          <div className="dtitle display">People &amp; competency</div>
          <div className="dsub">Cards, certifications, inductions and training — expiry is the whole point</div>
        </div>
      </div>

      <StripStats
        items={[
          { n: 418, l: 'Workers on package' },
          { n: 3, l: 'Expired certs, on site', tone: 'red' },
          { n: 14, l: 'Expiring in 30 days', tone: 'amber' },
          { n: '100%', l: 'Inducted', tone: 'green' },
        ]}
      />

      <div className="g2">
        <Panel title="Expiring competencies">
          <RTable
            columns={[
              { key: 'w', header: 'Worker', render: (r) => r[0] },
              { key: 'c', header: 'Competency', render: (r) => r[1] },
              { key: 'ctr', header: 'Contractor', render: (r) => <span style={{ color: 'var(--dim)' }}>{r[2]}</span> },
              { key: 'exp', header: 'Expires', render: (r) => <span className={`tg tg-${r[3]}`}>{r[4]}</span> },
            ]}
            rows={EXPIRING}
            getKey={(r) => r[0] + r[1]}
          />
          <div style={{ fontSize: 11.5, color: 'var(--faint)', marginTop: 12 }}>
            Expired scaffold inspector is the serious one — every tag he signed this week needs re-checking.
          </div>
        </Panel>
        <Panel title="Toolbox talks this week">
          <Bars rows={TALKS.map(([n, v, c]) => ({ label: n, value: v, display: `${v}%`, color: c }))} />
          <div style={{ fontSize: 11.5, color: 'var(--faint)', marginTop: 14, lineHeight: 1.5 }}>
            Attendance as a share of the crews the talk was targeted at. Topics are generated from the week's top hazard clusters.
          </div>
        </Panel>
      </div>
    </div>
  );
}
