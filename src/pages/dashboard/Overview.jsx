import { ZONES, SC } from '../../data/mockData';
import { useAppState } from '../../state/AppState';
import { Panel, StripStats, Spark, KV } from '../../components/ui';
import ReportsTable from './ReportsTable';

const WEEKS = [
  [38, 22], [44, 29], [51, 31], [47, 38], [58, 41], [52, 47], [61, 49], [57, 52],
];
const WEEK_LABELS = ['W31', 'W32', 'W33', 'W34', 'W35', 'W36', 'W37', 'W38'];

export default function Overview() {
  const { zoneFilter, setZoneFilter } = useAppState();

  return (
    <div>
      <div className="dtop">
        <div>
          <div className="dtitle display">Coastal Package 3</div>
          <div className="dsub">8 modules · 46 field engineers · 4 subcontractors · live</div>
        </div>
        <input className="dsearch" placeholder="Search ticket, zone, keyword" />
      </div>

      <StripStats
        items={[
          { n: 34, l: 'Open hazards', d: '+6 this week' },
          { n: 5, l: 'Critical, unassigned', d: 'SLA breach in 4 h', tone: 'red' },
          { n: '2.4d', l: 'Report to action', d: 'target 1.0 d', tone: 'amber' },
          { n: 19, l: 'Verified closed', d: 'this week', tone: 'green' },
          { n: '0.41', l: 'TRIR (12-mo)', d: 'benchmark 0.60' },
        ]}
      />

      <div className="gsplit">
        <div>
          <Panel title="Modules" action={<button className="sm" onClick={() => setZoneFilter(null)}>reset</button>}>
            <div className="zgrid">
              {ZONES.map((z) => (
                <button key={z.id} className={`ztile${zoneFilter === z.id ? ' on' : ''}`} onClick={() => setZoneFilter(zoneFilter === z.id ? null : z.id)}>
                  <div className="zid">MODULE {z.id}</div>
                  <div className="zn">{z.n}</div>
                  <div className="zc">{z.o}</div>
                  <div className="zb" style={{ background: SC[z.s], width: `${Math.min(100, z.o * 8)}%` }} />
                </button>
              ))}
            </div>
          </Panel>
          <Panel title="Leading vs lagging">
            <KV k="Hazard observations" v="218" />
            <KV k="Near-misses" v="47" />
            <KV k="Unsafe acts" v="31" />
            <KV k="Good practice logged" v="24" />
            <KV k="Recordable incidents" v="2" tone="var(--red)" />
            <div style={{ fontSize: 11.5, color: 'var(--faint)', marginTop: 12, lineHeight: 1.5 }}>
              160 leading signals per lagging event. Below 50:1 usually means under-reporting, not a safer site.
            </div>
          </Panel>
        </div>
        <div>
          <ReportsTable title="Live hazard feed" />
          <Panel title="Hazards by week — reports vs verified closures">
            <Spark
              bars={WEEKS.map(([a, b]) => ({
                h: a,
                layers: [
                  { h: Math.round((b / a) * 100), color: 'var(--green)', z: 2 },
                  { h: 100, color: 'rgba(255,176,32,.35)', z: 1 },
                ],
              }))}
              xLabels={WEEK_LABELS}
              legend={[
                { color: 'rgba(255,176,32,.35)', label: 'Reported' },
                { color: 'var(--green)', label: 'Verified closed' },
              ]}
            />
          </Panel>
        </div>
      </div>
    </div>
  );
}
