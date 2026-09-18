import Icon from './Icon';
import { I } from '../data/icons';
import { catById, DESCS, KINDL } from '../data/mockData';
import { useAppState } from '../state/AppState';
import { Drawer, SevBadge } from './ui';

export default function ReportDrawer() {
  const { reports, drawerId, closeDrawer, advanceReport, toast } = useAppState();
  const r = reports.find((x) => x.id === drawerId);
  const open = Boolean(r);
  const cat = r ? catById(r.c) : null;

  async function resolve() {
    try {
      const status = await advanceReport(r.id);
      closeDrawer();
      toast(r.id + (status === 'resolved' ? ' verified and closed' : ' — control assigned'));
    } catch (err) {
      toast(err.message || 'Could not update — check your connection');
    }
  }

  return (
    <Drawer open={open} onClose={closeDrawer}>
      {r && (
        <>
          <div className="idc" style={{ color: 'var(--faint)' }}>
            {r.id} · {KINDL[r.k] || r.k}
          </div>
          <div className="dh">
            {cat.l} <SevBadge sev={r.s} />
          </div>
          <div className="dm">
            Module {r.z} · {r.ctr} · {r.a} ago · {r.r} independent report{r.r > 1 ? 's' : ''}
          </div>

          {r.st === 'verify' || r.st === 'resolved' ? (
            <div className="dphotos">
              <div className="p">
                <Icon path={I.cam} color="#5E6C76" size={18} />
                Before
              </div>
              <div className="p">
                <Icon path={I.cam} color="#3ECF8E" size={18} />
                After — control in place
              </div>
            </div>
          ) : (
            <div className="dphoto">
              <Icon path={I.cam} color="#5E6C76" size={18} />
              <span style={{ marginLeft: 8 }}>Field photo · GPS stamped</span>
            </div>
          )}

          <div className="dsec">
            <div className="dl">What was reported</div>
            <div className="dd">{r.description || DESCS[r.c]}</div>
          </div>

          {r.r > 1 && (
            <div className="dsec">
              <div className="dl">Cluster</div>
              <div className="dd">
                Grouped with {r.r - 1} other report{r.r > 2 ? 's' : ''} within 20 m over the last 9 days, from {Math.min(4, r.r)} different crews.
              </div>
            </div>
          )}

          <div className="dsec">
            <div className="dl">Risk</div>
            <div className="kv">
              <span className="k">Likelihood</span>
              <span className="v">Likely</span>
            </div>
            <div className="kv">
              <span className="k">Consequence</span>
              <span className="v">{r.s === 'critical' ? 'Major' : 'Moderate'}</span>
            </div>
            <div className="kv">
              <span className="k">Exposed persons</span>
              <span className="v">~40 daily</span>
            </div>
            <div className="kv">
              <span className="k">Owner</span>
              <span className="v">{r.ctr}</span>
            </div>
            <div className="kv">
              <span className="k">SLA</span>
              <span className="v" style={{ color: r.st === 'open' ? 'var(--red)' : 'var(--green)' }}>
                {r.st === 'open' ? 'Breaching in 4 h' : 'On track'}
              </span>
            </div>
          </div>

          <div className="dsec">
            <div className="dl">Trail</div>
            <div className="tline">
              <div className="tli">
                <div className="tlt">{r.a} ago</div>
                <div className="tlx">Reported from the field with photo and GPS</div>
              </div>
              {r.r > 1 && (
                <div className="tli">
                  <div className="tlt">since</div>
                  <div className="tlx">
                    {r.r - 1} further report{r.r > 2 ? 's' : ''} merged — auto-escalated
                  </div>
                </div>
              )}
              {r.st !== 'open' && (
                <div className="tli">
                  <div className="tlt">then</div>
                  <div className="tlx">Control assigned to {r.ctr}</div>
                </div>
              )}
              {r.st === 'verify' && (
                <div className="tli">
                  <div className="tlt">now</div>
                  <div className="tlx">Marked fixed — awaiting independent verification</div>
                </div>
              )}
              {r.st === 'resolved' ? (
                <div className="tli">
                  <div className="tlt">closed</div>
                  <div className="tlx">Verified on site with after-photo</div>
                </div>
              ) : (
                <div className="tli pend">
                  <div className="tlt">pending</div>
                  <div className="tlx">Verification by a second person</div>
                </div>
              )}
            </div>
          </div>

          <div className="dact">
            {r.st !== 'resolved' && (
              <button className="prim" style={{ flex: 1 }} onClick={resolve}>
                {r.st === 'verify' ? 'Confirm verified' : 'Assign control'}
              </button>
            )}
            <button className="ghost" style={{ flex: 1, marginTop: 0 }} onClick={closeDrawer}>
              Close
            </button>
          </div>
        </>
      )}
    </Drawer>
  );
}
