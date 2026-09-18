import { useAppState } from '../../state/AppState';
import { KV } from '../../components/ui';

const OTHER_CLUSTERS = [
  ['A2-031', 'Unbarricaded trench edges', 'Utility Corridor', 3, 'high'],
  ['A1-002', 'No water at rest areas', 'Coastal Package', 4, 'high'],
  ['B1-013', 'Reversing plant, no spotter', 'Steel Yard', 2, 'medium'],
  ['C1-022', 'Temporary power, exposed conductors', 'Electrical', 2, 'medium'],
];

export default function Clusters() {
  const { toast } = useAppState();
  return (
    <div>
      <div className="dtop">
        <div>
          <div className="dtitle display">Hazard clusters</div>
          <div className="dsub">Repeat reports grouped by location and cause — each one is a business case</div>
        </div>
      </div>

      <div className="pblk" style={{ borderColor: 'rgba(229,72,77,.35)' }}>
        <div className="pt">
          <span>A1-014 · Falling objects, Bay 3 Level 4</span>
          <span className="tg tg-assigned">Action assigned</span>
        </div>
        <div className="g3">
          <div>
            <div style={{ fontFamily: 'Archivo', fontWeight: 700, fontSize: 28 }}>7</div>
            <div className="stl">independent reports</div>
          </div>
          <div>
            <div style={{ fontFamily: 'Archivo', fontWeight: 700, fontSize: 28, color: 'var(--red)' }}>3</div>
            <div className="stl">near-misses in cluster</div>
          </div>
          <div>
            <div style={{ fontFamily: 'Archivo', fontWeight: 700, fontSize: 28 }}>~40</div>
            <div className="stl">workers pass below daily</div>
          </div>
        </div>
        <div className="dsec">
          <div className="dl">Why this cleared the threshold</div>
          <div className="dd">
            Four separate crews reported the same cause independently over 9 days. Two reports were near-misses — a dropped scaffold clip and a hand tool — both landing inside an active walkway. The cluster auto-escalated at report five.
          </div>
        </div>
        <div className="dsec">
          <div className="dl">Proposed control</div>
          <KV k="Control" v="Debris netting, 340 m²" />
          <KV k="Hierarchy level" v="Engineering (3 of 5)" />
          <KV k="Cost" v="SAR 46,000" />
          <KV k="Install window" v="2 shifts, no production stop" />
          <KV k="Alternative rejected" v="Exclusion zone — blocks main access route" />
        </div>
        <div className="dact">
          <button className="prim" style={{ flex: 1 }} onClick={() => toast('Netting approved — work order raised')}>
            Approve control
          </button>
          <button className="ghost" style={{ flex: 1, marginTop: 0 }} onClick={() => toast('Business case exported')}>
            Export business case
          </button>
        </div>
      </div>

      <div className="g2">
        {OTHER_CLUSTERS.map(([id, t, z, n, s]) => (
          <div className="pblk" style={{ marginBottom: 0 }} key={id}>
            <div className="pt">
              <span>{id}</span>
              <span className={`sev sev-${s}`}>{s}</span>
            </div>
            <div style={{ fontSize: 13.5, fontWeight: 500, marginBottom: 5 }}>{t}</div>
            <div style={{ fontSize: 11.5, color: 'var(--faint)' }}>
              {z} · {n} reports · threshold reached
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
