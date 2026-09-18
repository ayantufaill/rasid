import { useState } from 'react';
import { useAuth } from '../state/AuthContext';

export default function Auth() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError('');
    setInfo('');
    setBusy(true);
    try {
      if (mode === 'signin') {
        const { error: err } = await signIn(email, password);
        if (err) throw err;
      } else {
        const { error: err, data } = await signUp(email, password, fullName || 'Field engineer');
        if (err) throw err;
        if (data?.user && !data.session) {
          setInfo('Account created — check your email to confirm, then sign in.');
          setMode('signin');
        }
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="authwrap">
      <div className="authcard">
        <div className="brand" style={{ marginBottom: 22, justifyContent: 'center' }}>
          <div className="mark">R</div>
          <div>
            <div className="bname">RASID</div>
            <div className="bsub">Field safety intelligence</div>
          </div>
        </div>

        <div className="toggle2">
          <button className={mode === 'signin' ? 'on' : ''} onClick={() => setMode('signin')} type="button">
            Sign in
          </button>
          <button className={mode === 'signup' ? 'on' : ''} onClick={() => setMode('signup')} type="button">
            Create account
          </button>
        </div>

        <form onSubmit={submit}>
          {mode === 'signup' && (
            <input className="input" placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          )}
          <input className="input" type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <input
            className="input"
            type="password"
            placeholder="Password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div className="info danger">{error}</div>}
          {info && <div className="info">{info}</div>}
          <button className="prim" style={{ marginTop: 14 }} disabled={busy} type="submit">
            {busy ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account'}
          </button>
        </form>
      </div>
    </div>
  );
}
