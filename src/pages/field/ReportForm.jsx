import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import Icon from '../../components/Icon';
import { I } from '../../data/icons';
import { CATS, KINDL } from '../../data/mockData';
import { useAppState } from '../../state/AppState';

const SEVERITIES = ['low', 'medium', 'high', 'critical'];
const CLUSTERED_CATS = ['falling', 'scaffold'];

export default function ReportForm() {
  const { kind = 'hazard' } = useParams();
  const navigate = useNavigate();
  const { addReport, toast } = useAppState();
  const [selCat, setSelCat] = useState(null);
  const [selSev, setSelSev] = useState(null);
  const [photoOK, setPhotoOK] = useState(false);
  const [voiceOn, setVoiceOn] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setSelCat(null);
    setSelSev(null);
    setPhotoOK(false);
    setVoiceOn(false);
  }, [kind]);

  const kindLabel = KINDL[kind] || 'Hazard';
  const clustered = CLUSTERED_CATS.includes(selCat);
  const ready = Boolean(selCat && selSev);

  async function submit() {
    if (!ready || submitting) return;
    setSubmitting(true);
    try {
      const ticket = await addReport({
        category: selCat,
        severity: selSev,
        kind: kind === 'anon' ? 'hazard' : kind,
        clustered,
      });
      navigate('/report/confirm', { state: { ticket, clustered, kind } });
    } catch (err) {
      toast(err.message || 'Could not submit — check your connection');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <PageHeader title={kindLabel} back="/report" />
      <div className="badges">
        <div className="mb">
          <div className="g" />
          GPS locked — Module A1
        </div>
        <div className="mb">Bay 3 · Level 4</div>
        <div className="mb">{kind === 'anon' ? 'Name hidden' : 'Y. Al-Harbi'}</div>
      </div>

      <div className="lbl">Category</div>
      <div className="grid2">
        {CATS.map((c) => (
          <button
            key={c.id}
            className={`tile row${selCat === c.id ? ' sel' : ''}`}
            onClick={() => setSelCat(c.id)}
          >
            <div className="ic">
              <Icon path={c.i} color={selCat === c.id ? '#241900' : c.c} size={14} />
            </div>
            <div className="tl">{c.l}</div>
          </button>
        ))}
      </div>

      {selCat && (
        <div>
          <div className="lbl">
            Severity if it goes wrong <span className="c">required</span>
          </div>
          <div className="sevrow">
            {SEVERITIES.map((s) => (
              <button key={s} className={`sb${selSev === s ? ' s-' + s : ''}`} onClick={() => setSelSev(s)}>
                {s[0].toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>

          <div className="lbl">
            Photo <span className="c">required for critical</span>
          </div>
          <button className={`pbox${photoOK ? ' ok' : ''}`} onClick={() => setPhotoOK((v) => !v)}>
            <Icon path={I.cam} color={photoOK ? '#3ECF8E' : '#5E6C76'} size={22} />
            {photoOK ? 'Photo attached · just now · 27.4N 35.1E' : 'Tap to capture — location stamped automatically'}
          </button>

          <div className="lbl">Describe it</div>
          <button className={`voice${voiceOn ? ' rec' : ''}`} onClick={() => setVoiceOn((v) => !v)}>
            <div className="mic">
              <Icon path={I.mic} color={voiceOn ? '#1a1330' : '#93A2AC'} size={16} />
            </div>
            <div>
              <div className="vt">{voiceOn ? 'Listening…' : 'Speak in any language'}</div>
              <div className="vs">{voiceOn ? 'Arabic detected · tap to stop' : 'Arabic, English, Urdu, Hindi, Bengali, Tagalog'}</div>
            </div>
          </button>
          <div className={`transcript${voiceOn ? ' show' : ''}`}>
            <div className="tag">Transcribed and translated automatically</div>
            <div className="ar">في عدة يدوية على السقالة بدون حاجز، ممكن تقع على الممر تحت</div>
            <div className="en">There are hand tools on the scaffold with no toe-board — they could fall onto the walkway below.</div>
          </div>
          <textarea className="note" placeholder="Or type instead" style={{ marginTop: 9 }} />

          {clustered && (
            <div className="info">
              <b>Heads up —</b> 6 reports were logged within 20 m of here in the last 7 days. Yours will merge into <b>cluster A1-014</b> so the team sees one prioritised issue backed by 7 witnesses, not 7 separate tickets.
            </div>
          )}
        </div>
      )}

      <div className="subbar">
        <button className={`sbtn${ready && !submitting ? ' rdy' : ''}`} onClick={submit} disabled={submitting}>
          {submitting ? 'Submitting…' : kind === 'anon' ? 'Send anonymously' : 'Submit report'}
        </button>
      </div>
    </div>
  );
}
