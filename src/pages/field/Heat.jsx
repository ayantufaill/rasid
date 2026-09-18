import PageHeader from '../../components/PageHeader';
import Icon from '../../components/Icon';
import { I } from '../../data/icons';

const REST_CHECKS = ['Shade structure intact', 'Water cooler working', 'Ice / cooling available', 'ORS sachets stocked'];
const FAIL_INDEX = 1;

export default function Heat() {
  return (
    <div>
      <PageHeader title="Heat & environment" back="/" />
      <div className="gauge">
        <div className="gnum" style={{ color: 'var(--orange)' }}>
          30.8
        </div>
        <div className="gunit">WBGT °C · Module A1 · 11:40</div>
        <div className="gbar">
          <div className="gtick" style={{ left: '63%' }} />
        </div>
        <div className="gscale">
          <span>Low</span>
          <span>Moderate</span>
          <span>High</span>
          <span>Extreme</span>
        </div>
      </div>

      <div className="card static" style={{ borderColor: 'rgba(242,153,74,.4)' }}>
        <div className="ic" style={{ background: 'rgba(242,153,74,.14)' }}>
          <Icon path={I.sun} color="#F2994A" />
        </div>
        <div className="bd">
          <div className="ti">Work / rest ratio now 45 / 15</div>
          <div className="mt">Shaded rest mandatory · drink 250 ml every 20 min</div>
        </div>
      </div>
      <div className="card static" style={{ borderColor: 'rgba(229,72,77,.4)' }}>
        <div className="ic" style={{ background: 'rgba(229,72,77,.14)' }}>
          <Icon path={I.warn} color="#E5484D" />
        </div>
        <div className="bd">
          <div className="ti">Midday ban 12:00 – 15:00</div>
          <div className="mt">Outdoor work prohibited · 15 June to 15 September</div>
        </div>
      </div>

      <div className="lbl">Rest area checks</div>
      {REST_CHECKS.map((t, i) => (
        <div className={`ckrow ${i === FAIL_INDEX ? 'fail' : 'pass'}`} key={t} style={{ cursor: 'default' }}>
          <div className="box">
            <Icon path={i === FAIL_INDEX ? I.x : I.chk} color={i === FAIL_INDEX ? '#fff' : '#0e1b12'} size={13} />
          </div>
          <div>
            <div className="ct">{t}</div>
            {i === FAIL_INDEX && <div className="cs">Not working — hazard raised, 4 reports open</div>}
          </div>
        </div>
      ))}

      <div className="lbl">Heat illness — spot the signs</div>
      <div style={{ fontSize: 12, color: 'var(--dim)', lineHeight: 1.6, background: 'var(--panel)', border: '1px solid var(--line)', borderRadius: 7, padding: 12 }}>
        Cramps · dizziness · confusion · stopped sweating · dark urine. Confusion or dry skin means move them to shade and call medical now.
      </div>
    </div>
  );
}
