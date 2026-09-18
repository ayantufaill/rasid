import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import { I } from '../../data/icons';
import { Card, HazardCard } from '../../components/ui';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="synbar">
        <div className="pulse" />
        Working offline — 3 reports will send when you reach site Wi-Fi
      </div>
      <div className="greet display">Good morning, Yousef</div>
      <div className="greetsub">Coastal Package 3 · Module A1 · Scaffolding crew</div>

      <button className="big-cta" onClick={() => navigate('/report')}>
        <div className="iw">
          <Icon path={I.warn} color="#241900" size={20} />
        </div>
        <div>
          <div className="t">Report something</div>
          <div className="s">Hazard, near-miss, or good practice</div>
        </div>
      </button>
      <button className="big-cta stop-cta" onClick={() => navigate('/stop-work')}>
        <div className="iw">
          <Icon path={I.stop} color="#fff" size={20} />
        </div>
        <div>
          <div className="t">Stop work</div>
          <div className="s">Immediate danger — alerts supervisor now</div>
        </div>
      </button>

      <div className="lbl">
        <span>Today</span>
      </div>
      <Card
        icon={I.sun}
        iconColor="#F2994A"
        title="Heat stress — high"
        sev="high"
        meta="Midday ban active 12:00–15:00 · 15 min rest per 45 min"
        onClick={() => navigate('/heat')}
      />
      <Card
        icon={I.talk}
        iconColor="#9B8AFB"
        title="Toolbox talk due"
        sev="medium"
        meta="Dropped objects prevention · 12 attendees to log"
        onClick={() => navigate('/toolbox-talk')}
      />
      <Card
        icon={I.pin}
        iconColor="#4FA3C7"
        title="Check-in due in 12 min"
        meta="Lone working in the trench corridor"
        onClick={() => navigate('/lone-worker')}
      />

      <div className="lbl">
        <span>Open in your zone</span>
        <span className="c">3</span>
      </div>
      <HazardCard
        catId="falling"
        title="Loose tools at height — Bay 3"
        sev="critical"
        meta="Cluster A1-014 · 7 reports"
        dotColor="#FFB020"
        statusText="Netting install assigned"
        to="/my-work"
      />
      <HazardCard
        catId="scaffold"
        title="Scaffold tie missing — Level 4"
        sev="high"
        meta="Cluster A1-009 · 2 reports"
        dotColor="#4FA3C7"
        statusText="Under review"
      />
      <HazardCard
        catId="heat"
        title="No water at rest area"
        sev="high"
        meta="Cluster A1-002 · 4 reports"
        dotColor="#9B8AFB"
        statusText="Awaiting your verification"
        to="/my-work"
      />
    </div>
  );
}
