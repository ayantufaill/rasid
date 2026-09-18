import { useAppState } from '../../state/AppState';
import { Panel, Bars, RTable } from '../../components/ui';

const GRADE_COLOR = { A: 'var(--green)', B: 'var(--green)', C: 'var(--amber)', D: 'var(--red)' };
const AVG_DAYS = { A: '1.4', B: '2.1', C: '3.8', D: '6.2' };

export default function Contractors() {
  const { toast, contractors } = useAppState();
  const withRate = contractors.map((c) => ({ ...c, rate: c.mh ? (c.hz / c.mh) * 100000 : 0 }));

  return (
    <div>
      <div className="dtop">
        <div>
          <div className="dtitle display">Contractor scorecards</div>
          <div className="dsub">Hazards normalised per 100,000 man-hours — comparable across trades and headcounts</div>
        </div>
      </div>

      <Panel title="Ranking">
        <RTable
          columns={[
            { key: 'n', header: 'Contractor', render: (c) => <span style={{ fontWeight: 500 }}>{c.n}</span> },
            {
              key: 'sc',
              header: 'Grade',
              render: (c) => (
                <span className="tg" style={{ background: `${GRADE_COLOR[c.sc]}22`, color: GRADE_COLOR[c.sc] }}>
                  {c.sc}
                </span>
              ),
            },
            { key: 'hz', header: 'Open hazards', render: (c) => c.hz },
            { key: 'mh', header: 'Man-hours', render: (c) => <span className="idc">{c.mh.toLocaleString()}</span> },
            {
              key: 'rate',
              header: 'Rate /100k',
              render: (c) => (
                <span style={{ fontFamily: 'IBM Plex Mono', color: c.rate > 40 ? 'var(--red)' : c.rate > 28 ? 'var(--amber)' : 'var(--green)' }}>
                  {c.rate.toFixed(1)}
                </span>
              ),
            },
            { key: 'cl', header: 'Closure rate', render: (c) => `${c.cl}%` },
            { key: 'days', header: 'Avg days to fix', render: (c) => AVG_DAYS[c.sc] },
          ]}
          rows={withRate}
          getKey={(c) => c.n}
          onRowClick={(c) => toast(`Scorecard exported for ${c.n}`)}
        />
      </Panel>

      <div className="g2">
        <Panel title="Hazard rate per 100k man-hours">
          <Bars
            rows={withRate.map((c) => ({
              label: c.n,
              value: (c.rate / 50) * 100,
              display: c.rate.toFixed(1),
              color: c.rate > 40 ? 'var(--red)' : c.rate > 28 ? 'var(--amber)' : 'var(--green)',
            }))}
          />
          <div style={{ fontSize: 11.5, color: 'var(--faint)', marginTop: 14, lineHeight: 1.5 }}>
            Raw counts mislead — the biggest contractor always looks worst. Normalising by exposure hours is what makes this defensible in a commercial meeting.
          </div>
        </Panel>
        <Panel title="Closure discipline">
          <Bars
            rows={contractors.map((c) => ({
              label: c.n,
              value: c.cl,
              display: `${c.cl}%`,
              color: c.cl > 85 ? 'var(--green)' : c.cl > 70 ? 'var(--amber)' : 'var(--red)',
            }))}
          />
          <div style={{ fontSize: 11.5, color: 'var(--faint)', marginTop: 14, lineHeight: 1.5 }}>
            Al Sahra Steel closes 62% of what's raised against them and takes 6.2 days. That single row is the one that gets read in a commercial review — and it's why this page sells the product past the HSE department.
          </div>
        </Panel>
      </div>
    </div>
  );
}
