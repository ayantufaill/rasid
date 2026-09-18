import PageHeader from '../../components/PageHeader';
import { HazardCard } from '../../components/ui';

export default function MyWork() {
  return (
    <div>
      <PageHeader title="My work" back="/" />
      <div className="lbl">
        <span>Waiting on you</span>
        <span className="c">2</span>
      </div>
      <HazardCard
        catId="falling"
        title="Verify netting install — Bay 3"
        sev="critical"
        meta="RSD-A1-014 · installed 2h ago"
        dotColor="#9B8AFB"
        statusText="Photo the fix to close it"
        to="/my-work/verify/RSD-A1-014"
      />
      <HazardCard
        catId="heat"
        title="Verify water cooler replaced"
        sev="high"
        meta="RSD-A1-002 · marked fixed"
        dotColor="#9B8AFB"
        statusText="Awaiting your verification"
        to="/my-work/verify/RSD-A1-002"
      />

      <div className="lbl">
        <span>Your reports this month</span>
        <span className="c">14</span>
      </div>
      <HazardCard
        catId="scaffold"
        title="Scaffold tie missing — Level 4"
        sev="high"
        meta="RSD-A1-009 · 1 day ago"
        dotColor="#4FA3C7"
        statusText="Triaged, action being scoped"
      />
      <HazardCard
        catId="housekeep"
        title="Debris on walkway — Gate 2"
        sev="low"
        meta="RSD-B2-011 · 5 days ago"
        dotColor="#3ECF8E"
        statusText="Verified closed"
      />
      <HazardCard
        catId="ppe"
        title="Hearing protection — steel yard"
        sev="low"
        meta="RSD-B1-003 · 8 days ago"
        dotColor="#3ECF8E"
        statusText="Verified closed"
      />

      <div className="info">
        You've raised 14 reports this month and 11 led to a physical change on site. That ratio is what the project measures, not the raw count.
      </div>
    </div>
  );
}
