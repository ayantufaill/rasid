import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { I } from '../../data/icons';
import { Tile } from '../../components/ui';

const KINDS = [
  { id: 'hazard', l: 'Hazard', ic: I.warn, c: '#E5484D', s: 'An unsafe condition that could hurt someone' },
  { id: 'nearmiss', l: 'Near-miss', ic: I.near, c: '#F2994A', s: 'It almost happened — no one was hurt' },
  { id: 'unsafeact', l: 'Unsafe act', ic: I.eye, c: '#FFB020', s: 'Behaviour, not condition' },
  { id: 'positive', l: 'Good practice', ic: I.thumb, c: '#3ECF8E', s: 'Someone did it right' },
  { id: 'incident', l: 'Incident', ic: I.warn, c: '#9B8AFB', s: 'Injury, damage, or spill occurred' },
  { id: 'anon', l: 'Anonymous', ic: I.user, c: '#93A2AC', s: 'Your name is not attached' },
];

export default function CaptureHub() {
  const navigate = useNavigate();
  return (
    <div>
      <PageHeader title="New report" back="/" />
      <div className="lbl">
        <span>What are you reporting?</span>
      </div>
      <div className="grid2">
        {KINDS.map((k) => (
          <Tile key={k.id} icon={k.ic} iconColor={k.c} label={k.l} sub={k.s} onClick={() => navigate(`/report/${k.id}`)} />
        ))}
      </div>
      <div className="info">
        Near-misses are the cheapest data on site — they carry the same causes as an injury with none of the cost. The app weights them the same as hazards in the dashboard.
      </div>
    </div>
  );
}
