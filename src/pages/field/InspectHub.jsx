import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import Icon from '../../components/Icon';
import { I } from '../../data/icons';

const DUE_TODAY = [
  { t: 'Scaffold S-A1-07', ic: I.scaff, c: '#FFB020', m: 'Weekly inspection · overdue 2 days', st: 'overdue' },
  { t: 'Harness kit · crew 4', ic: I.ppe, c: '#3ECF8E', m: 'Pre-use check · 12 units', st: 'due' },
  { t: 'Fire points — Module A1', ic: I.warn, c: '#E5484D', m: 'Monthly check · 6 extinguishers', st: 'due' },
  { t: 'Lifting slings — B1 yard', ic: I.truck, c: '#4FA3C7', m: 'Colour code: green quarter', st: 'due' },
];

const PERMITS = [
  { t: 'Work at height — Bay 3', ic: I.key, c: '#9B8AFB', m: 'Valid until 17:00 today', st: 'valid' },
  { t: 'Hot work — steel yard', ic: I.bolt, c: '#F2994A', m: 'Expired 08:00 · renew before work', st: 'overdue' },
];

const STATE_LABEL = { overdue: 'Overdue', due: 'Due', valid: 'Valid' };

function InsRow({ row, onClick }) {
  return (
    <button className="card" onClick={onClick}>
      <div className="ic" style={{ background: `${row.c}22` }}>
        <Icon path={row.ic} color={row.c} />
      </div>
      <div className="bd">
        <div className="tp">
          <div className="ti">{row.t}</div>
          <span className={`tg tg-${row.st}`}>{STATE_LABEL[row.st]}</span>
        </div>
        <div className="mt">{row.m}</div>
      </div>
    </button>
  );
}

export default function InspectHub() {
  const navigate = useNavigate();
  return (
    <div>
      <PageHeader title="Inspections" back="/" />
      <div className="lbl">
        <span>Scan a tag</span>
      </div>
      <button className="card" style={{ padding: 16 }} onClick={() => navigate('/inspect/tag')}>
        <div className="ic" style={{ background: 'rgba(255,176,32,.14)', width: 38, height: 38 }}>
          <Icon path={I.qr} color="#FFB020" size={18} />
        </div>
        <div className="bd">
          <div className="ti">Scan scaffold or equipment tag</div>
          <div className="mt">Pulls the last inspection, due date, and load rating</div>
        </div>
      </button>

      <div className="lbl">
        <span>Due today</span>
        <span className="c">4</span>
      </div>
      {DUE_TODAY.map((row) => (
        <InsRow key={row.t} row={row} onClick={() => navigate('/inspect/checklist')} />
      ))}

      <div className="lbl">
        <span>Permits you hold</span>
      </div>
      {PERMITS.map((row) => (
        <InsRow key={row.t} row={row} onClick={() => navigate('/inspect/checklist')} />
      ))}
    </div>
  );
}
