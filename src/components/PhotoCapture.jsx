import { useRef, useState } from 'react';
import Icon from './Icon';
import { I } from '../data/icons';
import { compressImage, uploadMedia } from '../lib/media';
import { useAuth } from '../state/AuthContext';

export default function PhotoCapture({ value, onChange, idleLabel = 'Tap to capture — location stamped automatically' }) {
  const { user } = useAuth();
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function handleFile(e) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setError('');
    setBusy(true);
    try {
      const blob = await compressImage(file);
      const url = await uploadMedia(blob, { userId: user?.id, kind: 'photo', ext: 'jpg' });
      onChange(url);
    } catch (err) {
      setError(err.message || 'Could not upload photo');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <input ref={inputRef} type="file" accept="image/*" capture="environment" style={{ display: 'none' }} onChange={handleFile} />
      {value ? (
        <button
          type="button"
          className="pbox ok"
          style={{ padding: 0, overflow: 'hidden', border: '1.5px solid var(--green)' }}
          onClick={() => inputRef.current?.click()}
        >
          <img src={value} alt="Captured" style={{ width: '100%', maxHeight: 220, objectFit: 'cover', display: 'block' }} />
          <div style={{ padding: '8px 0 2px', color: 'var(--green)' }}>Photo attached · tap to retake</div>
        </button>
      ) : (
        <button type="button" className="pbox" onClick={() => inputRef.current?.click()} disabled={busy}>
          <Icon path={I.cam} color="#5E6C76" size={22} />
          {busy ? 'Uploading…' : idleLabel}
        </button>
      )}
      {error && <div className="info danger" style={{ marginTop: 8 }}>{error}</div>}
    </div>
  );
}
