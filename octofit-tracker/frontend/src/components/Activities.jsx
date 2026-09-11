import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'
import { CollectionState } from './CollectionState'

const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities`
  : 'http://localhost:8000/api/activities'

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchCollection(activitiesEndpoint)
      .then(setActivities)
      .catch((error) => setStatus({ loading: false, error: error.message }))
      .finally(() => setStatus((current) => ({ ...current, loading: false })))
  }, [])

  return (
    <section className="page-section">
      <div className="section-heading"><div><p className="eyebrow">Live log</p><h1>Activity feed</h1></div><span className="count-pill">{activities.length} entries</span></div>
      <CollectionState {...status} emptyMessage="No activities logged yet.">
        <div className="table-wrap"><table><thead><tr><th>Member</th><th>Workout</th><th>Duration</th><th>Calories</th><th>Completed</th></tr></thead><tbody>
          {activities.map((activity) => <tr key={activity._id || activity.id}><td><strong>{activity.user?.displayName || activity.user?.username || 'Unknown member'}</strong></td><td>{activity.type || activity.title || 'Activity'}</td><td>{activity.durationMinutes ? `${activity.durationMinutes} min` : '—'}</td><td>{activity.calories ? `${activity.calories} kcal` : '—'}</td><td>{activity.completedAt ? new Date(activity.completedAt).toLocaleDateString() : '—'}</td></tr>)}
        </tbody></table></div>
      </CollectionState>
    </section>
  )
}

export default Activities