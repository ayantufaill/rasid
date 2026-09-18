import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from './Icon';
import { I } from '../data/icons';
import { FIELD_TABS, NAV_GROUPS } from '../nav';
import { useAppState } from '../state/AppState';
import { Toast } from './ui';

function NavList({ pathname, onNavigate }) {
  return (
    <>
      <div className="sgrp">Field</div>
      {FIELD_TABS.map((it) => (
        <Link key={it.path} to={it.path} className={`sitem${pathname === it.path ? ' on' : ''}`} onClick={onNavigate}>
          <Icon path={I[it.icon]} size={15} />
          {it.label}
        </Link>
      ))}
      <Link to="/stop-work" className={`sitem${pathname === '/stop-work' ? ' on' : ''}`} onClick={onNavigate} style={{ color: pathname === '/stop-work' ? 'var(--red)' : undefined }}>
        <Icon path={I.stop} size={15} />
        Stop work
      </Link>
      {NAV_GROUPS.map((grp) => (
        <div key={grp.title}>
          <div className="sgrp">{grp.title}</div>
          {grp.items.map((it) => (
            <Link key={it.path} to={it.path} className={`sitem${pathname === it.path ? ' on' : ''}`} onClick={onNavigate}>
              {it.label}
              {it.count !== undefined && <span className="n">{it.count}</span>}
            </Link>
          ))}
        </div>
      ))}
    </>
  );
}

export default function AppShell({ children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { toastMsg, toastOn } = useAppState();
  const [sheetOpen, setSheetOpen] = useState(false);

  const isDashboard = pathname.startsWith('/dashboard');
  const activeTab = FIELD_TABS.find((t) => t.path === pathname)?.path;

  return (
    <div>
      <div className="header">
        <div className="brand">
          <div className="mark">R</div>
          <div>
            <div className="bname">RASID</div>
            <div className="bsub">Field safety intelligence</div>
          </div>
        </div>
        <div className="header-actions">
          <button className="hamburger" onClick={() => setSheetOpen(true)} aria-label="Open menu">
            <Icon path={I.list} size={17} />
          </button>
        </div>
      </div>

      <div className="app-body">
        <nav className="side">
          <NavList pathname={pathname} onNavigate={() => {}} />
        </nav>

        <main className={`main${isDashboard ? '' : ' narrow'}`}>{children}</main>
      </div>

      <nav className="bnav">
        {FIELD_TABS.map((it) => (
          <button key={it.path} className={`it${activeTab === it.path ? ' on' : ''}`} onClick={() => navigate(it.path)}>
            <Icon path={I[it.icon]} size={18} />
            {it.label}
          </button>
        ))}
        <button className={`it${sheetOpen ? ' on' : ''}`} onClick={() => setSheetOpen(true)}>
          <Icon path={I.dots} size={18} />
          More
        </button>
      </nav>

      <div className={`sheet-ovl${sheetOpen ? ' on' : ''}`} onClick={() => setSheetOpen(false)} />
      <div className={`sheet${sheetOpen ? ' on' : ''}`}>
        <div className="sheet-handle" />
        <NavList pathname={pathname} onNavigate={() => setSheetOpen(false)} />
      </div>

      <Toast show={toastOn} message={toastMsg} />
    </div>
  );
}
