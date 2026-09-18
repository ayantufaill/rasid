import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import Icon from '../../components/Icon';
import PhotoCapture from '../../components/PhotoCapture';
import VoiceRecorder from '../../components/VoiceRecorder';
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
  const [photoUrl, setPhotoUrl] = useState(null);
  const [voiceUrl, setVoiceUrl] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setSelCat(null);
    setSelSev(null);
    setPhotoUrl(null);
    setVoiceUrl(null);
    setTranscript('');
    setNote('');
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
        photoUrl,
        voiceUrl,
        description: note.trim() || transcript.trim() || null,
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
          <PhotoCapture value={photoUrl} onChange={setPhotoUrl} />

          <div className="lbl">Describe it</div>
          <VoiceRecorder
            value={voiceUrl}
            onChange={(url, text) => {
              setVoiceUrl(url);
              if (text) setTranscript(text);
            }}
          />
          <textarea
            className="note"
            placeholder="Or type instead"
            style={{ marginTop: 9 }}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

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
