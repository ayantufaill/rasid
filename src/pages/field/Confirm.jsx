import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import { I } from '../../data/icons';

const STAGES = ['Submitted', 'Triaged', 'Action assigned', 'Fixed', 'Verified'];

export default function Confirm() {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state) navigate('/', { replace: true });
  }, [state, navigate]);

  if (!state) return null;
  const { ticket, clustered } = state;

  return (
    <div className="conf">
      <div className="ring">
        <Icon path={I.chk} color="#3ECF8E" size={26} />
      </div>
      <div className="tid mono">{ticket}</div>
      <div className="ctitle display">Saved on your phone</div>
      <div className="trk">
        {STAGES.map((l, i) => (
          <div className={`ts${i < 2 ? ' done' : ''}`} key={l}>
            <div className="ln" />
            <div className="d" />
            <div className="l">{l}</div>
          </div>
        ))}
      </div>
      {clustered && (
        <div className="banner">
          Matched to <b>cluster A1-014</b> — now backed by <b>7 independent reports</b> across 4 crews. Escalated to the package HSE manager automatically.
        </div>
      )}
      <div className="acard">
        <div className="ic">
          <Icon path={I.net} color="#FFB020" size={17} />
        </div>
        <div>
          <div className="at">Recommended control: debris netting</div>
          <div className="as">Engineering control, hierarchy level 3. Site Ops notified — you'll be asked to verify the fix on site once it's installed.</div>
        </div>
      </div>
      <div className="acard">
        <div className="ic" style={{ background: 'rgba(79,163,199,.14)' }}>
          <Icon path={I.near} color="#4FA3C7" size={17} />
        </div>
        <div>
          <div className="at">You'll hear back within 24 hours</div>
          <div className="as">Every report gets a named owner and an SLA clock. If it stalls, it escalates without you chasing it.</div>
        </div>
      </div>
      <button className="prim" onClick={() => navigate('/')}>
        Back to home
      </button>
      <button className="ghost" onClick={() => navigate('/my-work')}>
        See my reports
      </button>
    </div>
  );
}
