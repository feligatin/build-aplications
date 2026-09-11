import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'
import { CollectionState } from './CollectionState'

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard`
  : 'http://localhost:8000/api/leaderboard'

function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [status, setStatus] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchCollection(leaderboardEndpoint)
      .then(setLeaders)
      .catch((error) => setStatus({ loading: false, error: error.message }))
      .finally(() => setStatus((current) => ({ ...current, loading: false })))
  }, [])

  return (
    <section className="page-section">
      <div className="section-heading"><div><p className="eyebrow">Team momentum</p><h1>Leaderboard</h1></div><span className="count-pill">{leaders.length} ranked</span></div>
      <CollectionState {...status} emptyMessage="No rankings available yet.">
        <div className="leaderboard-list">{leaders.map((leader, index) => <article className="leader-row" key={leader._id || leader.id || leader.user?._id}><span className="rank">{leader.rank || index + 1}</span><div className="avatar avatar--small">{(leader.user?.displayName || leader.username || '?').slice(0, 1).toUpperCase()}</div><div className="leader-name"><strong>{leader.user?.displayName || leader.username || 'Unknown member'}</strong><small>{leader.team?.name || 'Independent'}</small></div><strong className="points">{leader.points ?? 0}<small> pts</small></strong></article>)}</div>
      </CollectionState>
    </section>
  )
}

export default Leaderboard