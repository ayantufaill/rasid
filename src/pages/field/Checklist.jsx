import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import Icon from '../../components/Icon';
import { I } from '../../data/icons';

const ITEMS = [
  'Base plates and sole boards sound',
  'Ties and bracing complete',
  'Guardrails and toe-boards fitted',
  'Platform boards secure, no gaps',
  'Access ladder secured',
  'Load rating sign legible',
  'No unauthorised modification',
];
const FAIL_INDEX = 2;

export default function Checklist() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(ITEMS.map((_, i) => i < 5 && i !== FAIL_INDEX));

  function toggle(i) {
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  }

  return (
    <div>
      <PageHeader title="Scaffold inspection" back="/inspect" />
      <div className="badges" style={{ padding: '0 0 12px' }}>
        <div className="mb">
          <div className="g" />
          Tag S-A1-07 scanned
        </div>
        <div className="mb">Last checked 11 d ago</div>
      </div>

      {ITEMS.map((t, i) => {
        const fail = i === FAIL_INDEX;
        const pass = checked[i];
        return (
          <button key={t} className={`ckrow${fail ? ' fail' : pass ? ' pass' : ''}`} onClick={() => toggle(i)}>
            <div className="box">
              <Icon path={fail ? I.x : I.chk} color={fail ? '#fff' : '#0e1b12'} size={13} />
            </div>
            <div>
              <div className="ct">{t}</div>
              {fail && <div className="cs">Fails — toe-board missing on north face</div>}
            </div>
          </button>
        );
      })}

      <div className="info danger">
        One item failed. This scaffold will be <b>red-tagged</b> and a hazard report raised automatically when you finish.
      </div>

      <div className="subbar">
        <button className="sbtn rdy" onClick={() => navigate('/inspect/tag')}>
          Finish and red-tag
        </button>
      </div>
    </div>
  );
}
