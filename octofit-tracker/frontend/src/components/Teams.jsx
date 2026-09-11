import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'
import { CollectionState } from './CollectionState'

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams`
  : 'http://localhost:8000/api/teams'

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchCollection(teamsEndpoint)
      .then(setTeams)
      .catch((error) => setStatus({ loading: false, error: error.message }))
      .finally(() => setStatus((current) => ({ ...current, loading: false })))
  }, [])

  return (
    <section className="page-section">
      <div className="section-heading"><div><p className="eyebrow">Find your pace</p><h1>Teams</h1></div><span className="count-pill">{teams.length} teams</span></div>
      <CollectionState {...status} emptyMessage="No teams created yet.">
        <div className="data-grid data-grid--teams">{teams.map((team) => <article className="team-card" key={team._id || team.id || team.name}><span className="team-mark">↗</span><h2>{team.name}</h2><p>{team.description || 'A shared space to stay accountable.'}</p><footer>{team.members?.length || 0} members</footer></article>)}</div>
      </CollectionState>
    </section>
  )
}

export default Teams