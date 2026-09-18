import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from './Icon';
import { I } from '../data/icons';
import { STATUS_LABEL, catById } from '../data/mockData';

export function SevBadge({ sev }) {
  return <span className={`sev sev-${sev}`}>{sev[0].toUpperCase() + sev.slice(1)}</span>;
}

export function StatusTag({ status }) {
  return <span className={`tg tg-${status}`}>{STATUS_LABEL[status] || status}</span>;
}

export function Card({ icon, iconColor, title, meta, sev, statusDot, statusText, onClick, children }) {
  const Tag = onClick ? 'button' : 'div';
  return (
    <Tag className={`card${onClick ? '' : ' static'}`} onClick={onClick}>
      {icon && (
        <div className="ic" style={{ background: iconColor ? `${iconColor}22` : 'var(--panel-2)' }}>
          <Icon path={icon} color={iconColor} />
        </div>
      )}
      <div className="bd">
        <div className="tp">
          <div className="ti">{title}</div>
          {sev && <SevBadge sev={sev} />}
        </div>
        {meta && <div className="mt">{meta}</div>}
        {statusText && (
          <div className="stat-line">
            <div className="sq" style={{ background: statusDot || 'var(--faint)' }} />
            {statusText}
          </div>
        )}
        {children}
      </div>
    </Tag>
  );
}

export function HazardCard({ catId, title, sev, meta, dotColor, statusText, to }) {
  const navigate = useNavigate();
  const cat = catById(catId);
  return (
    <Card
      icon={cat?.i}
      iconColor={cat?.c}
      title={title}
      meta={meta}
      sev={sev}
      statusDot={dotColor}
      statusText={statusText}
      onClick={to ? () => navigate(to) : undefined}
    />
  );
}

export function Tile({ icon, iconColor, label, sub, selected, onClick, row }) {
  return (
    <button className={`tile${selected ? ' sel' : ''}${row ? ' row' : ''}`} onClick={onClick}>
      <div className="ic">
        <Icon path={icon} color={selected ? '#241900' : iconColor} size={row ? 16 : 20} />
      </div>
      <div>
        <div className="tl">{label}</div>
        {sub && <div className="ts">{sub}</div>}
      </div>
    </button>
  );
}

export function StripStats({ items }) {
  return (
    <div className="strip">
      {items.map((it, i) => (
        <div className="st" key={i}>
          <div className={`stn${it.tone ? ' ' + it.tone : ''}`}>{it.n}</div>
          <div className="stl">{it.l}</div>
          {it.d && <div className="std">{it.d}</div>}
        </div>
      ))}
    </div>
  );
}

export function Panel({ title, action, children }) {
  return (
    <div className="pblk">
      {title && (
        <div className="pt">
          <span>{title}</span>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

// Renders a real <table> on wide screens and CSS-collapses to stacked
// label/value cards on narrow screens (see .rtable rules in index.css).
export function RTable({ columns, rows, getKey, onRowClick }) {
  return (
    <table className="rtable">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={getKey(row)} onClick={onRowClick ? () => onRowClick(row) : undefined}>
            {columns.map((col) => (
              <td key={col.key} data-label={col.header}>
                {col.render ? col.render(row) : row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function Bars({ rows }) {
  // rows: [{ label, value, display, color }]
  return (
    <div className="bars">
      {rows.map((r, i) => (
        <div className="barrow" key={i} title={r.title}>
          <div className="bn">{r.label}</div>
          <div className="bartrack">
            <div className="barfill" style={{ width: `${r.pct ?? r.value}%`, background: r.color }} />
          </div>
          <div className="barval">{r.display ?? r.value}</div>
        </div>
      ))}
    </div>
  );
}

export function Spark({ bars, xLabels, legend }) {
  return (
    <>
      <div className="spark">
        {bars.map((b, i) => (
          <div key={i} style={{ height: `${b.h}%` }}>
            {b.layers.map((layer, j) => (
              <i key={j} style={{ height: `${layer.h}%`, background: layer.color, zIndex: layer.z }} />
            ))}
          </div>
        ))}
      </div>
      {xLabels && (
        <div className="sparkx">
          {xLabels.map((x, i) => (
            <span key={i}>{x}</span>
          ))}
        </div>
      )}
      {legend && (
        <div className="legend">
          {legend.map((l, i) => (
            <span key={i}>
              <i style={{ background: l.color }} />
              {l.label}
            </span>
          ))}
        </div>
      )}
    </>
  );
}

export function RiskMatrix({ headers, rows }) {
  const heat = ['#2C3944', '#4FA3C7', '#FFB020', '#F2994A', '#E5484D'];
  return (
    <div className="matrix">
      <div />
      {headers.map((h) => (
        <div className="mh" key={h}>
          {h}
        </div>
      ))}
      {rows.map(([label, cells]) => (
        <Fragment key={label}>
          <div className="ml">{label}</div>
          {cells.map((v, i) => {
            const idx = v === 0 ? 0 : Math.min(4, Math.floor(((i + 1) * v) / 3));
            return (
              <div
                key={i}
                className="mcell"
                style={{ background: v === 0 ? 'var(--panel-2)' : heat[idx], color: v === 0 ? 'var(--faint)' : '#0e1114' }}
              >
                {v || ''}
              </div>
            );
          })}
        </Fragment>
      ))}
    </div>
  );
}

export function Toast({ show, message }) {
  return (
    <div className={`toast${show ? ' on' : ''}`}>
      <div className="sq" />
      <span>{message}</span>
    </div>
  );
}

export function Drawer({ open, onClose, children }) {
  return (
    <>
      <div className={`ovl${open ? ' on' : ''}`} onClick={onClose} />
      <div className={`drw${open ? ' on' : ''}`}>
        {open && (
          <>
            <button className="dclose" onClick={onClose} aria-label="Close">
              <Icon path={I.x} color="#93A2AC" size={13} />
            </button>
            {children}
          </>
        )}
      </div>
    </>
  );
}

export function KV({ k, v, tone }) {
  return (
    <div className="kv">
      <span className="k">{k}</span>
      <span className="v" style={tone ? { color: tone } : undefined}>
        {v}
      </span>
    </div>
  );
}
