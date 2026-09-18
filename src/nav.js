export const FIELD_TABS = [
  { path: '/', label: 'Home', icon: 'home' },
  { path: '/report', label: 'Report', icon: 'plus' },
  { path: '/inspect', label: 'Inspect', icon: 'clip' },
  { path: '/my-work', label: 'My work', icon: 'list' },
];

export const NAV_GROUPS = [
  {
    title: 'Monitor',
    items: [
      { path: '/dashboard/overview', label: 'Overview', count: 34 },
      { path: '/dashboard/register', label: 'Hazard register', count: 34 },
      { path: '/dashboard/clusters', label: 'Clusters', count: 6 },
      { path: '/dashboard/actions', label: 'Corrective actions', count: 12 },
    ],
  },
  {
    title: 'Comply',
    items: [
      { path: '/dashboard/inspections', label: 'Inspections', count: 8 },
      { path: '/dashboard/permits', label: 'Permits', count: 5 },
      { path: '/dashboard/people', label: 'People & certs', count: 3 },
    ],
  },
  {
    title: 'Analyse',
    items: [
      { path: '/dashboard/heat', label: 'Heat & environment' },
      { path: '/dashboard/contractors', label: 'Contractors' },
      { path: '/dashboard/analytics', label: 'Trends & risk' },
    ],
  },
];
