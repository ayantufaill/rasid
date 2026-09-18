import { I } from './icons';

export const CATS = [
  { id: 'falling', l: 'Falling objects', c: '#E5484D', i: I.fall },
  { id: 'scaffold', l: 'Scaffolding defect', c: '#FFB020', i: I.scaff },
  { id: 'electrical', l: 'Electrical hazard', c: '#F2994A', i: I.bolt },
  { id: 'excavation', l: 'Excavation / trench', c: '#4FA3C7', i: I.dig },
  { id: 'height', l: 'Work at height', c: '#9B8AFB', i: I.warn },
  { id: 'lifting', l: 'Lifting operation', c: '#4FA3C7', i: I.truck },
  { id: 'ppe', l: 'PPE issue', c: '#3ECF8E', i: I.ppe },
  { id: 'heat', l: 'Heat / hydration', c: '#F2994A', i: I.sun },
  { id: 'housekeep', l: 'Housekeeping', c: '#93A2AC', i: I.broom },
  { id: 'vehicle', l: 'Vehicle / plant', c: '#F2994A', i: I.truck },
  { id: 'confined', l: 'Confined space', c: '#E5484D', i: I.warn },
  { id: 'other', l: 'Other', c: '#93A2AC', i: I.dots },
];

export const SC = { critical: '#E5484D', high: '#F2994A', medium: '#FFB020', low: '#4FA3C7' };

export const ZONES = [
  { id: 'A1', n: 'Coastal Package — Scaffolding', o: 11, s: 'critical' },
  { id: 'A2', n: 'Utility Corridor — Trenching', o: 6, s: 'high' },
  { id: 'B1', n: 'Structural Steel Yard', o: 5, s: 'high' },
  { id: 'B2', n: 'Site Access & Housekeeping', o: 2, s: 'low' },
  { id: 'C1', n: 'Electrical Rough-in', o: 4, s: 'medium' },
  { id: 'C2', n: 'Concrete Pour Zone', o: 3, s: 'medium' },
  { id: 'D1', n: 'Logistics & Storage', o: 2, s: 'low' },
  { id: 'D2', n: 'Finishing Works', o: 1, s: 'low' },
];

export const INITIAL_REPORTS = [
  { id: 'RSD-A1-014', z: 'A1', c: 'falling', s: 'critical', r: 7, st: 'assigned', a: '2d', k: 'hazard', ctr: 'Al Sahra Steel' },
  { id: 'RSD-A1-009', z: 'A1', c: 'scaffold', s: 'high', r: 2, st: 'open', a: '1d', k: 'hazard', ctr: 'Al Sahra Steel' },
  { id: 'RSD-A1-021', z: 'A1', c: 'height', s: 'critical', r: 1, st: 'open', a: '5h', k: 'nearmiss', ctr: 'Al Sahra Steel' },
  { id: 'RSD-A2-031', z: 'A2', c: 'excavation', s: 'high', r: 3, st: 'verify', a: '4h', k: 'hazard', ctr: 'Rawabi Civils' },
  { id: 'RSD-A2-028', z: 'A2', c: 'confined', s: 'critical', r: 1, st: 'open', a: '1d', k: 'hazard', ctr: 'Rawabi Civils' },
  { id: 'RSD-B1-006', z: 'B1', c: 'lifting', s: 'high', r: 1, st: 'assigned', a: '6h', k: 'nearmiss', ctr: 'Gulf Mechanical' },
  { id: 'RSD-B1-013', z: 'B1', c: 'vehicle', s: 'medium', r: 2, st: 'open', a: '2d', k: 'unsafeact', ctr: 'Gulf Mechanical' },
  { id: 'RSD-C1-022', z: 'C1', c: 'electrical', s: 'medium', r: 2, st: 'open', a: '1d', k: 'hazard', ctr: 'Noor Electrical' },
  { id: 'RSD-C2-018', z: 'C2', c: 'housekeep', s: 'medium', r: 1, st: 'assigned', a: '3d', k: 'hazard', ctr: 'Rawabi Civils' },
  { id: 'RSD-B2-011', z: 'B2', c: 'ppe', s: 'low', r: 1, st: 'resolved', a: '5d', k: 'unsafeact', ctr: 'Gulf Mechanical' },
  { id: 'RSD-D1-004', z: 'D1', c: 'housekeep', s: 'low', r: 1, st: 'open', a: '2d', k: 'hazard', ctr: 'Noor Electrical' },
  { id: 'RSD-A1-002', z: 'A1', c: 'heat', s: 'high', r: 4, st: 'verify', a: '8h', k: 'hazard', ctr: 'Al Sahra Steel' },
  { id: 'RSD-D2-007', z: 'D2', c: 'other', s: 'low', r: 1, st: 'resolved', a: '6d', k: 'positive', ctr: 'Noor Electrical' },
];

export const DESCS = {
  falling: 'Hand tools and loose bolts on the scaffold deck at Level 4 with no toe-board fitted. Walkway below is an active pedestrian route between the store and the steel yard.',
  scaffold: 'Missing tie-in on the scaffold frame; visible sway under load. Green tag is present but dated 11 days ago.',
  electrical: 'Exposed conductor near a temporary distribution board, unshielded and within reach of foot traffic.',
  excavation: 'Trench edge not barricaded and spoil pile stored within 0.5 m of the edge. Depth approx 1.8 m.',
  height: 'Worker observed leaning over the edge barrier to pass material with lanyard unclipped. Work stopped on the spot.',
  lifting: 'Tower crane slewed over an occupied area during a lift; exclusion zone not enforced by the banksman.',
  ppe: 'Three workers in a marked high-noise zone without hearing protection.',
  heat: 'Shaded rest area for the coastal crew has no working water cooler; WBGT read 31.4 at 13:00.',
  housekeep: 'Packaging debris blocking the emergency walkway at Gate 2.',
  vehicle: 'Reversing plant without a spotter at an active pedestrian crossing point.',
  confined: 'Entry to a wet well made without a gas test record and no standby attendant present.',
  other: 'Reported condition needs safety officer triage to confirm category.',
};

export const CTRS = [
  { n: 'Al Sahra Steel', hz: 19, mh: 41200, cl: 62, sc: 'D' },
  { n: 'Rawabi Civils', hz: 11, mh: 38600, cl: 78, sc: 'C' },
  { n: 'Gulf Mechanical', hz: 8, mh: 29400, cl: 88, sc: 'B' },
  { n: 'Noor Electrical', hz: 5, mh: 26100, cl: 94, sc: 'A' },
];

export const KINDL = { hazard: 'Hazard', nearmiss: 'Near-miss', unsafeact: 'Unsafe act', positive: 'Good practice', incident: 'Incident', anon: 'Anonymous report' };

export const STATUS_LABEL = { open: 'Open', assigned: 'Assigned', verify: 'Awaiting verify', resolved: 'Closed' };

export const catById = (id) => CATS.find((c) => c.id === id);
export const catLabel = (id) => catById(id)?.l || id;
