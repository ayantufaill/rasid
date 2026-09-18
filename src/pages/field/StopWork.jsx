import { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import Icon from '../../components/Icon';
import { I } from '../../data/icons';

const REASONS = ['Imminent fall risk', 'Person under a load', 'Live electrical', 'Structure unstable'];

export default function StopWork() {
  const [reason, setReason] = useState('Person under a load');
  return (
    <div>
      <PageHeader title="Stop work" back="/" />
      <div className="info danger" style={{ marginTop: 4 }}>
        Stopping work is your right and it is protected. No one on this project may penalise you for using it.
      </div>
      <div className="lbl">Who needs to know right now</div>
      <div className="card static">
        <div className="ic" style={{ background: 'rgba(229,72,77,.14)' }}>
          <Icon path={I.user} color="#E5484D" />
        </div>
        <div className="bd">
          <div className="ti">Abdullah Al-Qahtani</div>
          <div className="mt">Package HSE Manager · called + SMS</div>
        </div>
      </div>
      <div className="card static">
        <div className="ic" style={{ background: 'rgba(242,153,74,.14)' }}>
          <Icon path={I.user} color="#F2994A" />
        </div>
        <div className="bd">
          <div className="ti">Site supervisor on shift</div>
          <div className="mt">Al Sahra Steel · push + SMS</div>
        </div>
      </div>

      <div className="lbl">Reason</div>
      <div className="sevrow" style={{ flexWrap: 'wrap', gap: 7 }}>
        {REASONS.map((r) => (
          <button
            key={r}
            className={`sb${reason === r ? ' s-critical' : ''}`}
            style={{ flex: '1 1 45%' }}
            onClick={() => setReason(r)}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="lbl">Photo</div>
      <div className="pbox ok">
        <Icon path={I.cam} color="#3ECF8E" size={22} />
        Photo attached · sending as soon as signal returns
      </div>

      <div className="info">
        Work resumes only when the HSE manager records a release in the app. The stop, the reason, and the release are all timestamped for the record.
      </div>
    </div>
  );
}
