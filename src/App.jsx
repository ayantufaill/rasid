import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppShell from './components/AppShell';
import ReportDrawer from './components/ReportDrawer';
import { AppStateProvider } from './state/AppState';
import { AuthProvider, useAuth } from './state/AuthContext';
import AuthPage from './pages/Auth';

import Home from './pages/field/Home';
import CaptureHub from './pages/field/CaptureHub';
import ReportForm from './pages/field/ReportForm';
import Confirm from './pages/field/Confirm';
import StopWork from './pages/field/StopWork';
import InspectHub from './pages/field/InspectHub';
import Checklist from './pages/field/Checklist';
import ScaffTag from './pages/field/ScaffTag';
import Toolbox from './pages/field/Toolbox';
import Heat from './pages/field/Heat';
import Lone from './pages/field/Lone';
import MyWork from './pages/field/MyWork';
import Verify from './pages/field/Verify';

import Overview from './pages/dashboard/Overview';
import Register from './pages/dashboard/Register';
import Clusters from './pages/dashboard/Clusters';
import Actions from './pages/dashboard/Actions';
import Inspections from './pages/dashboard/Inspections';
import Permits from './pages/dashboard/Permits';
import People from './pages/dashboard/People';
import HeatEnv from './pages/dashboard/HeatEnv';
import Contractors from './pages/dashboard/Contractors';
import Analytics from './pages/dashboard/Analytics';

function Gate() {
  const { loading, session } = useAuth();

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--faint)', fontSize: 13 }}>
        Loading…
      </div>
    );
  }

  if (!session) return <AuthPage />;

  return (
    <AppStateProvider>
      <AppShell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<CaptureHub />} />
          <Route path="/report/confirm" element={<Confirm />} />
          <Route path="/report/:kind" element={<ReportForm />} />
          <Route path="/stop-work" element={<StopWork />} />
          <Route path="/inspect" element={<InspectHub />} />
          <Route path="/inspect/checklist" element={<Checklist />} />
          <Route path="/inspect/tag" element={<ScaffTag />} />
          <Route path="/toolbox-talk" element={<Toolbox />} />
          <Route path="/heat" element={<Heat />} />
          <Route path="/lone-worker" element={<Lone />} />
          <Route path="/my-work" element={<MyWork />} />
          <Route path="/my-work/verify/:id" element={<Verify />} />

          <Route path="/dashboard" element={<Overview />} />
          <Route path="/dashboard/overview" element={<Overview />} />
          <Route path="/dashboard/register" element={<Register />} />
          <Route path="/dashboard/clusters" element={<Clusters />} />
          <Route path="/dashboard/actions" element={<Actions />} />
          <Route path="/dashboard/inspections" element={<Inspections />} />
          <Route path="/dashboard/permits" element={<Permits />} />
          <Route path="/dashboard/people" element={<People />} />
          <Route path="/dashboard/heat" element={<HeatEnv />} />
          <Route path="/dashboard/contractors" element={<Contractors />} />
          <Route path="/dashboard/analytics" element={<Analytics />} />
        </Routes>
        <ReportDrawer />
      </AppShell>
    </AppStateProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Gate />
      </AuthProvider>
    </BrowserRouter>
  );
}
