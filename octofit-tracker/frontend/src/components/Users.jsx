import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'
import { CollectionState } from './CollectionState'

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users`
  : 'http://localhost:8000/api/users'

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchCollection(usersEndpoint)
      .then(setUsers)
      .catch((error) => setStatus({ loading: false, error: error.message }))
      .finally(() => setStatus((current) => ({ ...current, loading: false })))
  }, [])

  return (
    <section className="page-section">
      <div className="section-heading">
        <div><p className="eyebrow">Community</p><h1>Members</h1></div>
        <span className="count-pill">{users.length} total</span>
      </div>
      <CollectionState {...status} emptyMessage="No members found.">
        <div className="data-grid data-grid--users">
          {users.map((user) => (
            <article className="person-card" key={user._id || user.id || user.username}>
              <div className="avatar">{(user.displayName || user.username || '?').slice(0, 1).toUpperCase()}</div>
              <div><h2>{user.displayName || user.username}</h2><p>@{user.username}</p><small>{user.goal || 'Goal not set'}</small></div>
            </article>
          ))}
        </div>
      </CollectionState>
    </section>
  )
}

export default Users