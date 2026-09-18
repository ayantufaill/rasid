import Icon from '../../components/Icon';
import { I } from '../../data/icons';
import { useAppState } from '../../state/AppState';
import { Panel, Bars, RiskMatrix, KV } from '../../components/ui';

const MATRIX_HEADERS = ['Rare', 'Unlikely', 'Possible', 'Likely', 'Almost certain'];
const MATRIX_ROWS = [
  ['Catastrophic', [0, 0, 1, 2, 0]],
  ['Major', [0, 1, 3, 4, 1]],
  ['Moderate', [1, 2, 5, 3, 0]],
  ['Minor', [2, 4, 3, 1, 0]],
  ['Negligible', [1, 2, 1, 0, 0]],
];

const ZONE_FORECAST = [
  ['A1 Coastal scaffolding', 87, '#E5484D', '7 clusters, 3 recurrences'],
  ['A2 Utility corridor', 64, '#F2994A', 'Confined space + trench'],
  ['B1 Steel yard', 52, '#FFB020', 'Lifting near-misses rising'],
  ['C1 Electrical', 38, '#4FA3C7', 'Stable'],
  ['C2 Concrete', 31, '#4FA3C7', 'Stable'],
  ['D1 Logistics', 18, '#3ECF8E', 'Low exposure'],
];

const EXPORTS = ['Client monthly HSE report', 'ISO 45001 evidence pack', 'Contractor scorecard set', 'Incident investigation file', 'Regulatory submission — MHRSD'];

export default function Analytics() {
  const { toast } = useAppState();
  return (
    <div>
      <div className="dtop">
        <div>
          <div className="dtitle display">Trends &amp; risk</div>
          <div className="dsub">Where the next incident is most likely, and whether the system is actually working</div>
        </div>
      </div>

      <div className="g2">
        <Panel title="Risk matrix — open hazards">
          <RiskMatrix headers={MATRIX_HEADERS} rows={MATRIX_ROWS} />
          <div style={{ fontSize: 11.5, color: 'var(--faint)', marginTop: 14, lineHeight: 1.5 }}>
            Three hazards sit in the catastrophic band. Those are the ones the package manager should be personally tracking, and they should never be more than a click from the front page.
          </div>
        </Panel>
        <Panel title="Zone risk forecast — next 14 days">
          <Bars rows={ZONE_FORECAST.map(([n, v, c, note]) => ({ label: n, value: v, display: v, color: c, title: note }))} />
          <div style={{ fontSize: 11.5, color: 'var(--faint)', marginTop: 14, lineHeight: 1.5 }}>
            Scored from cluster density, near-miss ratio, recurrence, overdue actions, contractor grade and heat exposure. Treat it as where to walk today, not as a prediction.
          </div>
        </Panel>
      </div>

      <div className="g2">
        <Panel title="Is the system working?">
          <KV k="Reports per engineer per week" v={<>4.7 <span style={{ color: 'var(--green)', fontSize: 11 }}>↑ from 1.2</span></>} />
          <KV k="Reports leading to a physical change" v="68%" />
          <KV k="Median report to action" v="2.4 days" />
          <KV k="Recurrence rate" v="11%" tone="var(--amber)" />
          <KV k="Near-miss share of reports" v="17%" />
          <KV k="Anonymous reports" v="9%" />
          <div style={{ fontSize: 11.5, color: 'var(--faint)', marginTop: 12, lineHeight: 1.5 }}>
            Rising report volume with a flat incident rate is the success pattern. Falling volume usually means people stopped believing anything happens.
          </div>
        </Panel>
        <Panel title="Export">
          <div className="dd" style={{ marginBottom: 14 }}>
            One-click packs that currently take a safety team two days a month to assemble by hand.
          </div>
          {EXPORTS.map((e) => (
            <button className="ckrow" key={e} onClick={() => toast(`${e} generated`)}>
              <div className="box">
                <Icon path={I.clip} color="#5E6C76" size={13} />
              </div>
              <div className="ct">{e}</div>
            </button>
          ))}
        </Panel>
      </div>
    </div>
  );
}
