import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import Icon from '../../components/Icon';
import { I } from '../../data/icons';

export default function ScaffTag() {
  const navigate = useNavigate();
  return (
    <div>
      <PageHeader title="Tag updated" back="/inspect/checklist" />
      <div className="tagcard">
        <div className="tagvis" style={{ background: '#E5484D', color: '#fff' }}>
          <Icon path={I.x} color="#fff" size={26} />
          <div>DO NOT USE</div>
          <div style={{ fontSize: 9, fontWeight: 500 }}>S-A1-07</div>
        </div>
        <div style={{ fontFamily: 'Archivo', fontWeight: 700, fontSize: 15 }}>Scaffold red-tagged</div>
        <div style={{ fontSize: 11.5, color: 'var(--faint)', marginTop: 5, lineHeight: 1.5 }}>
          Access is blocked until a scaffolder clears the defect and a competent person re-tags it.
        </div>
      </div>
      <div className="card static">
        <div className="ic" style={{ background: 'rgba(255,176,32,.14)' }}>
          <Icon path={I.warn} color="#FFB020" />
        </div>
        <div className="bd">
          <div className="ti">Hazard RSD-A1-024 raised</div>
          <div className="mt">Missing toe-board · routed to Al Sahra Steel</div>
        </div>
      </div>
      <div className="card static">
        <div className="ic" style={{ background: 'rgba(79,163,199,.14)' }}>
          <Icon path={I.talk} color="#4FA3C7" />
        </div>
        <div className="bd">
          <div className="ti">Crew notified</div>
          <div className="mt">9 workers with access to this scaffold, in their own language</div>
        </div>
      </div>
      <button className="prim" style={{ marginTop: 10 }} onClick={() => navigate('/')}>
        Done
      </button>
    </div>
  );
}
