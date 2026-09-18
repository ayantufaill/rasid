import { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import Icon from '../../components/Icon';
import { I } from '../../data/icons';
import { useAppState } from '../../state/AppState';

export default function Lone() {
  const { toast } = useAppState();
  const [checkins, setCheckins] = useState(['07:15 · Gate 2', '08:20 · Trench corridor', '09:10 · Trench corridor']);

  function checkIn() {
    const t = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setCheckins((prev) => [...prev, `${t} · Trench corridor`]);
    toast("Checked in — next check-in in 45 min");
  }

  return (
    <div>
      <PageHeader title="Lone working" back="/" />
      <div style={{ textAlign: 'center', padding: '24px 0 8px' }}>
        <div className="ring" style={{ borderColor: 'var(--blue)', background: 'rgba(79,163,199,.12)' }}>
          <Icon path={I.pin} color="#4FA3C7" size={26} />
        </div>
        <div style={{ fontFamily: 'Archivo', fontWeight: 700, fontSize: 17 }}>Check in</div>
        <div style={{ fontSize: 12, color: 'var(--faint)', marginTop: 6, lineHeight: 1.5 }}>
          Working alone in the trench corridor.
          <br />
          Next check-in due 09:55.
        </div>
      </div>
      <button className="prim" style={{ margin: '14px 0 10px' }} onClick={checkIn}>
        I'm OK — check in
      </button>
      <button className="ghost" style={{ borderColor: 'rgba(229,72,77,.5)', color: 'var(--red)' }} onClick={() => toast('Help alert sent to supervisor')}>
        I need help
      </button>
      <div className="info" style={{ marginTop: 16 }}>
        If you miss a check-in, the app alerts your supervisor with your last known position. Motion sensors also raise a man-down alert if the phone stops moving unexpectedly.
      </div>
      <div className="lbl">Today's check-ins</div>
      {checkins.map((t, i) => (
        <div className="ckrow pass" key={i} style={{ cursor: 'default' }}>
          <div className="box">
            <Icon path={I.chk} color="#0e1b12" size={13} />
          </div>
          <div className="ct">{t}</div>
        </div>
      ))}
    </div>
  );
}
