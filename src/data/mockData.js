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

// Zones, contractors and reports now live in Supabase (see supabase/schema.sql)
// and are loaded at runtime by AppState — see zonesWithCounts / contractorsWithStats.

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

export const KINDL = { hazard: 'Hazard', nearmiss: 'Near-miss', unsafeact: 'Unsafe act', positive: 'Good practice', incident: 'Incident', anon: 'Anonymous report' };

export const STATUS_LABEL = { open: 'Open', assigned: 'Assigned', verify: 'Awaiting verify', resolved: 'Closed' };

export const catById = (id) => CATS.find((c) => c.id === id);
export const catLabel = (id) => catById(id)?.l || id;
