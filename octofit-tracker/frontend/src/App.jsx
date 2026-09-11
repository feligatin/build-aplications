import { NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

function App() {
  const location = useLocation()
  const pageName = location.pathname === '/' ? 'Overview' : location.pathname.slice(1)
  const navigation = [
    ['/', 'Overview', '⌂'],
    ['/activities', 'Activities', '↗'],
    ['/leaderboard', 'Leaderboard', '★'],
    ['/teams', 'Teams', '◎'],
    ['/users', 'Members', '◌'],
    ['/workouts', 'Workouts', '＋'],
  ]

  return (
    <div className="app-shell">
      <aside className="sidebar"><div className="brand"><span className="brand-mark">O</span><span>Octofit<span className="brand-dot">.</span></span></div><p className="sidebar-label">Workspace</p><nav>{navigation.map(([path, label, icon]) => <NavLink end={path === '/'} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} key={path} to={path}><span>{icon}</span>{label}</NavLink>)}</nav><div className="sidebar-footer"><span className="status-dot" /> API connected</div></aside>
      <main className="main-content"><header className="topbar"><div><p className="breadcrumb">Octofit / <span>{pageName}</span></p><p className="date-line">Thursday, September 11, 2026</p></div><div className="profile-chip"><span className="avatar avatar--tiny">A</span><span>Admin</span></div></header><Routes><Route path="/" element={<Overview />} /><Route path="/activities" element={<Activities />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/teams" element={<Teams />} /><Route path="/users" element={<Users />} /><Route path="/workouts" element={<Workouts />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes></main>
    </div>
  )
}

function Overview() {
  return <section className="overview page-section"><div className="welcome"><p className="eyebrow">Your fitness command center</p><h1>Make today<br /><em>count.</em></h1><p className="intro">Track the effort, find your people, and keep the momentum moving forward.</p><NavLink className="primary-action" to="/activities">View activity <span>→</span></NavLink></div><div className="overview-panel"><div className="panel-heading"><span>At a glance</span><span className="live-label"><i /> Live</span></div><div className="metric-grid"><Metric label="Active members" value="—" link="/users" /><Metric label="Team workouts" value="—" link="/workouts" /><Metric label="Leaderboard" value="—" link="/leaderboard" /></div><div className="overview-note"><span>✦</span><p>Small steps become strong habits when the whole team shows up.</p></div></div></section>
}

function Metric({ label, value, link }) {
  return <NavLink className="metric" to={link}><strong>{value}</strong><span>{label}</span><b>↗</b></NavLink>
}

export default App
