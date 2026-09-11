export function CollectionState({ loading, error, emptyMessage, children }) {
  if (loading) return <p className="state-message">Loading data...</p>
  if (error) return <p className="state-message state-message--error">{error}</p>
  return children || <p className="state-message">{emptyMessage}</p>
}