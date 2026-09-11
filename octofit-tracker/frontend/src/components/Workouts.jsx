import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'
import { CollectionState } from './CollectionState'

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts`
  : 'http://localhost:8000/api/workouts'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchCollection(workoutsEndpoint)
      .then(setWorkouts)
      .catch((error) => setStatus({ loading: false, error: error.message }))
      .finally(() => setStatus((current) => ({ ...current, loading: false })))
  }, [])

  return (
    <section className="page-section">
      <div className="section-heading"><div><p className="eyebrow">Build your week</p><h1>Workouts</h1></div><span className="count-pill">{workouts.length} plans</span></div>
      <CollectionState {...status} emptyMessage="No workouts available yet.">
        <div className="data-grid data-grid--workouts">{workouts.map((workout) => <article className="workout-card" key={workout._id || workout.id || workout.title}><div className="workout-top"><span>{workout.category || 'Training'}</span><span>{workout.difficulty || 'All levels'}</span></div><h2>{workout.title}</h2><p>Target: {workout.target || 'Full body'}</p><footer><strong>{workout.durationMinutes || '—'} min</strong><span>{workout.equipment?.join(', ') || 'No equipment'}</span></footer></article>)}</div>
      </CollectionState>
    </section>
  )
}

export default Workouts