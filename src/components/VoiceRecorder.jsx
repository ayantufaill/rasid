import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import { I } from '../data/icons';
import { uploadMedia } from '../lib/media';
import { useAuth } from '../state/AuthContext';

const LANGS = [
  ['ar-SA', 'Arabic'],
  ['en-US', 'English'],
  ['ur-PK', 'Urdu'],
  ['hi-IN', 'Hindi'],
  ['bn-BD', 'Bengali'],
  ['fil-PH', 'Tagalog'],
];

const SpeechRecognitionAPI = typeof window !== 'undefined' ? window.SpeechRecognition || window.webkitSpeechRecognition : null;

export default function VoiceRecorder({ value, onChange }) {
  const { user } = useAuth();
  const [recording, setRecording] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [lang, setLang] = useState('ar-SA');
  const [transcript, setTranscript] = useState('');

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(
    () => () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      recognitionRef.current?.stop();
    },
    []
  );

  async function start() {
    setError('');
    setTranscript('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mr = new MediaRecorder(stream);
      chunksRef.current = [];
      mr.ondataavailable = (e) => chunksRef.current.push(e.data);
      mr.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, { type: mr.mimeType || 'audio/webm' });
        setBusy(true);
        try {
          const ext = (mr.mimeType || 'audio/webm').includes('mp4') ? 'm4a' : 'webm';
          const url = await uploadMedia(blob, { userId: user?.id, kind: 'voice', ext });
          onChange(url, transcript);
        } catch (err) {
          setError(err.message || 'Could not upload recording');
        } finally {
          setBusy(false);
        }
      };
      mediaRecorderRef.current = mr;
      mr.start();

      if (SpeechRecognitionAPI) {
        const rec = new SpeechRecognitionAPI();
        rec.lang = lang;
        rec.continuous = true;
        rec.interimResults = true;
        rec.onresult = (e) => {
          let text = '';
          for (let i = 0; i < e.results.length; i++) text += e.results[i][0].transcript;
          setTranscript(text);
        };
        rec.onerror = () => {};
        recognitionRef.current = rec;
        rec.start();
      }

      setRecording(true);
    } catch (err) {
      setError('Microphone access denied or unavailable');
    }
  }

  function stop() {
    setRecording(false);
    mediaRecorderRef.current?.stop();
    recognitionRef.current?.stop();
  }

  if (value) {
    return (
      <div>
        <div className="voice" style={{ cursor: 'default' }}>
          <div className="mic" style={{ background: 'var(--green)' }}>
            <Icon path={I.chk} color="#0e1b12" size={16} />
          </div>
          <div style={{ flex: 1 }}>
            <div className="vt">Voice note attached</div>
            <audio src={value} controls style={{ width: '100%', height: 32, marginTop: 6 }} />
          </div>
        </div>
        <button type="button" className="ghost" style={{ marginTop: 8 }} onClick={() => onChange(null, '')}>
          Remove and re-record
        </button>
      </div>
    );
  }

  return (
    <div>
      {!recording && SpeechRecognitionAPI && (
        <select className="input" style={{ marginBottom: 8 }} value={lang} onChange={(e) => setLang(e.target.value)}>
          {LANGS.map(([code, label]) => (
            <option key={code} value={code}>
              {label}
            </option>
          ))}
        </select>
      )}
      <button type="button" className={`voice${recording ? ' rec' : ''}`} onClick={recording ? stop : start} disabled={busy}>
        <div className="mic">
          <Icon path={I.mic} color={recording ? '#1a1330' : '#93A2AC'} size={16} />
        </div>
        <div>
          <div className="vt">{busy ? 'Uploading…' : recording ? 'Recording — tap to stop' : 'Speak in any language'}</div>
          <div className="vs">
            {SpeechRecognitionAPI ? 'Live transcript where supported (beta)' : 'Arabic, English, Urdu, Hindi, Bengali, Tagalog'}
          </div>
        </div>
      </button>
      {recording && transcript && (
        <div className="transcript show">
          <div className="tag">Live transcript (beta — accuracy varies by browser)</div>
          <div className="en">{transcript}</div>
        </div>
      )}
      {error && <div className="info danger" style={{ marginTop: 8 }}>{error}</div>}
    </div>
  );
}
