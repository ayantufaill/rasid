import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import Icon from '../../components/Icon';
import { I } from '../../data/icons';
import { useAppState } from '../../state/AppState';

export default function Verify() {
  const { id = 'RSD-A1-014' } = useParams();
  const navigate = useNavigate();
  const { advanceReport, toast } = useAppState();

  function closeOut() {
    const status = advanceReport(id);
    navigate('/');
    toast(`${id} ${status === 'resolved' ? 'verified and closed' : 'control assigned'}`);
  }

  return (
    <div>
      <PageHeader title="Verify fix" back="/my-work" />
      <div className="lbl">Before — reported 2 days ago</div>
      <div className="pbox" style={{ cursor: 'default', padding: 30 }}>
        <Icon path={I.cam} color="#5E6C76" size={22} />
        Original report photo · Bay 3, Level 4
      </div>
      <div className="lbl">After — photograph the control in place</div>
      <div className="pbox ok" style={{ padding: 30 }}>
        <Icon path={I.cam} color="#3ECF8E" size={22} />
        Photo captured · 11:52 · GPS matches original within 6 m
      </div>

      <div className="lbl">Is the control adequate?</div>
      <div className="sevrow">
        <div className="sb s-low" style={{ flex: 1 }}>
          Yes, adequate
        </div>
        <div className="sb" style={{ flex: 1 }}>
          Partly
        </div>
        <div className="sb" style={{ flex: 1 }}>
          No, reopen
        </div>
      </div>

      <div className="info">
        <b>You didn't raise this one.</b> Verification is done by a different person than the one who assigned the fix — that separation is what makes closure mean something to an auditor.
      </div>

      <div className="lbl">Control applied</div>
      <div className="card static">
        <div className="ic" style={{ background: 'rgba(255,176,32,.14)' }}>
          <Icon path={I.net} color="#FFB020" />
        </div>
        <div className="bd">
          <div className="ti">Debris netting — 340 m²</div>
          <div className="mt">Engineering control · hierarchy level 3 · SAR 46,000</div>
        </div>
      </div>

      <div className="subbar">
        <button className="sbtn rdy" onClick={closeOut}>
          Close out {id}
        </button>
      </div>
    </div>
  );
}
