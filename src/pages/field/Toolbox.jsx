import { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import Icon from '../../components/Icon';
import { I } from '../../data/icons';

const SIGNED = ['Rashid K.', 'Imran S.', 'Bilal A.', 'Ganesh P.', 'Marlon R.'];

export default function Toolbox() {
  const [abdulSigned, setAbdulSigned] = useState(false);
  return (
    <div>
      <PageHeader title="Toolbox talk" back="/" />
      <div className="card static" style={{ background: 'rgba(155,138,251,.08)', borderColor: 'rgba(155,138,251,.3)' }}>
        <div className="ic" style={{ background: 'rgba(155,138,251,.2)' }}>
          <Icon path={I.talk} color="#9B8AFB" />
        </div>
        <div className="bd">
          <div className="ti">Dropped objects prevention</div>
          <div className="mt">Auto-suggested — your zone logged 7 falling-object reports this week</div>
        </div>
      </div>

      <div className="lbl">Talking points</div>
      <div style={{ fontSize: 12.5, color: 'var(--dim)', lineHeight: 1.65, background: 'var(--panel)', border: '1px solid var(--line)', borderRadius: 7, padding: 13 }}>
        1. Toe-boards and mesh on every working platform
        <br />
        2. Tool tethers above 2 m — no exceptions
        <br />
        3. Nothing stored on handrails or open edges
        <br />
        4. Exclusion zones below active lifting
        <br />
        5. Netting is going up in Bay 3 this week — here's why
      </div>

      <div className="lbl">
        <span>Attendance</span>
        <span className="c">{(abdulSigned ? 6 : 5)} of 12</span>
      </div>
      {SIGNED.map((n) => (
        <div className="ckrow pass" key={n} style={{ cursor: 'default' }}>
          <div className="box">
            <Icon path={I.chk} color="#0e1b12" size={13} />
          </div>
          <div>
            <div className="ct">{n}</div>
            <div className="cs">Signed on device · 07:34</div>
          </div>
        </div>
      ))}
      <button className={`ckrow${abdulSigned ? ' pass' : ''}`} onClick={() => setAbdulSigned(true)}>
        <div className="box">{abdulSigned && <Icon path={I.chk} color="#0e1b12" size={13} />}</div>
        <div>
          <div className="ct">Abdul H.</div>
          <div className="cs">{abdulSigned ? 'Signed on device · just now' : 'Not yet signed — tap to sign'}</div>
        </div>
      </button>

      <div className="info">
        Attendance signatures are captured on the device. The record links back to the cluster that triggered this talk — proof the data changed behaviour.
      </div>
    </div>
  );
}
